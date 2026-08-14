import fs from 'fs';
import path from 'path';

function getProvidersData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'providers.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.warn('Could not read providers.json:', err.message);
  }
  return [];
}

export default function handler(req, res) {
  const providers = getProvidersData();
  res.status(200).json({ success: true, providers });
}
