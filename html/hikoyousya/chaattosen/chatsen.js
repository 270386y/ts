// chatsen.js
document.addEventListener('DOMContentLoaded', () => {
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
        const targetId = item.getAttribute('data-target');
        const name = item.getAttribute('data-name');
        const previewElement = item.querySelector('.chat-preview');

        // 最後に話した言葉を取得
        const lastMsg = localStorage.getItem('last_msg_' + targetId);
        
        // メッセージがある時だけ「名前：メッセージ」の形式にする
        if (lastMsg) {
            previewElement.innerText = `${name}：${lastMsg}`;
        } else {
            // メッセージがない時は名前だけ表示
            previewElement.innerText = name;
        }

        item.addEventListener('click', () => {
            // IDと名前を次の画面に送る
            window.location.href = `../chatto/chat.html?id=${targetId}&name=${encodeURIComponent(name)}`;
        });
    });

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