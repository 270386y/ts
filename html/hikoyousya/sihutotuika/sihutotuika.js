document.addEventListener('DOMContentLoaded', () => {
    // 戻る（✖ボタン）
    document.getElementById('close-btn').addEventListener('click', () => {
        window.history.back();
    });

    // 追加ボタン
    document.getElementById('add-submit-btn').addEventListener('click', () => {
        alert("シフトを追加しました！");
        window.location.href = "home.html"; // ホーム画面へ戻る
    });

    // ナビゲーションボタン
    const navLinks = {
        'nav-chat': '../chaattosen/chatsen.html',
        'nav-home': '../home/hihome.html',
        'nav-mypage': '../mypage/mypage.html'
    };
});