document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message-input');
    const chatDisplay = document.getElementById('chat-display');

    // メッセージ送信機能
    sendBtn.addEventListener('click', function() {
        const text = messageInput.value.trim();
        if (text !== "") {
            // 新しいメッセージの要素を作成
            const row = document.createElement('div');
            row.className = 'message-row sent';
            row.innerHTML = `<div class="bubble">${text}</div>`;
            
            // 画面に追加
            chatDisplay.appendChild(row);
            
            // 入力欄を空にする
            messageInput.value = "";
            
            // 一番下までスクロール
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }
    });

    // ナビゲーションの遷移（一階層上を考慮）
    document.getElementById('nav-chat').addEventListener('click', function() {
        window.location.href = "../koyou-chat/koyou-chat.html";
    });

    document.getElementById('nav-home').addEventListener('click', function() {
        window.location.href = "../koyou-home/koyou-home.html";
    });

    document.getElementById('nav-employee').addEventListener('click', function() {
        window.location.href = "../koyou-em.html";
    });
});