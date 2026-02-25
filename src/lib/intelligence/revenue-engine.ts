/**
 * Revenue Intelligence Core Logic
 * Implements the mathematical frameworks for deal optimization.
 */

export interface DealData {
    id: string;
    client: string;
    sector: string;
    size: number;
    discount: number;
    repExperience: number; // years
    competitorPresence: boolean;
    stage: 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
}

/**
 * Win Probability Model (Simulated Gradient Boosting / Bayesian Logic)
 */
export const calculateWinProbability = (deal: DealData): number => {
    // Base probability influenced by sector and size
    let baseProb = 0.45;

    if (deal.sector === 'Technology') baseProb += 0.05;
    if (deal.size > 100000) baseProb -= 0.1; // Larger deals are harder to close

    // Discount impact (Bayesian logic: too high or too low can be bad)
    // Ideal discount usually around 10-15%
    const discountImpact = -Math.abs(deal.discount - 0.12) * 1.5 + 0.1;

    // Rep Experience
    const repImpact = Math.min(deal.repExperience / 10, 0.2);

    // Competitor Impact
    const competitorImpact = deal.competitorPresence ? -0.15 : 0.05;

    const finalProb = baseProb + discountImpact + repImpact + competitorImpact;

    return Math.max(0.05, Math.min(0.95, finalProb));
};

/**
 * Margin Optimization (Simulated Bayesian Regression)
 * Predicts the optimal discount to maximize (WinProb * Margin)
 */
export const optimizeDiscount = (deal: Omit<DealData, 'discount'>) => {
    const options = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];
    const outcomes = options.map(d => {
        const prob = calculateWinProbability({ ...deal, discount: d } as DealData);
        const margin = deal.size * (1 - d);
        const expectedValue = prob * margin;
        return { discount: d, expectedValue, winProb: prob };
    });

    return outcomes.sort((a, b) => b.expectedValue - a.expectedValue)[0];
};

/**
 * Negotiation Simulation (MDP / Reinforcement Learning Mock)
 * Simulates a buyer's reaction to an offer.
 */
export const simulateNegotiationStep = (
    currentDiscount: number,
    buyerPersona: 'aggressive' | 'conservative' | 'rational'
) => {
    const rand = Math.random();

    if (buyerPersona === 'aggressive') {
        if (currentDiscount < 0.2) return { action: 'counter', value: 0.25, sentiment: 'Low' };
        return rand > 0.6 ? { action: 'accept', sentiment: 'Satisfied' } : { action: 'counter', value: 0.28 };
    }

    if (buyerPersona === 'rational') {
        if (currentDiscount < 0.1) return { action: 'counter', value: 0.15, sentiment: 'Neutral' };
        return rand > 0.3 ? { action: 'accept', sentiment: 'High' } : { action: 'counter', value: 0.18 };
    }

    // Conservative
    if (currentDiscount < 0.05) return { action: 'counter', value: 0.1, sentiment: 'Cautious' };
    return rand > 0.5 ? { action: 'accept', sentiment: 'High' } : { action: 'counter', value: 0.12 };
};
