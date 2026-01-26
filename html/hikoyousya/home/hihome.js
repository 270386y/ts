document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('calendar-body');
    const monthText = document.getElementById('calendar-month');
    const shiftList = document.getElementById('shift-list');
    const addBtnContainer = document.getElementById('add-btn-container');

    let displayDate = new Date();

    // 保存されたシフトを読み込んでカードを作成する関数
    function loadSavedShifts() {
        const shifts = JSON.parse(localStorage.getItem('user_shifts') || '[]');
        
        // 重複表示を防ぐため、動的に追加されたカードのみを一旦削除
        const existingDynamicCards = shiftList.querySelectorAll('.dynamic-shift');
        existingDynamicCards.forEach(c => c.remove());

        shifts.forEach((s, index) => {
            const card = document.createElement('div');
            card.className = 'shift-card dynamic-shift'; 
            card.setAttribute('data-date', s.day);
            card.setAttribute('data-month', s.month);
            
            card.innerHTML = `
                <div class="shift-info">
                    <p class="shift-date"><span class="card-date-text">${s.month}月${s.day}日</span></p>
                    <p class="company-name">${s.company}</p>
                    <p class="shift-time">${s.time}</p>
                </div>
                <div class="status-area" style="display: flex; align-items: center; gap: 8px;">
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <button class="status-btn edit-btn" data-index="${index}" style="background-color: #ffd1df; color: #1a1a1a;">編集</button>
                        <button class="status-btn blue">承諾待ち</button>
                    </div>
                    <button class="cancel-icon delete-dynamic-btn" data-index="${index}">✖</button>
                </div>
            `;
            shiftList.appendChild(card);
        });

        attachEvents();
    }

    function attachEvents() {
        document.querySelectorAll('.delete-dynamic-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = '../sihutotorikesi/sihutotorikesi.html'; 
            });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = btn.getAttribute('data-index');
                const s = JSON.parse(localStorage.getItem('user_shifts'))[idx];
                window.location.href = `../sihutotuika/sihutotuika.html?y=${s.year}&m=${s.month}&d=${s.day}&edit=${idx}`;
            });
        });
    }

    function initStaticEvents() {
        document.querySelectorAll('.shift-card:not(.dynamic-shift)').forEach(card => {
            const cancelBtn = card.querySelector('.cancel-icon');
            const statusBtn = card.querySelector('.status-btn.blue');

            if (statusBtn && cancelBtn) {
                const btnStack = document.createElement('div');
                btnStack.style.display = 'flex';
                btnStack.style.flexDirection = 'column';
                btnStack.style.gap = '4px';
                
                const editBtn = document.createElement('button');
                editBtn.className = 'status-btn';
                editBtn.innerText = '編集';
                editBtn.style.backgroundColor = '#ffd1df';
                editBtn.style.color = '#1a1a1a';

                statusBtn.parentNode.insertBefore(btnStack, statusBtn);
                btnStack.appendChild(editBtn);
                btnStack.appendChild(statusBtn);

                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const d = card.getAttribute('data-date');
                    const m = card.getAttribute('data-month');
                    window.location.href = `../sihutotuika/sihutotuika.html?y=${displayDate.getFullYear()}&m=${m}&d=${d}`;
                });

                cancelBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.location.href = '../sihutotorikesi/sihutotorikesi.html';
                });
            }
        });
    }

    function renderCalendar() {
        body.innerHTML = "";
        const year = displayDate.getFullYear();
        const month = displayDate.getMonth();
        const monthNum = month + 1;
        monthText.innerText = `${year}年 ${monthNum}月`;

        loadSavedShifts();

        const allCards = document.querySelectorAll('.shift-card');
        allCards.forEach(card => {
            const m = card.getAttribute('data-month');
            const d = card.getAttribute('data-date');
            const dateSpan = card.querySelector('.card-date-text');
            if (dateSpan) dateSpan.innerText = `${monthNum}月${d}日`;
            card.style.display = (m == monthNum) ? 'flex' : 'none';
        });

        // 今日の日付を取得（比較用に時刻をリセット）
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                if (!(i === 0 && j < firstDay) && date <= lastDate) {
                    cell.innerText = date;
                    const d = date;
                    cell.addEventListener('click', () => {
                        const isAlreadySelected = cell.classList.contains('selected');
                        document.querySelectorAll('.calendar-table td').forEach(td => td.classList.remove('selected'));

                        if (isAlreadySelected) {
                            // 選択解除
                            addBtnContainer.style.display = 'none';
                            allCards.forEach(c => {
                                const m = c.getAttribute('data-month');
                                c.style.display = (m == monthNum) ? 'flex' : 'none';
                            });
                        } else {
                            // 日付を選択
                            cell.classList.add('selected');
                            
                            // 選択した日付が今日以降かチェック
                            const clickedDate = new Date(year, month, d);
                            if (clickedDate >= today) {
                                addBtnContainer.style.display = 'flex';
                            } else {
                                addBtnContainer.style.display = 'none';
                            }

                            allCards.forEach(c => {
                                const match = (c.getAttribute('data-date') == d && c.getAttribute('data-month') == monthNum);
                                c.style.display = match ? 'flex' : 'none';
                            });
                        }
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            body.appendChild(row);
        }
    }

    document.getElementById('prev-month').addEventListener('click', () => { displayDate.setMonth(displayDate.getMonth()-1); renderCalendar(); });
    document.getElementById('next-month').addEventListener('click', () => { displayDate.setMonth(displayDate.getMonth()+1); renderCalendar(); });

    document.getElementById('nav-chat').addEventListener('click', () => location.href = '../chaattosen/chatsen.html');
    document.getElementById('nav-mypage').addEventListener('click', () => location.href = '../mypage/mypage.html');
    document.getElementById('nav-home').addEventListener('click', () => location.href = '../home/hihome.html');

    const addBtn = document.querySelector('.add-action-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const sel = document.querySelector('.calendar-table td.selected');
            if (sel) {
                window.location.href = `../sihutotuika/sihutotuika.html?y=${displayDate.getFullYear()}&m=${displayDate.getMonth()+1}&d=${sel.innerText}`;
            }
        });
    }

    initStaticEvents();
    renderCalendar();
});