document.addEventListener('DOMContentLoaded', function() {
    // 1. ナビゲーションボタンの遷移
    const chatBtn = document.getElementById('chat-btn');
    const homeBtn = document.getElementById('home-btn');
    const employeeBtn = document.getElementById('employee-btn');

    homeBtn.addEventListener('click', function() {
        window.location.href = "../koyou-home/koyou-home.html";
    });

    employeeBtn.addEventListener('click', function() {
        window.location.href = "koyou-em.html";
    });

    // 2. 個人チャットへの遷移
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            // どの従業員のチャットか識別子を渡すことも可能（今回は固定の宛先へ）
            window.location.href = "../koyou-chat-kozin/koyou-chat-kozin.html";
        });
    });
});