document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('close-btn');
    const addSubmitBtn = document.getElementById('add-submit-btn');

    closeBtn.addEventListener('click', function() {
        window.location.href = "../koyou-hikoyou/koyou-hikoyou.html";
    });

    addSubmitBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const type = document.getElementById('type').value;
        const address = document.getElementById('address').value;
        const emergency = document.getElementById('emergency').value;

        if (name && phone && type && address && emergency) {
            alert('登録が完了しました：' + name);
            window.location.href = "../koyou-hikoyou/koyou-hikoyou.html";
        } else {
            alert('すべての項目を入力してください');
        }
    });
});