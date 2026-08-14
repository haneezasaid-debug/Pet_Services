import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import insightHandler from './api/insight.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Standard middleware
  app.use(express.json());

  // In-memory / file-backed data store
  const providersPath = path.join(__dirname, 'data', 'providers.json');
  const petsPath = path.join(__dirname, 'data', 'pets.json');

  let providersData = [];
  try {
    if (fs.existsSync(providersPath)) {
      providersData = JSON.parse(fs.readFileSync(providersPath, 'utf8'));
    }
  } catch (err) {
    console.error('Failed to read providers.json:', err);
  }

  let petsData = [];
  try {
    if (fs.existsSync(petsPath)) {
      petsData = JSON.parse(fs.readFileSync(petsPath, 'utf8'));
    }
  } catch (err) {
    console.error('Failed to read pets.json:', err);
  }

  // Stored bookings to prevent double-booking
  const storedBookings = [
    {
      id: 'b_init_1',
      providerId: 'p1',
      providerName: 'Sarah Tan',
      petName: 'Mochi',
      serviceType: 'walking',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '08:00 AM',
      status: 'confirmed'
    }
  ];

  // Credit bundles definition
  const creditBundles = [
    { id: 'b_starter', name: 'Starter Pack', credits: 50, priceSGD: 48, ratePerCredit: 0.96, discountLabel: 'Standard' },
    { id: 'b_popular', name: 'Popular Bundle', credits: 120, priceSGD: 99, ratePerCredit: 0.82, discountLabel: 'Save 18% — Most Popular', popular: true },
    { id: 'b_pro', name: 'Pro Care Pass', credits: 300, priceSGD: 219, ratePerCredit: 0.73, discountLabel: 'Save 27%' },
    { id: 'b_elite', name: 'Elite VIP Club', credits: 700, priceSGD: 449, ratePerCredit: 0.64, discountLabel: 'Save 36% — Best Value' }
  ];

  // User credit wallet state
  let userCredits = {
    balance: 150,
    history: [
      {
        id: 'tx_init_1',
        type: 'purchase',
        bundleName: 'Popular Bundle (+120 credits)',
        credits: 120,
        amountSGD: 99,
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        note: 'Purchased Popular Tier Bundle'
      },
      {
        id: 'tx_init_2',
        type: 'bonus',
        bundleName: 'Welcome Bonus (+30 credits)',
        credits: 30,
        amountSGD: 0,
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        note: 'New Pet Parent Registration Gift'
      }
    ]
  };

  // --- API Endpoints ---

  // 1. Health check & Config
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/config', (req, res) => {
    const mapsKey =
      process.env.GOOGLE_MAPS_PLATFORM_KEY ||
      process.env.googlemaps ||
      process.env.GOOGLE_MAPS_API_KEY ||
      process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
      process.env.VITE_GOOGLE_MAPS_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      '';
    res.json({
      success: true,
      hasMapsKey: Boolean(mapsKey),
      mapsKey: mapsKey
    });
  });

  // Geocoding endpoint
  app.get('/api/geocode', async (req, res) => {
    const query = (req.query.address || req.query.q || '').toString().trim();
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a name, postal code, or address to search.'
      });
    }

    const apiKey =
      process.env.GOOGLE_MAPS_PLATFORM_KEY ||
      process.env.googlemaps ||
      process.env.GOOGLE_MAPS_API_KEY ||
      process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
      process.env.VITE_GOOGLE_MAPS_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      '';

    // 1. Try Google Geocoding API if key configured
    if (apiKey && apiKey !== 'MY_GOOGLE_MAPS_KEY') {
      try {
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query + ', Singapore')}&region=sg&key=${apiKey}`;
        const response = await fetch(geoUrl);
        const data = await response.json();

        if (data.status === 'OK' && Array.isArray(data.results) && data.results.length > 0) {
          const top = data.results[0];
          return res.json({
            success: true,
            location: top.geometry.location,
            formattedAddress: top.formatted_address,
            placeId: top.place_id,
            source: 'google_geocoding_api'
          });
        }
      } catch (err: any) {
        console.warn('Geocoding API error:', err.message);
      }
    }

    // 2. Singapore landmarks and postal codes fallback
    const knownLocations = [
      { name: 'smu', postal: '188065', keywords: ['smu', 'singapore management university', 'victoria st', '188065', 'bras basah'], lat: 1.2963, lng: 103.8502, formatted: '81 Victoria St, Singapore 188065 (SMU Li Ka Shing)' },
      { name: 'bugis', postal: '188067', keywords: ['bugis', 'bugis junction', 'victoria st 200', '188067', 'bugis street'], lat: 1.2998, lng: 103.8553, formatted: '200 Victoria St, Singapore 188067 (Bugis Junction)' },
      { name: 'bencoolen', postal: '189559', keywords: ['bencoolen', 'bras basah rd', 'rendezvous', '189559', 'bras basah mrt'], lat: 1.2978, lng: 103.8509, formatted: '9 Bras Basah Rd, Singapore 189559 (Rendezvous / Bencoolen)' },
      { name: 'dhoby ghaut', postal: '238839', keywords: ['dhoby ghaut', 'plaza singapura', 'orchard rd 68', '238839', 'dhoby ghaut mrt'], lat: 1.3005, lng: 103.8451, formatted: '68 Orchard Rd, Singapore 238839 (Plaza Singapura / Dhoby Ghaut)' },
      { name: 'rochor', postal: '188968', keywords: ['rochor', 'middle rd', 'midland', '188968', 'bugis+'], lat: 1.2989, lng: 103.8541, formatted: '100 Middle Rd, Singapore 188968 (Rochor / Middle Rd)' },
      { name: 'somerset', postal: '238164', keywords: ['somerset', '111 somerset', 'somerset rd', '238164', '313 somerset', 'orchard gateway'], lat: 1.3009, lng: 103.8378, formatted: '111 Somerset Rd, Singapore 238164 (Somerset)' },
      { name: 'city hall', postal: '178957', keywords: ['city hall', 'capitol', 'stamford rd', '178957', 'city hall mrt', 'chijmes'], lat: 1.2936, lng: 103.8519, formatted: '25 Stamford Rd, Singapore 178957 (Capitol / City Hall)' },
      { name: 'fort canning', postal: '179618', keywords: ['fort canning', 'fort canning park', '179618', 'clarke quay'], lat: 1.2952, lng: 103.8468, formatted: 'Fort Canning Park, Singapore 179618' },
      { name: 'marina bay', postal: '018956', keywords: ['marina bay', 'mbs', '018956', 'marina bay sands', 'bayfront'], lat: 1.2838, lng: 103.8591, formatted: '10 Bayfront Ave, Singapore 018956 (Marina Bay)' },
      { name: 'orchard', postal: '238864', keywords: ['orchard', 'orchard road', 'ion orchard', '238864', 'takashimaya', 'ngee ann city'], lat: 1.3040, lng: 103.8318, formatted: '391 Orchard Rd, Singapore 238864 (Orchard Road)' },
      { name: 'tanjong pagar', postal: '079903', keywords: ['tanjong pagar', 'guoco tower', '079903', 'wallich st', 'maxwell'], lat: 1.2768, lng: 103.8458, formatted: '1 Wallich St, Singapore 079903 (Tanjong Pagar)' }
    ];

    const qNorm = query.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
    const digitsMatch = query.match(/\b(\d{6})\b/);
    const targetPostal = digitsMatch ? digitsMatch[1] : '';

    const matched = knownLocations.find(loc => {
      if (targetPostal && loc.postal === targetPostal) return true;
      return loc.keywords.some(k => qNorm.includes(k) || k.includes(qNorm));
    });

    if (matched) {
      return res.json({
        success: true,
        location: { lat: matched.lat, lng: matched.lng },
        formattedAddress: matched.formatted,
        source: 'singapore_local_directory'
      });
    }

    return res.status(404).json({
      success: false,
      error: `Unable to geocode location "${query}". Please enter a valid postal code or neighborhood in Singapore (e.g. 188065, Bras Basah, Bugis, Dhoby Ghaut).`
    });
  });

  // 2. Providers list
  app.get('/api/providers', (req, res) => {
    res.json({ success: true, providers: providersData });
  });

  // 3. Pets profile list & creation/update
  app.get('/api/pets', (req, res) => {
    res.json({ success: true, pets: petsData });
  });

  app.post('/api/pets', (req, res) => {
    const { id, name, breed, size, age, specialNeeds, emergencyContact, vetName, photo } = req.body;
    if (!name || !breed) {
      return res.status(400).json({ success: false, error: 'Pet name and breed are required.' });
    }

    if (id) {
      // Update existing pet
      const index = petsData.findIndex(p => p.id === id);
      if (index !== -1) {
        petsData[index] = {
          ...petsData[index],
          name,
          breed,
          size: size || petsData[index].size,
          age: Number(age) || petsData[index].age,
          specialNeeds: specialNeeds || '',
          emergencyContact: emergencyContact || petsData[index].emergencyContact || '',
          vetName: vetName || petsData[index].vetName || '',
          photo: photo || petsData[index].photo
        };
        return res.json({ success: true, pet: petsData[index], message: 'Pet updated successfully.' });
      }
    }

    // Create new pet
    const newPet = {
      id: `pet_${Date.now()}`,
      name,
      breed,
      size: size || 'Medium (10-25 kg)',
      age: Number(age) || 2,
      specialNeeds: specialNeeds || '',
      emergencyContact: emergencyContact || '+65 9123 4567',
      vetName: vetName || 'Local SMU Veterinary Partner',
      photo: photo || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80'
    };

    petsData.push(newPet);
    res.status(201).json({ success: true, pet: newPet, message: 'Pet added successfully.' });
  });

  // Delete pet
  app.delete('/api/pets/:id', (req, res) => {
    const { id } = req.params;
    petsData = petsData.filter(p => p.id !== id);
    res.json({ success: true, message: 'Pet removed successfully.' });
  });

  // 4. Bookings & Double-booking prevention
  app.get('/api/bookings', (req, res) => {
    res.json({ success: true, bookings: storedBookings });
  });

  app.post('/api/bookings', (req, res) => {
    const { providerId, petName, serviceType, date, timeSlot, durationMinutes, addOns, paymentMethod, creditCost, totalAmount } = req.body;

    if (!providerId || !serviceType || !date || !timeSlot) {
      return res.status(400).json({ success: false, error: 'Missing required booking parameters (provider, service, date, time slot).' });
    }

    // Double-booking check for same provider, date and time
    const conflict = storedBookings.find(
      b => b.providerId === providerId && b.date === date && b.timeSlot === timeSlot && b.status !== 'cancelled'
    );

    if (conflict) {
      return res.status(409).json({
        success: false,
        error: `Slot ${timeSlot} on ${date} has already been reserved for this provider. Please select another slot.`
      });
    }

    const provider = providersData.find(p => p.id === providerId);

    // If paying with credits, verify and deduct balance
    if (paymentMethod === 'credits') {
      const requiredCredits = Number(creditCost) || 30;
      if (userCredits.balance < requiredCredits) {
        return res.status(400).json({
          success: false,
          error: `Insufficient credits balance. You need ${requiredCredits} credits but currently have ${userCredits.balance} credits.`
        });
      }

      userCredits.balance -= requiredCredits;
      userCredits.history.unshift({
        id: `tx_${Date.now()}`,
        type: 'redemption',
        bundleName: `Booking: ${serviceType.toUpperCase()} with ${provider ? provider.name : 'Provider'}`,
        credits: -requiredCredits,
        amountSGD: 0,
        timestamp: new Date().toISOString(),
        note: `Redeemed for ${petName || 'Pet'} on ${date} (${timeSlot})`
      });
    }

    const newBooking = {
      id: `bk_${Date.now()}`,
      providerId,
      providerName: provider ? provider.name : 'Verified Provider',
      petName: petName || 'My Pet',
      serviceType,
      date,
      timeSlot,
      durationMinutes: durationMinutes || 60,
      addOns: addOns || [],
      paymentMethod: paymentMethod || 'credits',
      creditCost: creditCost || 0,
      totalAmount: totalAmount || 0,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    storedBookings.push(newBooking);

    res.status(201).json({
      success: true,
      booking: newBooking,
      remainingCredits: userCredits.balance,
      message: 'Booking confirmed successfully!'
    });
  });

  // 5. Credit System (Bundles, Balance, Purchase, History)
  app.get('/api/credits', (req, res) => {
    res.json({
      success: true,
      bundles: creditBundles,
      balance: userCredits.balance,
      history: userCredits.history
    });
  });

  app.post('/api/credits/purchase', (req, res) => {
    const { bundleId } = req.body;
    const bundle = creditBundles.find(b => b.id === bundleId);
    if (!bundle) {
      return res.status(400).json({ success: false, error: 'Invalid credit bundle selected.' });
    }

    userCredits.balance += bundle.credits;
    const transaction = {
      id: `tx_${Date.now()}`,
      type: 'purchase',
      bundleName: `${bundle.name} (+${bundle.credits} credits)`,
      credits: bundle.credits,
      amountSGD: bundle.priceSGD,
      timestamp: new Date().toISOString(),
      note: `Purchased at $${bundle.ratePerCredit.toFixed(2)}/credit`
    };

    userCredits.history.unshift(transaction);

    res.json({
      success: true,
      newBalance: userCredits.balance,
      transaction,
      message: `Successfully added ${bundle.credits} credits to your account!`
    });
  });

  // 6. Gemini Insight / Recommend routes
  app.post('/api/insight', (req, res) => {
    return insightHandler(req, res);
  });

  app.post('/api/recommend', (req, res) => {
    // Alias for prompt requirements
    req.body.action = req.body.action || 'recommend_walker';
    return insightHandler(req, res);
  });

  // 7. Add Provider Review
  app.post('/api/providers/:id/reviews', (req, res) => {
    const { id } = req.params;
    const { author, petName, rating, comment } = req.body;

    const provider = providersData.find(p => p.id === id);
    if (!provider) {
      return res.status(404).json({ success: false, error: 'Provider not found.' });
    }

    const newReview = {
      author: author || 'Verified Pet Parent',
      petName: petName || 'Beloved Pet',
      rating: Number(rating) || 5,
      date: 'Just now',
      comment: comment || 'Wonderful experience!'
    };

    if (!provider.reviews) provider.reviews = [];
    provider.reviews.unshift(newReview);
    provider.reviewCount = (provider.reviewCount || 0) + 1;

    res.status(201).json({ success: true, review: newReview, message: 'Review posted successfully!' });
  });

  // Static serving for data directory & other assets
  app.use('/data', express.static(path.join(__dirname, 'data')));
  app.use('/masterPrompt.md', (req, res) => {
    res.sendFile(path.join(__dirname, 'masterPrompt.md'));
  });

  // Vite middleware in dev, static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PawPals Pet Care app server running at http://localhost:${PORT}`);
  });
}

startServer();
