document.addEventListener('DOMContentLoaded', () => {
    // 1. URLから日付取得
    const params = new URLSearchParams(window.location.search);
    const displayArea = document.getElementById('display-date');
    if (params.get('y')) {
        displayArea.innerText = `${params.get('y')}年${params.get('m')}月${params.get('d')}日`;
    }

    // 2. 追加ボタンの動作
    const submitBtn = document.getElementById('submit-shift');
    const startInput = document.getElementById('start-time');
    const endInput = document.getElementById('end-time');

    submitBtn.addEventListener('click', () => {
        const startTime = startInput.value;
        const endTime = endInput.value;

        // エラー表示を一旦リセット
        startInput.classList.remove('error-border');
        endInput.classList.remove('error-border');

        // 【エラーチェック】どちらかが空なら実行
        if (!startTime || !endTime) {
            if (!startTime) startInput.classList.add('error-border');
            if (!endTime) endInput.classList.add('error-border');
            
            alert('開始時間と終了時間の両方を入力してください！');
            return; // ここで処理を中断
        }

        // 保存成功時の処理
        alert(`${displayArea.innerText} ${startTime}〜${endTime} のシフトを追加しました！`);
        window.location.href = '../home/hihome.html';
    });
});