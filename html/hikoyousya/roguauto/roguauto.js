document.addEventListener('DOMContentLoaded', () => {
    // 勤務先解除（✖ボタン）の動作
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = e.target.closest('.workplace-item');
            const name = item.querySelector('.workplace-name').innerText;
            
            if (confirm(`${name} の登録を解除しますか？`)) {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.remove();
                }, 300);
            }
        });
    });

    // ナビゲーション遷移
    const navLinks = {
        'nav-chat': 'chatsen.html',
        'nav-home': 'home.html',
        'nav-mypage': 'user_mypage.html'
    };

    Object.keys(navLinks).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                window.location.href = navLinks[id];
            });
        }
    });
});