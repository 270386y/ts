document.addEventListener('DOMContentLoaded', () => {
    // 通知ボタン
    document.getElementById('noti-btn').addEventListener('click', () => {
        window.location.href = "tuti.html";
    });

    // ログアウトボタン
    document.getElementById('logout-trigger').addEventListener('click', () => {
        window.location.href = "logout.html";
    });

    // ナビゲーション
    const navLinks = {
        'nav-chat': 'chatsen.html',
        'nav-home': 'home.html',
        'nav-mypage': 'mypage.html'
    };

    Object.keys(navLinks).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => window.location.href = navLinks[id]);
        }
    });
});