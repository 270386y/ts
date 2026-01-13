// スクロール時のアニメーション
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.container');
    const scrollPos = window.innerHeight / 1.2;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < scrollPos) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
});

// 初期状態の設定
document.querySelectorAll('.container').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
});