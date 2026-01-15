document.addEventListener('DOMContentLoaded', () => {
    // 戻る（✖ボタン）
    document.getElementById('close-btn').addEventListener('click', () => {
        window.history.back();
    });

    // ナビゲーション遷移
    const navLinks = {
        'nav-chat': 'user_chat.html',
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