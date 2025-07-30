/**
 * 通知系統相關功能
 * @module notification
 */

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

// 將函式掛到 window 以供外部呼叫
window.showNotification = showNotification;
