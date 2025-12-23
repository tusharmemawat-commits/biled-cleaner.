/* Futuristic Background Animation */
body { 
    background: #0f172a;
    background-image: 
        radial-gradient(at 0% 0%, rgba(14, 165, 233, 0.15) 0, transparent 50%), 
        radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0, transparent 50%);
    color: white; 
    min-height: 100vh; 
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
}

/* Glass-morphism Card */
.glass { 
    background: rgba(255, 255, 255, 0.03); 
    backdrop-filter: blur(15px); 
    border: 1px solid rgba(255, 255, 255, 0.1); 
    border-radius: 24px; 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    animation: fadeIn 1s ease-out;
}

/* Glowing Button Animation */
.glow-button { 
    background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%); 
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.4); 
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    color: white;
    position: relative;
    overflow: hidden;
}

.glow-button:hover { 
    transform: translateY(-2px);
    box-shadow: 0 0 25px rgba(34, 211, 238, 0.7); 
}

/* Chat Message Bubbles */
.chat-container { 
    height: 350px; 
    overflow-y: auto; 
    padding-right: 5px;
}

/* Custom Scrollbar */
.chat-container::-webkit-scrollbar {
    width: 4px;
}
.chat-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
}

/* Simple Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Input Box Glow */
input:focus {
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
    border-color: #22d3ee !important;
            }
    
