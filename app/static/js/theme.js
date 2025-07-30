/**
 * 主題切換相關功能
 * @module theme
 */

/**
 * 切換深色/淺色主題
 */
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

/**
 * 初始化主題設定
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
    }
}

// 將函式掛到 window 以供外部呼叫
window.toggleTheme = toggleTheme;
window.initializeTheme = initializeTheme;
