import { SCORING_TIERS, SUITABILITY_MATRIX } from './constants.js';

export function calculateInvestableSurplus(data) {
    const liquidAssets = parseFloat(data.liquidAssets) || 0;
    const monthlyExpenses = parseFloat(data.monthlyExpenses) || 0;
    const bufferMonths = 6; // Standard 6-month buffer

    // Logic: Investable = Liquid - (Expenses * Buffer)
    const emergencyBuffer = monthlyExpenses * bufferMonths;
    const surplus = liquidAssets - emergencyBuffer;

    return {
        surplus: Math.max(0, surplus), // Cannot be negative
        emergencyBuffer
    };
}

export function calculateRiskToleranceScore(answers) {
    let totalScore = 0;
    Object.values(answers).forEach(score => {
        totalScore += parseInt(score) || 0;
    });

    let toleranceLevel = "Moderate Tolerance"; // Default
    if (totalScore <= SCORING_TIERS.LOW.max) toleranceLevel = "Low Tolerance";
    else if (totalScore <= SCORING_TIERS.MODERATE.max) toleranceLevel = "Moderate Tolerance";
    else toleranceLevel = "High Tolerance";

    return {
        score: totalScore,
        level: toleranceLevel
    };
}

export function determineRiskCapacity(data) {
    // Capacity Factors: Age, Dependents, Asset-to-Liability Ratio, Job Stability
    // Simplified Logic for MVP:
    // 1. If dependents > 0 -> Reduce Capacity
    // 2. If surplus < $10k -> Low Capacity

    const surplus = calculateInvestableSurplus(data).surplus;
    const dependents = parseInt(data.dependents) || 0;
    const age = parseInt(data.age) || 30;

    let capacity = "High";

    if (dependents > 1 || surplus < 50000 || age > 60) {
        capacity = "Low";
    }
    // Note: A true capacity model would be more granular, but this serves the matrix logic.

    return capacity;
}

export function getRecommendedProfile(toleranceLevel, capacityLevel) {
    // Apply the Professional Judgment Matrix
    // SUITABILITY_MATRIX[Capacity][Tolerance]

    const recommendation = SUITABILITY_MATRIX[capacityLevel][toleranceLevel];

    // Fallback logic
    if (!recommendation) return "Moderate";

    return recommendation;
}
