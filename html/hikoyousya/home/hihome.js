document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('calendar-body');
    const monthText = document.getElementById('calendar-month');
    const shiftCards = document.querySelectorAll('.shift-card');
    const addBtnContainer = document.getElementById('add-btn-container');

    let displayDate = new Date();

    function renderCalendar() {
        body.innerHTML = "";
        const year = displayDate.getFullYear();
        const month = displayDate.getMonth();
        const monthNum = month + 1;

        monthText.innerText = `${year}年 ${monthNum}月`;

        // 今日の日付を取得（比較用に時刻を00:00:00にリセット）
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        shiftCards.forEach(card => {
            const dateNum = card.getAttribute('data-date');
            card.querySelector('.card-date-text').innerText = `${monthNum}月${dateNum}日`;
            card.style.display = (card.getAttribute('data-month') == monthNum) ? 'flex' : 'none';
        });

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                if (i === 0 && j < firstDay || date > lastDate) {
                    cell.innerText = "";
                } else {
                    cell.innerText = date;
                    const curDate = date;

                    cell.addEventListener('click', () => {
                        const isSelected = cell.classList.contains('selected');
                        document.querySelectorAll('.calendar-table td').forEach(td => td.classList.remove('selected'));

                        if (isSelected) {
                            // 解除時：ボタンを隠す
                            addBtnContainer.style.display = 'none';
                            shiftCards.forEach(card => { 
                                if(card.getAttribute('data-month') == monthNum) card.style.display = 'flex'; 
                            });
                        } else {
                            // 選択時
                            cell.classList.add('selected');
                            
                            // クリックした日付のオブジェクトを作成
                            const clickedDate = new Date(year, month, curDate);
                            
                            // 【修正ポイント】今日より前（過去）ならボタンを表示しない
                            if (clickedDate < today) {
                                addBtnContainer.style.display = 'none';
                            } else {
                                addBtnContainer.style.display = 'flex';
                            }

                            // カードの絞り込み表示
                            shiftCards.forEach(card => {
                                card.style.display = (card.getAttribute('data-date') == curDate && card.getAttribute('data-month') == monthNum) ? 'flex' : 'none';
                            });
                        }
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            body.appendChild(row);
            if (date > lastDate) break;
        }
    }

    // 月切り替え
    document.getElementById('prev-month').addEventListener('click', () => { 
        displayDate.setMonth(displayDate.getMonth()-1); 
        addBtnContainer.style.display = 'none'; // 月移動時にボタンを隠す
        renderCalendar(); 
    });
    document.getElementById('next-month').addEventListener('click', () => { 
        displayDate.setMonth(displayDate.getMonth()+1); 
        addBtnContainer.style.display = 'none'; // 月移動時にボタンを隠す
        renderCalendar(); 
    });

    // ✖ボタン遷移
    document.querySelectorAll('.cancel-icon').forEach(btn => {
        btn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            window.location.href = '../sihutotorikesi/sihutotorikesi.html'; 
        });
    });

    // ナビゲーション
    document.getElementById('nav-chat').addEventListener('click', () => location.href = '../chaattosen/chatsen.html');
    document.getElementById('nav-mypage').addEventListener('click', () => location.href = '../mypage/mypage.html');
    document.getElementById('nav-home').addEventListener('click', () => location.href = '../home/hihome.html');

    // 追加ボタンのクリックイベント（パラメータ送信）
    const addBtn = document.querySelector('.add-action-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const selectedCell = document.querySelector('.calendar-table td.selected');
            if (selectedCell) {
                const year = displayDate.getFullYear();
                const month = displayDate.getMonth() + 1;
                const day = selectedCell.innerText;
                window.location.href = `../sihutotuika/sihutotuika.html?y=${year}&m=${month}&d=${day}`;
            } else {
                alert("日付を選択してください");
            }
        });
    }

    renderCalendar();
});