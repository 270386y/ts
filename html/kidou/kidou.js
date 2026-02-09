document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');

    // ボタンがクリックされた時
    startButton.addEventListener('click', function() {
        // ログイン画面へ
        window.location.href = "../riyoukiyaku/riyoukiyaku.html";
    });
});