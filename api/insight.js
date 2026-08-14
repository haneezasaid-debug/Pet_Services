/**
 * API Endpoint: Gemini AI Insights & Walker Recommender
 * 
 * Vercel Serverless Function & Express Route Handler
 * Reads GEMINI_API_KEY strictly from process.env on the server.
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Helper to load providers data securely on the server
function getProvidersData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'providers.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.warn('Could not read providers.json directly:', err.message);
  }
  return [];
}

/**
 * Main Serverless / API Handler
 * Handles POST requests with task type, pet info, and prompt.
 */
export default async function handler(req, res) {
  // 1. Validate request method
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please use POST.'
    });
  }

  // 2. Server-side input validation
  const { action, pet, query, serviceType, date, providerId } = req.body || {};

  if (!action && !query) {
    return res.status(400).json({
      success: false,
      error: 'Missing required parameters: action or query must be provided.'
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const providers = getProvidersData();

  // 3. Fallback builder if Gemini API key is missing or offline
  const generateFallbackResponse = (actionType, petData, userQuery) => {
    const petName = petData?.name || 'your pet';
    const petBreed = petData?.breed || 'pet';

    if (actionType === 'recommend_walker') {
      const topPick = providers[0] || { name: 'Sarah Tan', address: '81 Victoria St (SMU)' };
      const secondPick = providers[2] || { name: 'Elena Rostova', address: 'Bras Basah Rd' };
      return {
        title: `AI Recommendation for ${petName} (${petBreed})`,
        summary: `Based on ${petName}'s profile and proximity to Singapore Management University (SMU), we recommend ${topPick.name} as your primary match.`,
        recommendations: [
          {
            providerName: topPick.name,
            matchScore: '98% Match',
            reason: `Located directly beside SMU (${topPick.address}). Certified in canine handling, perfect for ${petName}'s activity level and Fort Canning Park routes.`
          },
          {
            providerName: secondPick.name,
            matchScore: '94% Match',
            reason: `Fear-free certified specialist on Bras Basah with 6+ years experience in behavioral enrichment and structured walking.`
          }
        ],
        safetyTips: [
          'Schedule walks in early morning (before 10 AM) or evening (after 5 PM) to avoid hot asphalt along Bras Basah / Victoria St.',
          'Provide a 1.5m fixed leash rather than retractable for optimal control along city crosswalks.'
        ]
      };
    }

    if (actionType === 'care_summary') {
      return {
        title: `Care Briefing: ${petName}`,
        summary: `Essential care notes and handling instructions for pet care providers.`,
        keyPoints: [
          `Special Needs: ${petData?.specialNeeds || 'Standard daily routine, loves interactive toys.'}`,
          `Diet & Meds: Feed according to schedule with fresh water always available.`,
          `Handling Tip: Keep calm body language and give positive reinforcement treats.`,
          `Emergency Contact: ${petData?.emergencyContact || '+65 9123 4567'} | Vet: ${petData?.vetName || 'Local SMU Clinic'}`
        ]
      };
    }

    if (actionType === 'itinerary') {
      return {
        title: `Tailored SMU Campus & Park Itinerary for ${petName}`,
        summary: `Optimized 60-minute outdoor care schedule avoiding peak afternoon heat in downtown Singapore.`,
        timeline: [
          { time: '00 - 10 min', activity: 'Meet & Greet, harness fit check, calm leashing.' },
          { time: '10 - 35 min', activity: 'Shaded walk along SMU Campus Green towards Fort Canning Park foothills.' },
          { time: '35 - 45 min', activity: 'Hydration break under trees, basic obedience reinforcement & treat reward.' },
          { time: '45 - 60 min', activity: 'Gentle return walk, paw inspection/wipe-down, fresh water refill & photo update.' }
        ]
      };
    }

    return {
      title: `Pet Care Insight for ${petName}`,
      content: `Our AI concierge has reviewed ${petName}'s profile. All our verified providers around Singapore Management University are equipped with first-aid kits and real-time GPS tracking.`
    };
  };

  // 4. If no API key is provided, return structured intelligent fallback gracefully
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Returning structured fallback insight.');
    const fallback = generateFallbackResponse(action, pet, query);
    return res.status(200).json({
      success: true,
      source: 'local-engine',
      data: fallback,
      message: 'Generated using local recommendation heuristic (API Key not detected).'
    });
  }

  // 5. Query Gemini 3.7 Flash using @google/genai SDK
  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    let systemInstruction = `You are "PawPals AI Insight Concierge", an expert veterinary assistant and pet care matching engine serving pet owners around Singapore Management University (SMU - Bras Basah, Bugis, Dhoby Ghaut, City Hall, Singapore).
Provide empathetic, concise, safety-first, and highly structured insights. Always consider Singapore's tropical climate (high humidity, hot pavements midday) and urban setting.`;

    let userPrompt = '';
    const providersContext = JSON.stringify(providers.map(p => ({
      id: p.id,
      name: p.name,
      rating: p.rating,
      services: p.services,
      rates: p.rates,
      address: p.address,
      distanceKm: p.distanceKm,
      specialties: p.specialties,
      bio: p.bio
    })));

    if (action === 'recommend_walker') {
      userPrompt = `Please recommend the top 2 best-matched walkers/sitters from this provider list for the pet below:
Pet Details:
Name: ${pet?.name || 'Pet'}
Species/Breed: ${pet?.breed || 'Dog'}
Size: ${pet?.size || 'Medium'}
Age: ${pet?.age || 'Adult'} years old
Special Needs/Behavior: ${pet?.specialNeeds || 'None specified'}
Requested Service: ${serviceType || 'Walking'}
Date/Time: ${date || 'Upcoming'}

Available Providers List:
${providersContext}

Return a valid JSON object with the following structure:
{
  "title": "Short title matching the pet",
  "summary": "Brief 2-sentence executive summary of the recommendation",
  "recommendations": [
    {
      "providerName": "Name of provider",
      "providerId": "p1/p2/etc",
      "matchScore": "e.g. 98% Match",
      "reason": "Clear explanation of why this provider fits this pet's breed, temperament, and proximity to SMU"
    }
  ],
  "safetyTips": [
    "Tip 1 regarding tropical weather or location (Fort Canning / Bras Basah)",
    "Tip 2 regarding gear or handling"
  ]
}`;
    } else if (action === 'care_summary') {
      userPrompt = `Generate a quick, professional "Sitter Care Briefing" for this pet:
Pet Details:
Name: ${pet?.name || 'Pet'}
Species/Breed: ${pet?.breed || 'Pet'}
Size: ${pet?.size || 'Medium'}
Age: ${pet?.age || 'Adult'}
Special Needs: ${pet?.specialNeeds || 'Standard care'}
Emergency Contact: ${pet?.emergencyContact || '+65 9123 4567'}
Vet: ${pet?.vetName || 'Local SMU Clinic'}

Return a valid JSON object with:
{
  "title": "Care Briefing for [Pet Name]",
  "summary": "1-2 sentence core temperament and care overview",
  "keyPoints": [
    "Specific handling bullet 1",
    "Feeding/medication guideline bullet 2",
    "Emergency & calm environment guideline bullet 3"
  ]
}`;
    } else if (action === 'itinerary') {
      userPrompt = `Create a realistic, safe 60-minute care & walk itinerary around Singapore Management University (SMU) / Fort Canning Park for:
Pet: ${pet?.name || 'Pet'} (${pet?.breed || 'Dog'}, ${pet?.size || 'Medium'})
Special Notes: ${pet?.specialNeeds || 'Standard walk'}

Return a valid JSON object with:
{
  "title": "Custom SMU Walking & Care Itinerary for [Pet Name]",
  "summary": "Short overview highlighting heat-safety and route",
  "timeline": [
    { "time": "00 - 10 min", "activity": "..." },
    { "time": "10 - 35 min", "activity": "..." },
    { "time": "35 - 45 min", "activity": "..." },
    { "time": "45 - 60 min", "activity": "..." }
  ]
}`;
    } else {
      // General custom query
      userPrompt = `The pet owner is asking: "${query}".
Pet context: ${pet ? JSON.stringify(pet) : 'General pet care'}.
Available SMU Providers: ${providersContext}.

Return a valid JSON object:
{
  "title": "AI Care Consultation",
  "summary": "Clear, helpful, and friendly answer addressing the user question directly with actionable advice",
  "keyPoints": ["Action point 1", "Action point 2"]
}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.3
      }
    });

    const responseText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseError) {
      console.warn('Could not parse Gemini JSON response, formatting text:', parseError);
      parsedData = {
        title: `AI Insight for ${pet?.name || 'Your Pet'}`,
        summary: responseText,
        keyPoints: []
      };
    }

    return res.status(200).json({
      success: true,
      source: 'gemini-3.7-flash',
      data: parsedData
    });

  } catch (error) {
    console.error('Error calling Gemini API in insight handler:', error);
    // Graceful fallback on API error
    const fallback = generateFallbackResponse(action, pet, query);
    return res.status(200).json({
      success: true,
      source: 'fallback-on-error',
      data: fallback,
      notice: 'Served with intelligent fallback response due to temporary upstream service latency.'
    });
  }
}
