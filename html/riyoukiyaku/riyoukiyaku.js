document.addEventListener('DOMContentLoaded', function() {
    const agreeBtn = document.getElementById('agree-btn');
    const disagreeBtn = document.getElementById('disagree-btn');

    // 同意するボタン
    agreeBtn.addEventListener('click', function() {
        console.log("規約に同意しました");
        // 次の画面（さっき作った選択画面など）へ移動
        window.location.href = "../yuza-senntaku/yuza-senntaku.html";
    });

    // 同意しないボタン
    disagreeBtn.addEventListener('click', function() {
        alert("規約に同意いただけない場合は、アプリをご利用いただけません。");
    });
});