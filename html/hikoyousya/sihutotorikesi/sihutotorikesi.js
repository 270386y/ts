document.addEventListener('DOMContentLoaded', () => {
    // 戻る（✖ボタン）
    document.getElementById('close-btn').addEventListener('click', () => {
        window.history.back();
    });

    // 「はい！取り消します！」ボタン
    document.getElementById('delete-btn').addEventListener('click', () => {
        alert("シフトの取り消しが完了しました。");
        window.location.href = "home.html"; // ホーム画面へ戻る
    });

    // ナビゲーションボタンの遷移
    const navLinks = {
        'nav-chat': 'user_chat.html',
        'nav-home': 'home.html',
        'nav-mypage': 'user_mypage.html'
    };

    Object.keys(navLinks).forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            window.location.href = navLinks[id];
        });
    });
});