# 台灣股票即時價格顯示系統

一個基於 Python Flask 的網頁應用程式，用於顯示台灣股票的即時價格，具備自動更新、主題切換、通知系統等功能。

## 專案特色

- 🚀 **即時股價顯示**：使用 twstock 套件取得台灣股票即時價格
- 📱 **響應式設計**：支援桌面與行動裝置，使用 Bootstrap 5 框架
- 🌙 **主題切換**：支援深色/淺色主題切換
- ⏱️ **自動更新**：可設定 5 秒、10 秒、30 秒、1 分鐘的更新頻率
- 🔔 **通知系統**：即時顯示更新狀態與錯誤訊息
- ✨ **動畫效果**：流暢的 CSS 動畫與過渡效果
- 🎨 **色彩繽紛**：使用漸層色彩與現代化設計

## 技術架構

### 後端技術
- **Python 3.13+**
- **Flask 3.0.0** - Web 框架
- **twstock 1.3.1** - 台灣股票資料
- **pytest 7.4.3** - 測試框架

### 前端技術
- **Bootstrap 5** - CSS 框架（來自 jsDelivr CDN）
- **FontAwesome 6** - 圖示庫（來自 jsDelivr CDN）
- **Animate.css** - 動畫效果（來自 jsDelivr CDN）
- **Vanilla JavaScript** - 前端互動邏輯

## 系統需求

- Windows 11
- Python 3.13 或更高版本
- 網路連線（用於取得股票資料）

## 安裝與執行

### 1. 建立專案目錄

```bash
mkdir stock-price-app
cd stock-price-app
```

### 2. 複製專案檔案

```bash
git clone https://github.com/chttitool/stock.git .
```

### 3. 建立 Python 虛擬環境

```bash
# 使用 Python 內建的 venv 建立虛擬環境
py -m venv stock29env

# 啟動虛擬環境
.\stock29env\Scripts\Activate.ps1
```

### 4. 安裝相依套件

```bash
pip install -r requirements.txt
```

如果遇到 lxml 安裝問題，請手動安裝：

```bash
pip install lxml
```

### 5. 啟動應用程式

```bash
python run.py
```

應用程式將在 http://127.0.0.1:5000 啟動。

## 使用說明

### 基本功能

1. **查詢股票**：
   - 在輸入框中輸入 4 位數的台灣股票代碼（例如：2330 代表台積電）
   - 點擊「查詢股價」按鈕或按 Enter 鍵

2. **設定更新頻率**：
   - 點擊頻率選項卡片選擇更新間隔（5 秒、10 秒、30 秒、1 分鐘）
   - 系統會自動按照設定的頻率更新股價

3. **切換主題**：
   - 點擊左上角的月亮/太陽圖示切換深色/淺色主題
   - 主題設定會自動儲存到瀏覽器

### 股票資訊顯示

成功查詢後會顯示以下資訊：
- **股票名稱與代碼**
- **目前股價**
- **漲跌金額與百分比**
- **開盤價、最高價、最低價**
- **成交量**
- **最後更新時間**

### 通知系統

系統會在以下情況顯示通知：
- 成功更新股價資料
- 查詢錯誤（無效股票代碼、網路問題等）
- 更新頻率變更

## 測試

### 執行所有測試

```bash
# 在虛擬環境中執行
python -m pytest

# 顯示詳細測試結果
python -m pytest -v

# 顯示測試覆蓋率
python -m pytest --cov=app
```

### 執行特定測試

```bash
# 測試股票服務
python -m pytest tests/test_stock_service.py

# 測試特定功能
python -m pytest tests/test_stock_service.py::TestStockService::test_get_real_time_price_success
```

## 專案結構

```
/
├── app/                        # Flask 應用程式主目錄
│   ├── __init__.py            # Flask 應用程式初始化
│   ├── routes.py              # 路由與 API 端點
│   ├── services/              # 業務邏輯服務
│   │   ├── __init__.py
│   │   └── stock_service.py   # 股票資料服務
│   ├── static/                # 靜態檔案（預留）
│   └── templates/             # HTML 模板
│       └── index.html         # 主頁面模板
├── tests/                     # 單元測試
│   ├── __init__.py
│   └── test_stock_service.py  # 股票服務測試
├── docs/                      # 專案文件
│   └── implementation/        # 實作計畫文件
│       └── 20250729-stock-price.md
├── .github/                   # GitHub 設定
│   └── copilot-instructions.md
├── requirements.txt           # Python 相依套件
├── .gitignore                # Git 忽略檔案設定
├── run.py                    # 應用程式啟動檔案
├── README.md                 # 專案說明文件
└── CHANGELOG.md              # 變更日誌
```

## API 文件

### 取得股票即時價格

```
GET /api/stock/<stock_code>
```

#### 參數
- `stock_code` (string): 4 位數的台灣股票代碼

#### 成功回應 (200)
```json
{
  "success": true,
  "data": {
    "code": "2330",
    "name": "台積電",
    "price": 500.0,
    "change": 5.0,
    "change_percent": 1.0,
    "volume": 10000,
    "high": 505.0,
    "low": 495.0,
    "open": 498.0,
    "time": "2025-07-29 15:30:00"
  }
}
```

#### 錯誤回應 (400)
```json
{
  "success": false,
  "error": "錯誤訊息"
}
```

## 開發指南

### 程式碼風格

- 遵循 PEP 8 Python 程式碼風格指南
- 所有函數、類別、方法都必須有詳細的中文 docstring
- 使用 Type Hints 標註變數型別
- 變數與參數使用描述性名稱並加上註解

### 測試指南

- 只針對業務邏輯撰寫單元測試
- 不測試前端 UI 或 API 端點
- 使用 pytest 框架
- 測試檔案命名格式：`test_*.py`
- 測試函數命名格式：`test_功能名稱`

### 提交指南

- 每個功能或修正都要分開提交
- 提交訊息使用繁體中文
- 定期同步到 GitHub

## 故障排除

### 常見問題

1. **ModuleNotFoundError: No module named 'lxml'**
   ```bash
   pip install lxml
   ```

2. **無法取得股票資料**
   - 檢查網路連線
   - 確認股票代碼正確（4 位數字）
   - 確認股票代碼存在於台灣股市

3. **Flask 應用程式無法啟動**
   - 確認虛擬環境已啟動
   - 確認所有相依套件已安裝
   - 檢查 5000 埠號是否被佔用

4. **股價資料不更新**
   - 檢查自動更新功能是否啟用
   - 檢查網路連線
   - 重新查詢股票

### 除錯模式

應用程式預設在除錯模式下執行，會自動重新載入程式碼變更。

生產環境部署時，請修改 `run.py` 中的 `debug=False`。

## 授權條款

本專案僅供學習與教育用途，不得用於商業用途。

股票資料來源於 twstock 套件，請遵循相關使用條款。

## 聯絡資訊

如有任何問題或建議，請至 GitHub Issues 回報：
https://github.com/lettucebo/20250729-AZ2007/issues

---

**版本：** 1.0.0  
**最後更新：** 2025-07-29  
**開發者：** GitHub Copilot
