// main.js - 股票即時價格顯示系統前端邏輯
// 所有函式皆含繁體中文註解

let updateInterval; // 更新間隔計時器
let currentFrequency = 10; // 目前更新頻率（秒）
let currentStockCode = ''; // 目前查詢的股票代碼

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

/**
 * 設定股價更新頻率
 * @param {number} seconds - 更新頻率（秒）
 */
function setUpdateFrequency(seconds) {
    currentFrequency = seconds;
    document.querySelectorAll('.update-frequency-card').forEach(card => {
        card.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    if (currentStockCode) {
        clearInterval(updateInterval);
        startAutoUpdate();
    }
    showNotification(`更新頻率已設定為 ${seconds} 秒`, 'info');
}

/**
 * 搜尋股票
 */
function searchStock() {
    const stockCode = document.getElementById('stockCode').value.trim();
    if (!stockCode) {
        showNotification('請輸入股票代碼', 'warning');
        return;
    }
    if (!/^\d{4}$/.test(stockCode)) {
        showNotification('股票代碼必須是 4 位數字', 'warning');
        return;
    }
    currentStockCode = stockCode;
    fetchStockData(stockCode);
    startAutoUpdate();
}

/**
 * 取得股票資料
 * @param {string} stockCode - 股票代碼
 */
async function fetchStockData(stockCode) {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
    try {
        const response = await fetch(`/api/stock/${stockCode}`);
        const result = await response.json();
        if (result.success) {
            updateStockUI(result.data);
            updateLastUpdateTime();
            showNotification(`股票 ${stockCode} 資料更新成功`, 'success');
        } else {
            handleApiError(result.error);
        }
    } catch (error) {
        handleApiError(error.message);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

/**
 * 更新股票資訊 UI
 * @param {Object} data - 股票資料
 */
function updateStockUI(data) {
    const stockInfoCard = document.getElementById('stock-info-card');
    const stockDataDiv = document.getElementById('stock-data');
    const changeClass = data.change >= 0 ? 'positive' : 'negative';
    const changeIcon = data.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
    stockDataDiv.innerHTML = `
        <div class="col-12">
            <div class="card stock-card ${changeClass} mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h4 class="fw-bold mb-1">${data.name} (${data.code})</h4>
                            <h2 class="display-4 fw-bold mb-0">$${data.price.toFixed(2)}</h2>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <div class="price-change ${changeClass} mb-2">
                                <i class="fas ${changeIcon} me-1"></i>
                                ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} 
                                (${data.change_percent >= 0 ? '+' : ''}${data.change_percent.toFixed(2)}%)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-6 mb-3">
            <div class="card">
                <div class="card-body text-center">
                    <i class="fas fa-chart-bar text-primary fa-2x mb-2"></i>
                    <h6 class="text-muted">開盤價</h6>
                    <h5 class="fw-bold">$${data.open.toFixed(2)}</h5>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-6 mb-3">
            <div class="card">
                <div class="card-body text-center">
                    <i class="fas fa-arrow-up text-success fa-2x mb-2"></i>
                    <h6 class="text-muted">最高價</h6>
                    <h5 class="fw-bold">$${data.high.toFixed(2)}</h5>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-6 mb-3">
            <div class="card">
                <div class="card-body text-center">
                    <i class="fas fa-arrow-down text-danger fa-2x mb-2"></i>
                    <h6 class="text-muted">最低價</h6>
                    <h5 class="fw-bold">$${data.low.toFixed(2)}</h5>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-6 mb-3">
            <div class="card">
                <div class="card-body text-center">
                    <i class="fas fa-chart-area text-info fa-2x mb-2"></i>
                    <h6 class="text-muted">成交量</h6>
                    <h5 class="fw-bold">${data.volume.toLocaleString()}</h5>
                </div>
            </div>
        </div>
    `;
    stockInfoCard.style.display = 'block';
}

/**
 * API 錯誤處理
 * @param {string} message - 錯誤訊息
 */
function handleApiError(message) {
    showNotification(`取得股票資料失敗: ${message}`, 'danger');
}

/**
 * 開始自動更新
 */
function startAutoUpdate() {
    clearInterval(updateInterval);
    updateInterval = setInterval(() => {
        if (currentStockCode) {
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
    const timeString = now.toLocaleString('zh-TW');
    lastUpdateSpan.textContent = `最後更新：${timeString}`;
}

/**
 * 顯示通知
 * @param {string} message - 通知訊息
 * @param {string} type - 通知類型 (success, danger, warning, info)
 */
function showNotification(message, type = 'info') {
    const notificationArea = document.getElementById('notification-area');
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification animate__animated animate__fadeInRight`;
    notification.innerHTML = `
        <strong><i class="fas fa-info-circle me-2"></i></strong>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    notificationArea.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('animate__fadeOutRight');
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
