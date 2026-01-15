document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.getElementById('calendar-body');
    const monthDisplay = document.getElementById('calendar-month');
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // カレンダーの見出し設定
    monthDisplay.innerText = `${year}年 ${month + 1}月`;

    // 月の最初の日と最後の日を取得
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDay) {
                // 空白セル
                cell.innerText = "";
            } else if (date > lastDate) {
                // 空白セル
                break;
            } else {
                cell.innerText = date;
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
        if (date > lastDate) break;
    }

    // ナビゲーション処理
    document.getElementById('nav-chat').addEventListener('click', () => {
        window.location.href = "user_chat.html";
    });
    
    document.getElementById('nav-mypage').addEventListener('click', () => {
        window.location.href = "user_mypage.html";
    });
});