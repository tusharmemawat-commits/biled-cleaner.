// ==========================================
// ⚙️ GLOBAL MASTER CONFIGURATION
// ==========================================
const APP_SETTINGS = {
    name: "AURASYNTH",
    subtitle: "BILED CLEANER • ID: 88543 K J",
    apiKey: "AIzaSyDdTovT0PYgykKkzHHpAMXgX1uzHXWaSoY",
    whatsappNumber: "91XXXXXXXXXX", // Aapka WhatsApp number (Country code ke saath)
    welcomeMsg: "Welcome to the future of Fashion. Main hoon AURASYNTH. Kya main aapke liye kuch luxury styles suggest karoon?",
};

// ==========================================
// 👕 PRODUCT CATALOG (Yahan se kabhi bhi badlein)
// ==========================================
const MY_PRODUCTS = [
    { id: 1, name: "Luxury Silk Shirt", price: "₹2,999", img: "https://via.placeholder.com/100" },
    { id: 2, name: "Premium Slim Fit Chinos", price: "₹3,499", img: "https://via.placeholder.com/100" },
    { id: 3, name: "Italian Leather Jacket", price: "₹8,999", img: "https://via.placeholder.com/100" }
];

// ==========================================
// 🚀 THE SYSTEM LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app-name').innerText = APP_SETTINGS.name;
    document.getElementById('app-subtitle').innerText = APP_SETTINGS.subtitle;
    showAIResponse(APP_SETTINGS.welcomeMsg);
});

// Voice Input Feature
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN';
    recognition.start();
    document.getElementById('status-bar').innerText = "Listening... Bolna shuru karein";
    
    recognition.onresult = (event) => {
        document.getElementById('userInput').value = event.results[0][0].transcript;
        askAI();
    };
}

async function askAI() {
    const input = document.getElementById('userInput');
    const msg = input.value;
    if(!msg) return;

    appendMessage('user', msg);
    input.value = '';
    document.getElementById('status-bar').innerText = "Analyzing Trends...";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${APP_SETTINGS.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `You are AURASYNTH, a world-class luxury fashion expert for Biled Cleaner. Reply in Hinglish. If user asks for products or clothes, mention we have Luxury Shirts and Jackets. User query: ${msg}` }] }]
            })
        });
        
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        showAIResponse(reply);
        
        // Agar user 'show products' ya 'kapde dikhao' bole toh catalog dikhayein
        if(msg.toLowerCase().includes('kapde') || msg.toLowerCase().includes('product')) {
            showCatalog();
        }

        document.getElementById('status-bar').innerText = APP_SETTINGS.subtitle + " • Active";
    } catch (err) {
        document.getElementById('status-bar').innerText = "System Error. Key check karein.";
    }
}

function showAIResponse(text) {
    appendMessage('ai', text);
}

function appendMessage(type, text) {
    const chatBox = document.getElementById('chat-box');
    const bubbleClass = type === 'ai' ? 'ai-bubble' : 'user-bubble';
    const alignClass = type === 'ai' ? 'items-start' : 'items-end';
    
    chatBox.innerHTML += `
        <div class="flex flex-col ${alignClass}">
            <div class="${bubbleClass}">${text}</div>
        </div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showCatalog() {
    const chatBox = document.getElementById('chat-box');
    let catalogHTML = '<div class="grid grid-cols-1 gap-4 mt-4">';
    
    MY_PRODUCTS.forEach(p => {
        catalogHTML += `
            <div class="apple-glass p-4 flex items-center justify-between border border-white/10">
                <div class="flex items-center gap-3">
                    <img src="${p.img}" class="w-12 h-12 rounded-lg">
                    <div>
                        <p class="text-sm font-bold">${p.name}</p>
                        <p class="text-xs text-white/50">${p.price}</p>
                    </div>
                </div>
                <button onclick="orderWhatsApp('${p.name}')" class="bg-white text-black text-[10px] px-3 py-1 rounded-full font-bold">BUY</button>
            </div>`;
    });
    
    chatBox.innerHTML += catalogHTML + '</div>';
    chatBox.scrollTop = chatBox.scrollHeight;
}

function orderWhatsApp(product) {
    const link = `https://wa.me/${APP_SETTINGS.whatsappNumber}?text=Hello AURASYNTH, I want to buy the ${product}. My ID is 88543 K J.`;
    window.open(link, '_blank');
            }
        
