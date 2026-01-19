document.addEventListener('DOMContentLoaded', function() {
    const chatBtn = document.getElementById('chat-btn');
    const homeBtn = document.getElementById('home-btn');
    const employeeBtn = document.getElementById('employee-btn');

    // Chatページへ
    chatBtn.addEventListener('click', function() {
        window.location.href = "../koyou-chat/koyou-chat.html";
    });

    // Home（一番上までスクロール）
    homeBtn.addEventListener('click', function() {
        document.querySelector('.main-content').scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Employeeページへ
    employeeBtn.addEventListener('click', function() {
        window.location.href = "../koyou-hikoyou/koyou-hikoyou.html";
    });
});