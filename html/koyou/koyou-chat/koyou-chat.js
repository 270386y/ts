document.addEventListener('DOMContentLoaded', () => {
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
        const targetId = item.getAttribute('data-target');
        const name = item.getAttribute('data-name');
        const previewElement = item.querySelector('.chat-preview');

        // 雇用主側のキー(koyou_last_msg_)でメッセージを取得
        const lastMsg = localStorage.getItem('koyou_last_msg_' + targetId);
        
        if (lastMsg) {
            previewElement.innerText = `${name}：${lastMsg}`;
        } else {
            previewElement.innerText = name;
        }

        item.addEventListener('click', () => {
            // 名前とIDを個人チャット画面へ送る
            window.location.href = `../koyou-chat-kozin/koyou-chat-kozin.html?id=${targetId}&name=${encodeURIComponent(name)}`;
        });
    });

    const navLinks = {
        'nav-chat': '../koyou-chat/koyou-chat.html',
        'nav-home': '../koyou-home/koyou-home.html',
        'nav-employee': '../koyou-hikoyou/koyou-hikoyou.html'
    };
    Object.keys(navLinks).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => window.location.href = navLinks[id]);
    });
});