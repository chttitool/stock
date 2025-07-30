/**
 * 收折更新頻率設定卡片
 * @param {boolean} collapse 是否收折（true=收折，false=展開）
 */
function toggleFrequencyCardCollapse(collapse) {
    // 取得 Bootstrap Collapse 元件
    const collapseEl = document.getElementById('frequencyCollapse');
    if (!collapseEl) return;
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
    if (collapse) {
        bsCollapse.hide();
        // 切換 icon 方向

// main.js - 初始化所有事件監聽器與功能匯入

function init() {
    // 初始化主題
    if (window.initializeTheme) window.initializeTheme();
    // 監聽股票查詢 Enter 鍵
    document.getElementById('stockCode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            window.searchStock();
        }
    });
    // 監聽 toggle 開關
    const toggle = document.getElementById('toggleUpdateClosed');
    if (toggle) {
        toggle.addEventListener('change', function() {
            if (window.currentStockCode) {
                clearInterval(window.updateInterval);
                window.startAutoUpdate();
            }
        });
    }
    window.addEventListener('beforeunload', function() {
        clearInterval(window.updateInterval);
    });
}

document.addEventListener('DOMContentLoaded', init);
        return;
    }
    updateInterval = setInterval(() => {
        if (currentStockCode) {
            const status = getMarketStatus();
            if (!allowUpdateWhenClosed && status !== 'open') {
                clearInterval(updateInterval);
                updateLastUpdateTime(status);
                showNotification(status === 'holiday' ? '台灣股市休市，暫停自動更新' : '台灣股市已收盤，暫停自動更新', 'info');
                return;
            }
            fetchStockData(currentStockCode);
        }
    }, currentFrequency * 1000);
}

/**
 * 更新最後更新時間
 */
function updateLastUpdateTime() {
    const lastUpdateSpan = document.getElementById('last-update');
    const now = new Date();
    const status = typeof arguments[0] === 'string' ? arguments[0] : getMarketStatus();
    let timeString = now.toLocaleString('zh-TW');
    if (status === 'holiday') {
        timeString += '（休市）';
    } else if (status === 'closed') {
        timeString += '（已收盤）';
    }
    lastUpdateSpan.textContent = `最後更新：${timeString}`;
}

/**
 * 顯示通知
 * @param {string} message - 通知訊息
 * @param {string} type - 通知類型 (success, danger, warning, info)
 */
function showNotification(message, type = 'info') {
    /**
     * 通知訊息由上而下排列，並自動消失
     * @param {string} message 通知內容
     * @param {string} type 通知類型
     */
    const notificationArea = document.getElementById('notification-area');
    // 建立通知元素
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification animate__animated animate__fadeInDown`;
    notification.innerHTML = `
        <strong><i class="fas fa-info-circle me-2"></i></strong>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    // 插入最上方，確保新通知在最上面
    if (notificationArea.firstChild) {
        notificationArea.insertBefore(notification, notificationArea.firstChild);
    } else {
        notificationArea.appendChild(notification);
    }
    // 3 秒後自動消失
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('animate__fadeOutUp');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, 3000);
}

/**
 * 初始化所有事件監聽器
 */
function init() {
    initializeTheme();
    // 監聽 toggle 開關
    const toggle = document.getElementById('toggleUpdateClosed');
    if (toggle) {
        toggle.addEventListener('change', function() {
            if (currentStockCode) {
                clearInterval(updateInterval);
                startAutoUpdate();
            }
        });
    }
    document.getElementById('stockCode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchStock();
        }
    });
    window.addEventListener('beforeunload', function() {
        clearInterval(updateInterval);
    });
}

document.addEventListener('DOMContentLoaded', init);
