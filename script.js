const APP_SETTINGS = {
    name: "AURASYNTH",
    subtitle: "BILED CLEANER • TUSHARA",
    apiKey: "AIzaSyDdTovT0PYgykKkzHHpAMXgX1uzHXWaSoY",
    whatsappNumber: "917566997266",
    welcomeMsg: "Welcome to the future of Fashion. Main hoon AURASYNTH. Kya main aapke liye kuch luxury styles suggest karoon?"
};

// ... baaki ka logic ...

async function askAI() {
    const input = document.getElementById('userInput');
    const msg = input.value;
    if(!msg) return;

    appendMessage('user', msg);
    input.value = '';
    document.getElementById('status-bar').innerText = "Analyzing Trends...";

    try {
        // Dhyaan dein: Yahan last mein key=${APP_SETTINGS.apiKey} hona zaroori hai
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${APP_SETTINGS.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `You are AURASYNTH, a luxury fashion expert. Reply in Hinglish. User: ${msg}` }] }]
            })
        });
        
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        appendMessage('ai', reply);
        document.getElementById('status-bar').innerText = APP_SETTINGS.subtitle + " • Active";
    } catch (err) {
        document.getElementById('status-bar').innerText = "System Error. Key check karein.";
    }
}

// ... baaki functions ...
