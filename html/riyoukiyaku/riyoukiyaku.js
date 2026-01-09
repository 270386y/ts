// ボタンクリック時の動作定義
document.addEventListener('DOMContentLoaded', () => {
    const agreeBtn = document.getElementById('btn-agree');
    const disagreeBtn = document.getElementById('btn-disagree');

    // 同意するボタン
    agreeBtn.addEventListener('click', () => {
        alert('「同意する」が選択されました。');
    });

    // 同意しないボタン
    disagreeBtn.addEventListener('click', () => {
        alert('「同意しない」が選択されました。');
    });
});