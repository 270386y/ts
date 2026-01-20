document.addEventListener('DOMContentLoaded', () => {
    // チャット項目のクリックイベント
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            window.location.href = "../koyou-chat-kozin/koyou-chat-kozin.html"; 
        });
    });

    // ナビゲーションボタン
    const navLinks = {
        'nav-chat': '../koyou-chat/koyou-chat.html',
        'nav-home': '../koyou-home/koyou-home.html',
        'nav-employee': '../koyou-hikoyou/koyou-hikoyou.html'
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