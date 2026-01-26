// chat.js
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatTimeline = document.getElementById('chat-timeline');
    const chatTitle = document.querySelector('.chat-title');

    // 1. URLから宛名とIDを取得してタイトルを書き換える
    const params = new URLSearchParams(window.location.search);
    const targetId = params.get('id') || 'default';
    const targetName = params.get('name') || 'チャット';
    chatTitle.innerText = targetName;

    // 2. 保存されている過去のメッセージを読み込む
    loadChatHistory();

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text === "") return;

        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        // 3. メッセージをブラウザに保存する
        saveMessage(text, 'sent', timeString);

        renderMessage(text, 'sent', timeString);
        messageInput.value = "";
        chatTimeline.scrollTop = chatTimeline.scrollHeight;
    }

    // 画面にメッセージを表示する
    function renderMessage(text, type, time) {
        const messageHtml = `
            <div class="message ${type}">
                <div class="bubble">${escapeHtml(text)}</div>
                <span class="time">${time}</span>
            </div>
        `;
        chatTimeline.insertAdjacentHTML('beforeend', messageHtml);
    }

    // 保存処理
    function saveMessage(text, type, time) {
        // トーク履歴（配列）を保存
        let history = JSON.parse(localStorage.getItem('chat_history_' + targetId) || '[]');
        history.push({ text, type, time });
        localStorage.setItem('chat_history_' + targetId, JSON.stringify(history));

        // 一覧画面用の「最後のメッセージ」を保存
        localStorage.setItem('last_msg_' + targetId, text);
    }

    // 読み込み処理
    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem('chat_history_' + targetId) || '[]');
        history.forEach(msg => {
            renderMessage(msg.text, msg.type, msg.time);
        });
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    document.getElementById('back-btn').addEventListener('click', () => window.history.back());

    chatTimeline.scrollTop = chatTimeline.scrollHeight;

    // ナビゲーション
    const navLinks = {
        'nav-chat': '../chaattosen/chatsen.html',
        'nav-home': '../home/hihome.html',
        'nav-mypage': '../mypage/mypage.html'
    };
    Object.keys(navLinks).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => window.location.href = navLinks[id]);
    });

});