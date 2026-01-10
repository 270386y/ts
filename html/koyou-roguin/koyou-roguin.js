document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const backButton = document.getElementById('back-button');

    // Loginボタンがクリックされた時
    loginButton.addEventListener('click', function() {
        const companyId = document.getElementById('company-id').value;
        const password = document.getElementById('password').value;

        if (companyId && password) {
            alert('ログインを試みます: ' + companyId);
            // ここに実際のログイン処理や遷移先を記述します
        } else {
            alert('IDとパスワードを入力してください');
        }
    });

    // もどるボタンがクリックされた時
    backButton.addEventListener('click', function() {
        // 前の画面（起動画面など）へ戻る
        window.history.back();
    });
});