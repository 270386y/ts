document.addEventListener('DOMContentLoaded', function() {
    const closeModalBtn = document.getElementById('close-modal-btn');
    const deleteConfirmBtn = document.getElementById('delete-confirm-btn');
    const navChat = document.getElementById('nav-chat');
    const navHome = document.getElementById('nav-home');
    const navEmployee = document.getElementById('nav-employee');

    closeModalBtn.addEventListener('click', function() {
        window.location.href = "../koyou-hikoyou/koyou-hikoyou.html";
    });

    deleteConfirmBtn.addEventListener('click', function() {
        alert('情報を削除しました');
        window.location.href = "../koyou-hikoyou/koyou-hikoyou.html";
    });

    navChat.addEventListener('click', function() {
        window.location.href = "../koyou-chat/chat.html";
    });

    navHome.addEventListener('click', function() {
        window.location.href = "../koyou-home/koyou-home.html";
    });

    navEmployee.addEventListener('click', function() {
        window.location.href = "../koyou-hikoyou/koyou-hikoyou.html";
    });
});