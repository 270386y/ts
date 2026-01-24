document.addEventListener('DOMContentLoaded', function() {
    const chatBtn = document.getElementById('chat-btn');
    const homeBtn = document.getElementById('home-btn');
    const employeeBtn = document.getElementById('employee-btn');

    chatBtn.addEventListener('click', function() {
        window.location.href = "../koyou-chat/koyou-chat.html";
    });

    homeBtn.addEventListener('click', function() {
        document.querySelector('.main-content').scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    employeeBtn.addEventListener('click', function() {
        window.location.href = "../koyou-hikoyou/koyou-hikoyou.html";
    });

    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('承認しました');
        });
    });

    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('却下しました');
        });
    });
});