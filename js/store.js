export class Store {
    constructor() {
        this.state = {
            currentStep: 'welcome', // welcome, financial, quiz, result
            financialData: {},
            quizAnswers: {},
            quizCurrentIndex: 0
        };
        this.load();
    }

    load() {
        const stored = localStorage.getItem('risk_app_state');
        if (stored) {
            this.state = JSON.parse(stored);
        }
    }

    save() {
        localStorage.setItem('risk_app_state', JSON.stringify(this.state));
    }

    updateFinancialData(data) {
        this.state.financialData = { ...this.state.financialData, ...data };
        this.save();
    }

    setQuizAnswer(questionId, score) {
        this.state.quizAnswers[questionId] = score;
        this.save();
    }

    setStep(step) {
        this.state.currentStep = step;
        this.save();
        // Trigger a custom event for the app to react
        window.dispatchEvent(new Event('state-change'));
    }

    reset() {
        this.state = {
            currentStep: 'welcome',
            financialData: {},
            quizAnswers: {},
            quizCurrentIndex: 0
        };
        this.save();
        window.dispatchEvent(new Event('state-change'));
    }
}

export const store = new Store();
