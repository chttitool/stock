/**
 * 更新頻率設定卡片收折功能
 * @module collapse
 */

/**
 * 收折更新頻率設定卡片
 * @param {boolean} collapse 是否收折（true=收折，false=展開）
 */
function toggleFrequencyCardCollapse(collapse) {
    const collapseEl = document.getElementById('frequencyCollapse');
    if (!collapseEl) return;
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
    if (collapse) {
        bsCollapse.hide();
        document.getElementById('frequencyCollapseIcon').classList.remove('fa-chevron-down');
        document.getElementById('frequencyCollapseIcon').classList.add('fa-chevron-up');
    } else {
        bsCollapse.show();
        document.getElementById('frequencyCollapseIcon').classList.remove('fa-chevron-up');
        document.getElementById('frequencyCollapseIcon').classList.add('fa-chevron-down');
    }
}

// 點擊 header 手動展開/收折
window.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.card-header[data-bs-toggle="collapse"]');
    if (header) {
        header.addEventListener('click', function() {
            const collapseEl = document.getElementById('frequencyCollapse');
            const isShown = collapseEl.classList.contains('show');
            toggleFrequencyCardCollapse(isShown);
        });
    }
});

// 將函式掛到 window 以供外部呼叫
window.toggleFrequencyCardCollapse = toggleFrequencyCardCollapse;
