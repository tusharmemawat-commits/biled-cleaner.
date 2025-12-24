// ==========================================
// 🕹️ ADMIN CONTROL PANEL (Aapka Pura Control)
// ==========================================
const ADMIN_CONTROL = {
    myNumber: "917566997766", // Aapka WhatsApp
    myID: "88543 K J",
    apiKey: "AIzaSyDdTovT0PYgykKkzHHpAMXgX1uzHXWaSoY",
    brandName: "BILED CLEANER",
    
    // AI ka Behavior (Yahan se AI ko jo chaho sikhao)
    aiInstructions: "You are the world's most elite fashion salesman. Your owner is 88543 K J. Always give sharp styling advice and then tell the user to join the VIP Waitlist on WhatsApp for the upcoming luxury drop. Reply in Hinglish.",
    
    welcomeMessage: "Welcome to AURASYNTH. Main aapka personal AI stylist hoon. Aaj aapko kya suggest karoon?"
};

// ==========================================
// 🛠️ SYSTEM CORE (Ise chhedne ki zaroorat nahi)
// ==========================================

window.onload = () => {
    appendMessage('ai', ADMIN_CONTROL.welcomeMessage);
};

async function askAI() {
    const input = document.getElementById('userInput');
    const msg = input.value;
    if(!msg) return;

    appendMessage('user', msg);
    input.value = '';
    document.getElementById('status-bar').innerText = "AI IS GENERATING SALES...";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ADMIN_CONTROL.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: ADMIN_CONTROL.aiInstructions + " User says: " + msg }] }]
            })
        });
        
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        appendMessage('ai', reply);
        
        // Auto-show VIP Button after every AI reply
        showAdminAction();
        document.getElementById('status-bar').innerText = "SYSTEM ACTIVE • ID: " + ADMIN_CONTROL.myID;
    } catch (err) {
        document.getElementById('status-bar').innerText = "ERROR: CHECK API KEY";
    }
}

function showAdminAction() {
    const chatBox = document.getElementById('chat-box');
    const actionBox = document.createElement('div');
    actionBox.className = 'ai-bubble';
    actionBox.style.border = "1px solid #00f2ff";
    actionBox.innerHTML = `
        <p style="color:#00f2ff; font-weight:bold; font-size:11px; margin-bottom:10px;">💎 JOIN THE EXCLUSIVE LIST</p>
        <button onclick="window.open('https://wa.me/${ADMIN_CONTROL.myNumber}?text=Bhai+VIP+list+mein+naam+daal+do.+ID+${ADMIN_CONTROL.myID}')" 
            style="background:#00f2ff; color:#000; border:none; padding:10px; border-radius:20px; font-size:10px; font-weight:bold; cursor:pointer; width:100%;">
            WHATSAPP ADMIN
        </button>
    `;
    chatBox.appendChild(actionBox);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(type, text) {
    const chatBox = document.getElementById('chat-box');
    const bubble = document.createElement('div');
    bubble.className = type === 'ai' ? 'ai-bubble' : 'user-bubble';
    bubble.innerText = text;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}
