document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const displayArea = document.getElementById('display-date');
    const startInput = document.getElementById('start-time');
    const endInput = document.getElementById('end-time');
    const companySelect = document.getElementById('company-select');
    const submitBtn = document.getElementById('submit-shift');

    const year = params.get('y'), month = params.get('m'), day = params.get('d'), editIdx = params.get('edit');
    if (year) displayArea.innerText = `${year}年${month}月${day}日`;

    let shifts = JSON.parse(localStorage.getItem('user_shifts') || '[]');
    
    if (editIdx !== null) {
        const s = shifts[editIdx];
        companySelect.value = s.company;
        [startInput.value, endInput.value] = s.time.split('〜');
        submitBtn.innerText = "変更を保存する";
    }

    submitBtn.addEventListener('click', () => {
        const sTime = startInput.value, eTime = endInput.value;
        if (!sTime || !eTime || sTime >= eTime) {
            alert('時間を正しく入力してください');
            return;
        }

        // 保存データに status を追加
        const data = { 
            year, month, day, 
            company: companySelect.value, 
            time: `${sTime}〜${eTime}`,
            status: '承諾待ち' // 初期ステータス
        };
        
        const isOverlap = shifts.some((s, i) => {
            if (editIdx !== null && i == editIdx) return false;
            return (s.year == year && s.month == month && s.day == day && sTime < s.time.split('〜')[1] && s.time.split('〜')[0] < eTime);
        });

        if (isOverlap) { alert('この時間は既に登録されています'); return; }

        if (editIdx !== null) shifts[editIdx] = data; else shifts.push(data);
        localStorage.setItem('user_shifts', JSON.stringify(shifts));
        window.location.href = '../home/hihome.html';
    });
});