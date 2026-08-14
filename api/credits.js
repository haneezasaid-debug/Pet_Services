const creditBundles = [
  { id: 'b_starter', name: 'Starter Pack', credits: 50, priceSGD: 48, ratePerCredit: 0.96, discountLabel: 'Standard Rate' },
  { id: 'b_popular', name: 'Popular Bundle', credits: 120, priceSGD: 99, ratePerCredit: 0.82, discountLabel: 'Save 18% — Most Popular', popular: true },
  { id: 'b_pro', name: 'Pro Care Pass', credits: 300, priceSGD: 219, ratePerCredit: 0.73, discountLabel: 'Save 27%' },
  { id: 'b_elite', name: 'Elite VIP Club', credits: 700, priceSGD: 449, ratePerCredit: 0.64, discountLabel: 'Save 36% — Best Value' }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      bundles: creditBundles,
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
    });
  }

  if (req.method === 'POST') {
    const { bundleId } = req.body || {};
    const bundle = creditBundles.find(b => b.id === bundleId);
    if (!bundle) {
      return res.status(404).json({ success: false, error: 'Bundle not found' });
    }
    return res.status(200).json({
      success: true,
      bundle,
      message: `Successfully purchased ${bundle.name} (+${bundle.credits} credits)!`
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
