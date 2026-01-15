document.addEventListener('DOMContentLoaded', () => {
    // 通知ボタン
    document.getElementById('noti-btn').addEventListener('click', () => {
        window.location.href = "tuti.html";
    });

    // ログアウトボタン
    document.getElementById('logout-trigger').addEventListener('click', () => {
        window.location.href = "../roguauto/roguauto.html";
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
            btn.addEventListener('click', () => window.location.href = navLinks[id]);
        }
    });
});