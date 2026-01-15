document.addEventListener('DOMContentLoaded', () => {
    // チャット項目のクリックイベント
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            // 実際は target ごとに URL を分けるかパラメータを渡す
            alert(`${target}とのチャットに移動します`);
            window.location.href = "user_chat_kozin.html"; 
        });
    });

    // ナビゲーション遷移
    const navLinks = {
        'nav-chat': 'chatsen.html',
        'nav-home': 'home.html',
        'nav-mypage': 'user_mypage.html'
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