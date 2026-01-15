document.addEventListener('DOMContentLoaded', function() {
    const employeeBtn = document.getElementById('employee-btn');
    const employerBtn = document.getElementById('employer-btn');

    // 被雇用者ボタン
    employeeBtn.addEventListener('click', function() {
        console.log("被雇用者が選ばれました");
        // ログイン画面へ移動
        window.location.href = "../hikoyousya/roguin/hiroguin.html";
    });

    // 雇用者ボタン
    employerBtn.addEventListener('click', function() {
        console.log("雇用者が選ばれました");
        // ここも必要に応じて移動先を変えてください
        window.location.href = "../koyou/koyou-roguin/koyou-roguin.html";
    });
});