document.addEventListener('DOMContentLoaded', () => {
    // チャット項目のクリックイベント
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            window.location.href = "../chatto/chat.html"; 
        });
    });

    // ナビゲーションボタン
    const navLinks = {
        'nav-chat': '../chaattosen/chatsen.html',
        'nav-home': '../home/hihome.html',
        'nav-mypage': '../mypage/mypage.html'
    };

    Object.keys(navLinks).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                window.location.href = navLinks[id];
            });
        }
    });
});