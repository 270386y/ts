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

        // 月と日付テキストの同期
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
                            shiftCards.forEach(card => { if(card.getAttribute('data-month') == monthNum) card.style.display = 'flex'; });
                        } else {
                            // 選択時：ハートとボタンを出す
                            cell.classList.add('selected');
                            addBtnContainer.style.display = 'flex';
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
    document.getElementById('prev-month').addEventListener('click', () => { displayDate.setMonth(displayDate.getMonth()-1); renderCalendar(); });
    document.getElementById('next-month').addEventListener('click', () => { displayDate.setMonth(displayDate.getMonth()+1); renderCalendar(); });

    // ✖ボタン遷移
    document.querySelectorAll('.cancel-icon').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); window.location.href = '../sihutotorikesi/sihutotorikesi.html'; });
    });

    // ナビゲーション
    document.getElementById('nav-chat').addEventListener('click', () => location.href = '../chaattosen/chatsen.html');
    document.getElementById('nav-mypage').addEventListener('click', () => location.href = '../mypage/mypage.html');
    document.getElementById('nav-home').addEventListener('click', () => location.href = '../home/hihome.html');
    renderCalendar();

    document.addEventListener('DOMContentLoaded', () => {
    // 既存の renderCalendar などの処理...

    // 【重要】追加ボタンのクリックイベント
    const addBtn = document.querySelector('.add-action-btn');
    addBtn.addEventListener('click', () => {
        const selectedCell = document.querySelector('.calendar-table td.selected');
        if (selectedCell) {
            // カレンダーの状態から年月日を取得
            const year = displayDate.getFullYear();
            const month = displayDate.getMonth() + 1;
            const day = selectedCell.innerText;

            // URLパラメータを付けて画面遷移
            window.location.href = `../sihutotuika/sihutotuika.html?y=${year}&m=${month}&d=${day}`;
        } else {
            alert("日付を選択してください");
        }
    });
});

});
