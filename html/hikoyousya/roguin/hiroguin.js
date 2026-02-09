document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const backButton = document.getElementById('back-button');

    // ログイン
    loginButton.addEventListener('click', function() {
        const userId = document.getElementById('user-id').value;
        const password = document.getElementById('password').value;

        if (userId && password) {
            window.location.href = "../home/hihome.html";

        } else {
            alert('User IDとPasswordを入力してください');
        }
    });

    // もどるボタン
    backButton.addEventListener('click', function() {
        window.history.back();
    });

    // ナビゲーションボタン
    const navLinks = {
        'nav-chat': '../chaattosen/chatsen.html',
        'nav-home': '../home/hihome.html',
        'nav-mypage': '../mypage/mypage.html'
    };
});