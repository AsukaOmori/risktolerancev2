import { store } from './store.js';
import { components } from './components.js';
import { RISK_QUESTIONS, SAA_TARGETS } from './constants.js';
import { calculateInvestableSurplus, calculateRiskToleranceScore, determineRiskCapacity, getRecommendedProfile } from './scoring.js';

class App {
    constructor() {
        this.root = document.getElementById('app-root');
        this.init();

        // Listen for state changes
        window.addEventListener('state-change', () => this.render());
    }

    init() {
        // Expose app to window for inline onclick handlers
        window.app = this;
        this.render();
    }

    render() {
        const { currentStep } = store.state;

        // Clear root
        this.root.innerHTML = '';

        if (currentStep === 'welcome') {
            this.root.innerHTML = components.welcome();
        } else if (currentStep === 'financial') {
            this.root.innerHTML = components.financialForm();
            this.attachFinancialFormListener();
        } else if (currentStep === 'quiz') {
            const index = store.state.quizCurrentIndex;
            const question = RISK_QUESTIONS[index];
            this.root.innerHTML = components.quiz(question, index, RISK_QUESTIONS.length);
        } else if (currentStep === 'results') {
            this.renderResults();
        }
    }

    startFinancial() {
        store.setStep('financial');
    }

    attachFinancialFormListener() {
        const form = document.getElementById('financial-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            store.updateFinancialData(data);

            // Calculate Logic Check
            const debugSurplus = calculateInvestableSurplus(data);
            console.log("Calculated Surplus:", debugSurplus);

            // Move to first question
            store.state.quizCurrentIndex = 0;
            store.setStep('quiz');
        });
    }

    handleQuizAnswer(questionId, score) {
        store.setQuizAnswer(questionId, score);

        const nextIndex = store.state.quizCurrentIndex + 1;
        if (nextIndex < RISK_QUESTIONS.length) {
            store.state.quizCurrentIndex = nextIndex;
            store.save(); // Direct save needed for index
            this.render();
        } else {
            store.setStep('results');
        }
    }

    renderResults() {
        // 1. Calculate everything
        const capacity = determineRiskCapacity(store.state.financialData);
        const tolerance = calculateRiskToleranceScore(store.state.quizAnswers);
        const recommendation = getRecommendedProfile(tolerance.level, capacity);
        const saa = SAA_TARGETS[recommendation];

        // 2. Render Template
        const profileData = {
            capacityLevel: capacity,
            toleranceLevel: tolerance.level,
            finalRecommend: recommendation,
            saa: saa
        };

        this.root.innerHTML = components.results(profileData);

        // 3. Render Chart (Chart.js)
        setTimeout(() => {
            this.renderChart(saa);
        }, 100);
    }

    renderChart(saa) {
        const ctx = document.getElementById('allocationChart').getContext('2d');

        // Destroy existing if any (simplistic approach for SPA)
        if (this.chartInstance) this.chartInstance.destroy();

        this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Equity', 'Fixed Income', 'Cash'],
                datasets: [{
                    data: [saa.equity, saa.fixed, saa.cash],
                    backgroundColor: [
                        '#2563eb', // Blue 600
                        '#14b8a6', // Teal 500
                        '#e5e7eb'  // Gray 200
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                cutout: '75%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (context) {
                                return ` ${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    updateStressTest(value) {
        // Simple linear interpolation of a crash scenario
        // Assumption: 2008 crash was roughly -50% for Equities
        // Value 0-100 represents 0-50% crash

        const crashFactor = (value / 100) * 0.50; // max 50% drop
        const equity = this.lastSaa ? this.lastSaa.equity : 50; // default fallout

        // This is a UI toy, logic would be deeper in real app
        const impact = (equity / 100) * crashFactor * 100;

        document.getElementById('stress-value').innerText = `-${impact.toFixed(1)}%`;
    }

    reset() {
        store.reset();
    }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
