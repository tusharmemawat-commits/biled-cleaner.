const API_KEY = "AIzaSyDdTovT0PYgykKkzHHpAMXgX1uzHXWaSoY";

async function askAI() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chat-box');
    const status = document.getElementById('status');
    const msg = input.value;
    
    if(!msg) return;

    // Display User Message
    chatBox.innerHTML += `
        <div class="flex flex-col items-end">
            <div class="user-bubble shadow-lg">${msg}</div>
        </div>`;
    
    input.value = '';
    status.innerText = "Consulting AI Stylist...";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "You are AURASYNTH, a high-end luxury fashion stylist for Biled Cleaner. Give sharp, professional styling advice in 2-3 sentences. Use Hinglish. User: " + msg }] }]
            })
        });
        
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        
        // Display AI Response
        chatBox.innerHTML += `
            <div class="flex flex-col items-start">
                <div class="ai-bubble">${reply}</div>
            </div>`;
        
        status.innerText = "Employee 88543 K J • System Active";
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
        status.innerText = "Connection Lost. Retrying...";
        console.error(err);
    }
    }
