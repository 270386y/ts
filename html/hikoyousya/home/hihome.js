document.addEventListener('DOMContentLoaded', () => {
    // 必要な要素の取得
    const body = document.getElementById('calendar-body');
    const monthText = document.getElementById('calendar-month');
    const shiftCards = document.querySelectorAll('.shift-card');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    // 表示用の基準日（初期値は現在時刻）
    let displayDate = new Date();

    /**
     * カレンダーを描画するメイン関数
     */
    function renderCalendar() {
        // カレンダーの中身を一旦空にする
        body.innerHTML = "";
        
        const year = displayDate.getFullYear();
        const month = displayDate.getMonth(); // 0-11
        const monthNum = month + 1;

        // 1. ヘッダーの年月表示を更新
        monthText.innerText = `${year}年 ${monthNum}月`;

        // 2. 下のシフトカードの日付表示を現在の月に合わせる
        shiftCards.forEach(card => {
            const dateNum = card.getAttribute('data-date');
            const dateSpan = card.querySelector('.card-date-text');
            if (dateSpan) {
                // カードの「〇月〇日」部分を自動更新
                dateSpan.innerText = `${monthNum}月${dateNum}日`;
            }
            // 月を切り替えた直後は、その月のカードをすべて表示する状態にする
            card.style.display = 'flex';
        });

        // 3. カレンダーのグリッド生成
        const firstDay = new Date(year, month, 1).getDay(); // 初日の曜日
        const lastDate = new Date(year, month + 1, 0).getDate(); // 月末の日付

        let date = 1;
        for (let i = 0; i < 6; i++) { // 最大6行
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) { // 7日間
                let cell = document.createElement('td');
                
                // 日付が入るべき場所かチェック
                if (i === 0 && j < firstDay || date > lastDate) {
                    cell.innerText = "";
                } else {
                    cell.innerText = date;
                    const currentDate = date;

                    // --- 日付をクリックした時の処理（トグル・フィルタリング） ---
                    cell.addEventListener('click', () => {
                        const isSelected = cell.classList.contains('selected');
                        
                        // すべてのセルのハート（選択状態）を一旦解除
                        document.querySelectorAll('.calendar-table td').forEach(td => {
                            td.classList.remove('selected');
                        });

                        if (isSelected) {
                            // 【OFF】すでにハートがある日をもう一度押した時：全表示に戻す
                            shiftCards.forEach(card => card.style.display = 'flex');
                        } else {
                            // 【ON】新しく日付を押した時：ハートを固定し、その日のシフトだけ出す
                            cell.classList.add('selected');
                            shiftCards.forEach(card => {
                                // カードのdata-date属性とクリックした日付が一致するか確認
                                if (card.getAttribute('data-date') == currentDate) {
                                    card.style.display = 'flex';
                                } else {
                                    card.style.display = 'none';
                                }
                            });
                        }
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            body.appendChild(row);
            // 月末まで描ききったらループ終了
            if (date > lastDate) break;
        }
    }

    // --- 月切り替えボタンのイベント登録 ---
    prevBtn.addEventListener('click', () => {
        displayDate.setMonth(displayDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        displayDate.setMonth(displayDate.getMonth() + 1);
        renderCalendar();
    });

    // --- ✖ボタン（キャンセル）の遷移処理 ---
    document.querySelectorAll('.cancel-icon').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 親要素（カード全体や日付選択）のクリックイベントが連動しないようにガード
            e.stopPropagation(); 
            // 取り消し確認画面へ移動
            window.location.href = "../sihutotorikesi/sihutotorikesi.html";
        });
    });

    // 初回のカレンダー描画を実行
    renderCalendar();

    // ナビゲーションボタン
    const navLinks = {
        'nav-chat': "../chaattosen/chatsen.html",
        'nav-home': "../home/hihome.html",
        'nav-mypage': "../mypage/mypage.html"
    };
});