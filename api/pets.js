import fs from 'fs';
import path from 'path';

function getPetsData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'pets.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.warn('Could not read pets.json:', err.message);
  }
  return [];
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const pets = getPetsData();
    return res.status(200).json({ success: true, pets });
  }

  if (req.method === 'POST') {
    const { name, breed, species, size, age, specialNeeds, emergencyContact } = req.body || {};
    if (!name || !breed) {
      return res.status(400).json({ success: false, error: 'Pet name and breed are required.' });
    }
    const newPet = {
      id: `pet_${Date.now()}`,
      name,
      species: species || 'Dog',
      breed,
      size: size || 'Medium (10 - 25 kg)',
      age: Number(age) || 2,
      specialNeeds: specialNeeds || '',
      emergencyContact: emergencyContact || '+65 9123 4567',
      photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80'
    };
    return res.status(201).json({ success: true, pet: newPet, message: 'Pet profile saved successfully.' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
