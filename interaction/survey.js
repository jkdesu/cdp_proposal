// Survey/Questionnaire functionality

// Initialize slider event listeners
function initializeSliders() {
    for (let i = 1; i <= 5; i++) {
        const slider = document.getElementById(`q${i}`);
        const valueDisplay = document.getElementById(`q${i}-value`);
        
        if (slider && valueDisplay) {
            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value;
            });
        }
    }
}

// Open survey panel
function openSurvey() {
    document.getElementById('intro-panel').classList.add('hidden');
    document.getElementById('survey-panel').classList.remove('hidden');
    
    // Reset sliders and result
    for (let i = 1; i <= 5; i++) {
        const slider = document.getElementById(`q${i}`);
        const valueDisplay = document.getElementById(`q${i}-value`);
        if (slider && valueDisplay) {
            slider.value = 5;
            valueDisplay.textContent = '5';
        }
    }
    document.getElementById('suitability-result').innerHTML = '';
    document.getElementById('suitability-result').className = 'suitability-result';
}

// Close survey panel
function closeSurvey() {
    document.getElementById('survey-panel').classList.add('hidden');
    document.getElementById('intro-panel').classList.remove('hidden');
}

// Calculate city suitability based on questionnaire
function calculateSuitability() {
    const scores = [];
    
    // Get all slider values
    for (let i = 1; i <= 5; i++) {
        const slider = document.getElementById(`q${i}`);
        if (slider) {
            scores.push(parseInt(slider.value));
        }
    }
    
    // Calculate average score
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    // Display result
    const resultDiv = document.getElementById('suitability-result');
    
    if (average <= 5) {
        // Closer to 1 = Tokyo
        resultDiv.innerHTML = `
            <div>
                <div style="font-size: 24px; margin-bottom: 10px;">Tokyo might be a good option for you!</div>
                <div style="font-size: 16px; font-weight: normal;">Average Score: ${average.toFixed(1)}/10</div>
            </div>
        `;
        resultDiv.className = 'suitability-result tokyo';
    } else {
        // Closer to 10 = NYC
        resultDiv.innerHTML = `
            <div>
                <div style="font-size: 24px; margin-bottom: 10px;">NYC might be a good option for you!</div>
                <div style="font-size: 16px; font-weight: normal;">Average Score: ${average.toFixed(1)}/10</div>
            </div>
        `;
        resultDiv.className = 'suitability-result nyc';
    }
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

