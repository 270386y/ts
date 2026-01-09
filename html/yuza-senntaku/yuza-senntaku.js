document.addEventListener('DOMContentLoaded', function() {
    const employeeBtn = document.getElementById('employee-btn');
    const employerBtn = document.getElementById('employer-btn');

    // 被雇用者ボタンが押されたとき
    employeeBtn.addEventListener('click', function() {
        console.log("被雇用者が選択されました");
        // ここに次の画面（ログイン画面など）への移動処理を書く
        // window.location.href = "main.html";
    });

    // 雇用者ボタンが押されたとき
    employerBtn.addEventListener('click', function() {
        console.log("雇用者が選択されました");
        // 雇用者用の画面へ移動する場合など
        // window.location.href = "employer_main.html";
    });
});