export default function handler(req, res) {
  const mapsKey =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    process.env.googlemaps ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    '';

  res.status(200).json({
    success: true,
    hasMapsKey: Boolean(mapsKey),
    mapsKey: mapsKey
  });
}

