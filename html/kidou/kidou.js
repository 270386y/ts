document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');

    // ボタンがクリックされた時の処理
    startButton.addEventListener('click', function() {
        // ログイン画面へ移動
        window.location.href = "../riyoukiyaku/riyoukiyaku.html";
    });
});