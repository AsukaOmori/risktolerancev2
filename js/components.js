export const components = {
    welcome: () => `
        <div class="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                Wealth Genome 2026
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Discover your true investor profile through our scientifically grounded, multi-dimensional assessment. 
                We analyze your objective financial capacity and your subjective psychological tolerance to build a personalized roadmap.
            </p>
            <button onclick="window.app.startFinancial()" 
                class="px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl dark:bg-white dark:text-black">
                Start Assessment
            </button>
            <div class="pt-8 flex justify-center gap-8 text-sm text-gray-400">
                <span class="flex items-center"><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg> 13-Point Psychometrics</span>
                <span class="flex items-center"><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg> Bank-Level Encryption</span>
            </div>
        </div>
    `,

    financialForm: () => `
        <div class="max-w-xl mx-auto space-y-6 animate-slide-up">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Financial Reality Check</h2>
                <p class="text-gray-500">First, let's establish your objective risk capacity.</p>
            </div>
            
            <form id="financial-form" class="space-y-6">
                <!-- Group 1: Demographics -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                        <input type="number" name="age" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700" placeholder="30">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dependents</label>
                        <input type="number" name="dependents" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700" placeholder="0">
                    </div>
                </div>

                <!-- Group 2: Assets -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Liquid Assets ($)</label>
                    <p class="text-xs text-gray-400 mb-1">Cash, Savings, Checking. Do not include house or 401k.</p>
                    <input type="number" name="liquidAssets" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700" placeholder="50000">
                </div>

                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Household Expenses ($)</label>
                    <input type="number" name="monthlyExpenses" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700" placeholder="4000">
                </div>

                <div class="pt-6">
                    <button type="submit" class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-md">
                        Calculate Risk Capacity &rarr;
                    </button>
                </div>
            </form>
        </div>
    `,

    quiz: (question, currentIndex, total, currentAnswer) => `
        <div class="max-w-2xl mx-auto animate-fade-in-right">
            <div class="mb-8 flex justify-between items-center">
                <span class="text-sm font-medium text-gray-400">Question ${currentIndex + 1} of ${total}</span>
                <div class="h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-600 transition-all duration-500" style="width: ${((currentIndex + 1) / total) * 100}%"></div>
                </div>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 leading-snug">
                ${question.text}
            </h2>

            <div class="space-y-3 mb-8">
                ${question.options.map((opt, idx) => {
        const isSelected = currentAnswer === opt.score;
        const borderClass = isSelected ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' : 'border-gray-100 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-400 dark:hover:bg-gray-900';
        const textClass = isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400';

        return `
                    <button onclick="window.app.handleQuizSelection('${question.id}', ${opt.score})"
                        class="w-full text-left p-6 rounded-xl border-2 transition-all group ${borderClass}">
                        <span class="font-medium ${textClass}">${opt.text}</span>
                    </button>
                    `;
    }).join('')}
            </div>
            
            <div class="flex justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button onclick="window.app.prevQuestion()" ${currentIndex === 0 ? 'disabled' : ''} 
                    class="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    &larr; Back
                </button>
                <button onclick="window.app.nextQuestion()" ${!currentAnswer ? 'disabled' : ''}
                    class="px-8 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md">
                    ${currentIndex === total - 1 ? 'Finish Assessment' : 'Next &rarr;'}
                </button>
            </div>
        </div>
    `,

    results: (profile) => `
        <div class="max-w-5xl mx-auto animate-fade-in">
            <!-- Header -->
            <div class="text-center mb-12">
                <span class="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium tracking-wide">ANALYSIS COMPLETE</span>
                <h2 class="mt-4 text-4xl font-bold text-gray-900 dark:text-white">Your Ideal Portfolio: <span class="text-blue-600">${profile.finalRecommend}</span></h2>
                <p class="mt-3 text-lg text-gray-600 dark:text-gray-300">
                    Based on your <span class="font-medium text-gray-900 dark:text-white">${profile.capacityLevel} Capacity</span> 
                    and <span class="font-medium text-gray-900 dark:text-white">${profile.toleranceLevel}</span>.
                </p>
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                <!-- Chart Section -->
                <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
                    <div class="relative h-64 w-full flex justify-center items-center">
                         <canvas id="allocationChart"></canvas>
                         <!-- Center Text Overlay -->
                         <div class="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">${profile.saa.equity}%</span>
                            <span class="text-xs text-gray-500 uppercase tracking-wider">Equity</span>
                         </div>
                    </div>
                    
                    <!-- Legend -->
                    <div class="mt-8 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div class="text-xs text-gray-400 uppercase tracking-widest mb-1">Stocks</div>
                            <div class="text-xl font-bold text-blue-600">${profile.saa.equity}%</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-400 uppercase tracking-widest mb-1">Bonds</div>
                            <div class="text-xl font-bold text-teal-500">${profile.saa.fixed}%</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-400 uppercase tracking-widest mb-1">Cash</div>
                            <div class="text-xl font-bold text-gray-400">${profile.saa.cash}%</div>
                        </div>
                    </div>
                </div>

                <!-- Insights & Analysis -->
                <div class="space-y-8">
                    
                    <!-- Constraint Analysis Alert -->
                    ${profile.capacityLevel === 'Low' && profile.toleranceLevel.includes('High') ? `
                    <div class="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
                        <h4 class="text-lg font-bold text-amber-800 mb-2">⚠ Constraint Applied</h4>
                        <p class="text-amber-700 leading-relaxed">
                            While your psychological profile suggests you are comfortable with high risk ("${profile.toleranceLevel}"), your 
                            current objective financial capacity (dependents/liquidity) places a constraint on aggressive investing. 
                            We have optimized your recommendation to <strong>${profile.finalRecommend}</strong> to protect your household stability.
                        </p>
                    </div>` : ''}

                    <div class="space-y-4">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Why this portfolio?</h3>
                        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                            The <strong>${profile.finalRecommend}</strong> strategy is designed for <em>${profile.saa.label}</em>. 
                            It balances the potential for long-term growth with a significant buffer of fixed-income assets to 
                            dampen volatility during market corrections.
                        </p>
                    </div>

                    <!-- What If Simulation Toggle -->
                    <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
                         <div class="flex justify-between items-center mb-4">
                            <span class="text-sm font-medium text-gray-500">Market Stress Test (2008 Scenario)</span>
                            <span id="stress-value" class="text-red-500 font-bold">-0%</span>
                         </div>
                         <input type="range" min="0" max="100" value="0" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" 
                                oninput="window.app.updateStressTest(this.value)">
                    </div>
                    
                    <button onclick="window.app.reset()" class="text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white underline decoration-dotted">
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    `
};
