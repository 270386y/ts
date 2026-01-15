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

    // ナビゲーション
    document.getElementById('nav-chat').addEventListener('click', () => {
        window.location.href = "user_chat.html";
    });
    document.getElementById('nav-home').addEventListener('click', () => {
        window.location.href = "home.html";
    });
    document.getElementById('nav-mypage').addEventListener('click', () => {
        window.location.href = "user_mypage.html";
    });
});