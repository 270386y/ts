document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatTimeline = document.getElementById('chat-timeline');

    // 送信
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text === "") return;

        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        // HTMLを作成
        const messageHtml = `
            <div class="message sent">
                <div class="bubble">${escapeHtml(text)}</div>
                <span class="time">${timeString}</span>
            </div>
        `;

        // タイムラインに追加
        chatTimeline.insertAdjacentHTML('beforeend', messageHtml);

        // 入力欄クリア
        messageInput.value = "";

        chatTimeline.scrollTop = chatTimeline.scrollHeight;
    }

    // 関数
    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function(match) {
            const escape = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escape[match];
        });
    }

    // 送信ボタンクリック時
    sendBtn.addEventListener('click', sendMessage);

    // Enterキー送信
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 戻る
    document.getElementById('back-btn').addEventListener('click', () => {
        window.history.back();
    });

    // ナビゲーションボタン
    const navLinks = {
        'nav-chat': '../chaattosen/chatsen.html',
        'nav-home': '../home/hihome.html',
        'nav-mypage': '../mypage/mypage.html'
    };
    Object.keys(navLinks).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => window.location.href = navLinks[id]);
    });


    chatTimeline.scrollTop = chatTimeline.scrollHeight;
});