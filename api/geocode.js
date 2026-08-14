// Singapore Geocoding Endpoint for PawPals SMU
// Supports Google Geocoding API server-side with key fallbacks for Singapore locations

const KNOWN_SG_LOCATIONS = [
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
  { name: 'tanjong pagar', postal: '079903', keywords: ['tanjong pagar', 'guoco tower', '079903', 'wallich st', 'maxwell'], lat: 1.2768, lng: 103.8458, formatted: '1 Wallich St, Singapore 079903 (Tanjong Pagar)' },
  { name: 'tiong bahru', postal: '168732', keywords: ['tiong bahru', 'eng hoon', '168732', 'tiong bahru market'], lat: 1.2848, lng: 103.8322, formatted: 'Eng Hoon St, Singapore 168732 (Tiong Bahru)' },
  { name: 'novena', postal: '307683', keywords: ['novena', 'velocity', 'thomson rd', '307683', 'novena square'], lat: 1.3204, lng: 103.8438, formatted: '238 Thomson Rd, Singapore 307683 (Novena)' }
];

export default async function handler(req, res) {
  const query = (req.query.address || req.query.q || (req.body && (req.body.address || req.body.query)) || '').toString().trim();

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

  // 1. Try Google Maps Geocoding API if key is configured
  if (apiKey && apiKey !== 'MY_GOOGLE_MAPS_KEY') {
    try {
      const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query + ', Singapore')}&region=sg&key=${apiKey}`;
      const response = await fetch(geoUrl);
      const data = await response.json();

      if (data.status === 'OK' && Array.isArray(data.results) && data.results.length > 0) {
        const top = data.results[0];
        return res.status(200).json({
          success: true,
          location: top.geometry.location,
          formattedAddress: top.formatted_address,
          placeId: top.place_id,
          source: 'google_geocoding_api'
        });
      }
    } catch (err) {
      console.warn('Google Geocoding API call error:', err.message);
    }
  }

  // 2. Fallback matching against known Singapore landmarks and postal codes
  const qNorm = query.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
  const digitsMatch = query.match(/\b(\d{6})\b/);
  const targetPostal = digitsMatch ? digitsMatch[1] : '';

  const matched = KNOWN_SG_LOCATIONS.find(loc => {
    if (targetPostal && loc.postal === targetPostal) return true;
    return loc.keywords.some(k => qNorm.includes(k) || k.includes(qNorm));
  });

  if (matched) {
    return res.status(200).json({
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
}
