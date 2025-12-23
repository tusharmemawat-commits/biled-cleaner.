async function askAI() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chat-box');
    
    if(!input.value) return;

    // User message screen par dikhana
    chatBox.innerHTML += `<div class="text-right"><span class="bg-cyan-600 p-2 rounded-lg text-sm inline-block">${input.value}</span></div>`;
    
    const userMsg = input.value;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // AI API ki settings
    const API_KEY = "AIzaSyDdTovT0PYgykKkzHHpAMXgX1uzHXWaSoY";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "You are a futuristic fashion expert for Biled Cleaner Men's wear. Help the user with: " + userMsg }] }]
            })
        });
        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        // AI message screen par dikhana
        chatBox.innerHTML += `<div class="text-left"><span class="bg-white/10 p-2 rounded-lg text-sm inline-block text-cyan-200">${aiText}</span></div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div class="text-left"><span class="bg-red-500/20 p-2 rounded-lg text-sm inline-block">Error: API nahi chal rahi!</span></div>`;
    }
}
