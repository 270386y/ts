document.addEventListener('DOMContentLoaded', () => {
    // 戻る（✖ボタン）
    document.getElementById('close-btn').addEventListener('click', () => {
        window.history.back();
    });

    // 「はい！取り消します！」ボタン
    document.getElementById('delete-btn').addEventListener('click', () => {
        alert("シフトの取り消しが完了しました。");
        window.location.href = "../home/hihome.html"; // ホーム画面へ戻る
    });

    // ナビゲーションボタン
    const navLinks = {
        'nav-chat': "../chaattosen/chatsen.html",
        'nav-home': "../home/hihome.html",
        'nav-mypage': "../mypage/mypage.html"
    };

    Object.keys(navLinks).forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            window.location.href = navLinks[id];
        });
    });
});