/* ==========================================================================
   Composure247 pricing: the single source of truth for prices on this site.
   One plan, every feature included, four sizes by ACTIVE customers enrolled
   in Composure (Keith, 24 and 26 Nov 2026). Must match checkout in the app.

   Only GBP is shown. To add another currency later, add a block under
   `currencies` with the same shape and change `currency`; the pricing page
   renders everything (cards, notes, FAQ figures) from the active block.
   Annual = 10 x monthly: pay for 10 months, get 12 ("2 months free").
   ========================================================================== */
window.COMPOSURE_PRICING = {
  currency: 'GBP',
  currencies: {
    GBP: {
      symbol: '£',
      locale: 'en-GB',
      vatNote: 'Prices exclude VAT.',
      sizes: [
        { id: 'starter',    name: 'Starter',    min: 1,   max: 20,  monthly: 199, annual: 1990, credits: 500 },
        { id: 'growth',     name: 'Growth',     min: 21,  max: 75,  monthly: 349, annual: 3490, credits: 1000 },
        { id: 'scale',      name: 'Scale',      min: 76,  max: 200, monthly: 549, annual: 5490, credits: 2000 },
        // Enterprise is published and self-serve, on annual billing only.
        { id: 'enterprise', name: 'Enterprise', min: 201, max: 400, monthly: 899, annual: 8990, credits: 4000, annualOnly: true }
      ],
      // Above 400 active customers, per further block of 100 (annual billing).
      beyond: { blockSize: 100, annual: 1990, monthlyEquivalent: 199, credits: 1000 },
      // Extra message credits, any size.
      creditPack: { price: 100, credits: 2000 }
    }
  }
};
