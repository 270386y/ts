document.addEventListener('DOMContentLoaded', function() {
    // 1. 追加ボタンの遷移
    const addButton = document.getElementById('add-btn');
    addButton.addEventListener('click', function() {
        window.location.href = "koyou-hikoyou-touroku.html";
    });

    // 2. ✖ボタン（削除）の遷移
    const deleteBtns = document.querySelectorAll('.delete-icon-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = "koyou-hikoyou-sakujyo.html";
        });
    });

    // 3. ナビゲーションの遷移
    const navChat = document.getElementById('nav-chat');
    const navHome = document.getElementById('nav-home');
    const navEmployee = document.getElementById('nav-employee');

    navChat.addEventListener('click', function() {
        // チャット画面は別フォルダ（koyou-chat）内にある想定
        window.location.href = "../koyou-chat/koyou-chat.html";
    });

    navHome.addEventListener('click', function() {
        // ホーム画面へ
        window.location.href = "../koyou-home/koyou-home.html";
    });

    navEmployee.addEventListener('click', function() {
        // 現在のページなので上部へスクロール
        document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
    });
});