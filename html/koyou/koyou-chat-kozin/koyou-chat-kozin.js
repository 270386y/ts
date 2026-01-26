document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatTimeline = document.getElementById('chat-timeline');
    const chatTitle = document.querySelector('.chat-title');

    const params = new URLSearchParams(window.location.search);
    const targetId = params.get('id') || 'default';
    const targetName = params.get('name') || 'チャット';
    chatTitle.innerText = targetName;

    loadChatHistory();

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text === "") return;

        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        saveMessage(text, 'sent', timeString);
        renderMessage(text, 'sent', timeString);
        
        messageInput.value = "";
        chatTimeline.scrollTop = chatTimeline.scrollHeight;
    }

    function renderMessage(text, type, time) {
        const messageHtml = `
            <div class="message ${type}">
                <div class="bubble">${escapeHtml(text)}</div>
                <span class="time">${time}</span>
            </div>
        `;
        chatTimeline.insertAdjacentHTML('beforeend', messageHtml);
    }

    function saveMessage(text, type, time) {
        let history = JSON.parse(localStorage.getItem('koyou_history_' + targetId) || '[]');
        history.push({ text, type, time });
        localStorage.setItem('koyou_history_' + targetId, JSON.stringify(history));
        localStorage.setItem('koyou_last_msg_' + targetId, text);
    }

    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem('koyou_history_' + targetId) || '[]');
        history.forEach(msg => renderMessage(msg.text, msg.type, msg.time));
        chatTimeline.scrollTop = chatTimeline.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    document.getElementById('back-btn').addEventListener('click', () => window.history.back());

    const navLinks = {
        'nav-chat': '../koyou-chat/koyou-chat.html',
        'nav-home': '../koyou-home/koyou-home.html',
        'nav-employee': '../koyou-hikoyou/koyou-hikoyou.html'
    };
    Object.keys(navLinks).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => window.location.href = navLinks[id]);
    });

    chatTimeline.scrollTop = chatTimeline.scrollHeight;
});