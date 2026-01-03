export const RISK_QUESTIONS = [
    {
        id: "q1",
        text: "In general, how would your best friend describe you as a risk taker?",
        options: [
            { text: "A real gambler", score: 4 },
            { text: "Willing to take risks after completing adequate research", score: 3 },
            { text: "Cautious", score: 2 },
            { text: "A real risk avoider", score: 1 }
        ]
    },
    {
        id: "q2",
        text: "You are on a TV game show and can choose one of the following. Which would you take?",
        options: [
            { text: "$1,000 in cash", score: 1 },
            { text: "A 50% chance at winning $5,000", score: 2 },
            { text: "A 25% chance at winning $10,000", score: 3 },
            { text: "A 5% chance at winning $100,000", score: 4 }
        ]
    },
    {
        id: "q3",
        text: "You have just finished saving for a \"once-in-a-lifetime\" vacation. Three weeks before you plan to leave, you lose your job. You would:",
        options: [
            { text: "Cancel the vacation", score: 1 },
            { text: "Take a much more modest vacation", score: 2 },
            { text: "Go as planned, extending your job search", score: 3 },
            { text: "Extend your vacation, because this might be your last chance to go first-class", score: 4 }
        ]
    },
    {
        id: "q4",
        text: "If you unexpectedly received $20,000 to invest, what would you do?",
        options: [
            { text: "Deposit it in a bank account, money market account, or an insured CD", score: 1 },
            { text: "Invest it in safe high quality bonds or mutual funds", score: 2 },
            { text: "Invest it in the stock market", score: 3 },
            { text: "Invest it in a portfolio with moderate volatility", score: 4 } // Adjusted for standard scale
        ]
    },
    {
        id: "q5",
        text: "In terms of experience, how comfortable are you investing in stocks or stock mutual funds?",
        options: [
            { text: "Not at all comfortable", score: 1 },
            { text: "Somewhat comfortable", score: 2 },
            { text: "Very comfortable", score: 3 }
        ]
    },
    {
        id: "q6",
        text: "When you think of the word \"risk\" which of the following words comes to mind first?",
        options: [
            { text: "Loss", score: 1 },
            { text: "Uncertainty", score: 2 },
            { text: "Opportunity", score: 3 },
            { text: "Thrilling", score: 4 }
        ]
    },
    {
        id: "q7",
        text: "Some experts are predicting prices of assets such as gold, jewels, collectibles, and real estate (hard assets) to increase in value; bond prices may fall, however, experts tend to agree that government bonds are relatively safe. Most of your investment assets are now in high interest government bonds. What would you do?",
        options: [
            { text: "Hold the bonds", score: 1 },
            { text: "Sell the bonds, put half the proceeds into money market accounts, and the other half into hard assets", score: 2 },
            { text: "Sell the bonds and put the total proceeds into hard assets", score: 3 },
            { text: "Sell the bonds, put all the money into hard assets, and borrow money to buy more", score: 4 }
        ]
    },
    {
        id: "q8",
        text: "Given the best and worst case returns of the four investment choices below, which would you prefer?",
        options: [
            { text: "$200 gain best case; $0 gain/loss worst case", score: 1 },
            { text: "$800 gain best case; $200 loss worst case", score: 2 },
            { text: "$2,600 gain best case; $800 loss worst case", score: 3 },
            { text: "$4,800 gain best case; $2,400 loss worst case", score: 4 }
        ]
    },
    {
        id: "q9",
        text: "In addition to whatever you own, you have been given $1,000. You are now asked to choose between:",
        options: [
            { text: "A sure gain of $500", score: 1 },
            { text: "A 50% chance to gain $1,000 and a 50% chance to gain nothing", score: 3 }
        ]
    },
    {
        id: "q10",
        text: "In addition to whatever you own, you have been given $2,000. You are now asked to choose between:",
        options: [
            { text: "A sure loss of $500", score: 1 },
            { text: "A 50% chance to lose $1,000 and a 50% chance to lose nothing", score: 3 }
            // Note: In original prospect theory, people often gamble here. If they choose the gamble, it indicates lower loss aversion (higher risk tolerance score).
        ]
    },
    {
        id: "q11",
        text: "Suppose a relative left you an inheritance of $100,000, stipulating in the will that you invest all the money in ONE of the following choices. Which one would you select?",
        options: [
            { text: "A savings account or money market mutual fund", score: 1 },
            { text: "A mutual fund that owns stocks and bonds", score: 2 },
            { text: "A portfolio of 15 common stocks", score: 3 },
            { text: "Commodities like gold, silver, and oil", score: 4 }
        ]
    }
    // Limited to 11 questions as per prompt "Progressive Disclosure... The platform should not present the entire 11-question quiz on one page."
];

export const SCORING_TIERS = {
    LOW: { min: 0, max: 18, label: "Low Tolerance", class: "Conservative" },
    MODERATE: { min: 19, max: 28, label: "Moderate Tolerance", class: "Moderate" },
    HIGH: { min: 29, max: 100, label: "High Tolerance", class: "Aggressive" }
};

export const SAA_TARGETS = {
    "Very Conservative": { equity: 15, fixed: 60, cash: 25, label: "Capital Preservation" },
    "Conservative": { equity: 25, fixed: 55, cash: 20, label: "Income with Growth" },
    "Moderate": { equity: 50, fixed: 45, cash: 5, label: "Balanced Growth" },
    "Growth": { equity: 75, fixed: 22, cash: 3, label: "Wealth Accumulation" },
    "Aggressive": { equity: 95, fixed: 3, cash: 2, label: "Maximum Appreciation" }
};

export const SUITABILITY_MATRIX = {
    // [Capacity][Tolerance] = Recommended Profile
    "Low": {
        "Low Tolerance": "Very Conservative",
        "Moderate Tolerance": "Conservative",
        "High Tolerance": "Conservative" // Constraint applied
    },
    "High": { // Simplified to just Low/High for logic, can map Moderate later if needed 
        "Low Tolerance": "Conservative",
        "Moderate Tolerance": "Moderate",
        "High Tolerance": "Aggressive"
    }
};
