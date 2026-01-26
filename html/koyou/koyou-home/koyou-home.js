document.addEventListener('DOMContentLoaded', function() {
    const navLinks = {
        'chat-btn': '../koyou-chat/koyou-chat.html',
        'home-btn': '../koyou-home/koyou-home.html',
        'employee-btn': '../koyou-hikoyou/koyou-hikoyou.html'
    };
    Object.keys(navLinks).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => window.location.href = navLinks[id]);
    });

    function handleApproveClick(btn) {
        const li = btn.closest('li');
        const info = li.querySelector('.shift-info').innerText;
        const [name, timeRange] = info.split('…');
        const [start, end] = timeRange.split('〜');

        li.innerHTML = `
            <div class="approval-form">
                <span class="name-tag">${name}</span>
                <div class="time-inputs">
                    <input type="time" class="flat-time" id="edit-start" value="${start.trim()}">
                    <span>〜</span>
                    <input type="time" class="flat-time" id="edit-end" value="${end.trim()}">
                </div>
                <div class="form-btns">
                    <button class="confirm-approve-btn">確定</button>
                    <button class="cancel-form-btn">戻る</button>
                </div>
            </div>
        `;

        li.querySelector('.confirm-approve-btn').addEventListener('click', function() {
            const startInput = li.querySelector('#edit-start');
            const endInput = li.querySelector('#edit-end');
            
            startInput.classList.remove('error-pulse');
            endInput.classList.remove('error-pulse');

            if (startInput.value >= endInput.value) {
                startInput.classList.add('error-pulse');
                endInput.classList.add('error-pulse');
                alert("終了時間は開始時間より後に設定してください！");
                return;
            }

            const finalTime = `${startInput.value}〜${endInput.value}`;
            li.innerHTML = `
                <span class="status-label approved">承諾：${finalTime}</span>
                <button class="undo-btn" onclick="location.reload()">やり直す</button>
            `;
        });

        li.querySelector('.cancel-form-btn').addEventListener('click', () => location.reload());
    }


    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', () => handleApproveClick(btn));
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const li = this.closest('li');
            li.innerHTML = `
                <span class="status-label rejected">却下済み</span>
                <button class="undo-btn" onclick="location.reload()">やり直す</button>
            `;
        });
    });
});