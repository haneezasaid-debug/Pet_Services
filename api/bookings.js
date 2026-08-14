const bookings = [
  {
    id: 'b_init_1',
    providerId: 'p1',
    providerName: 'Sarah Tan',
    petName: 'Mochi',
    serviceType: 'walking',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '08:00 AM',
    durationMinutes: 60,
    paymentMethod: 'credits',
    creditCost: 28,
    totalAmount: 28,
    status: 'confirmed'
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, bookings });
  }

  if (req.method === 'POST') {
    const { providerId, petName, serviceType, date, timeSlot, durationMinutes, addOns, paymentMethod, creditCost, totalAmount } = req.body || {};
    if (!providerId || !serviceType || !date || !timeSlot) {
      return res.status(400).json({ success: false, error: 'Missing required booking fields.' });
    }

    const newBooking = {
      id: `b_${Date.now()}`,
      providerId,
      providerName: 'Verified SMU Provider',
      petName: petName || 'Pet',
      serviceType,
      date,
      timeSlot,
      durationMinutes: durationMinutes || 60,
      addOns: addOns || [],
      paymentMethod: paymentMethod || 'credits',
      creditCost: Number(creditCost) || 28,
      totalAmount: Number(totalAmount) || 28,
      status: 'confirmed',
      timestamp: new Date().toISOString()
    };

    bookings.push(newBooking);
    return res.status(201).json({ success: true, booking: newBooking, message: 'Booking confirmed!' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
