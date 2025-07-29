# 變更日誌

本檔案記錄專案的所有重要變更。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
版本編號遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

## [未發布]

### 規劃中
- 新增新聞與財報資訊 API 整合
- 新增股票價格圖表顯示
- 新增多股票監控功能
- 新增價格警示功能

## [1.0.0] - 2025-07-29

### 新增
- **基礎功能**
  - 台灣股票即時價格查詢功能
  - 支援 4 位數股票代碼查詢
  - 股票基本資訊顯示（名稱、價格、漲跌、成交量等）

- **使用者介面**
  - 響應式網頁設計，支援桌面與行動裝置
  - 使用 Bootstrap 5 現代化 UI 框架
  - FontAwesome 圖示庫整合
  - 色彩繽紛的漸層設計風格
  - 流暢的 CSS 動畫效果

- **主題系統**
  - 深色/淺色主題切換功能
  - 主題設定本地儲存
  - 動態主題圖示切換

- **自動更新功能**
  - 支援 4 種更新頻率：5 秒、10 秒、30 秒、1 分鐘
  - 視覺化頻率選擇介面
  - 載入指示器顯示
  - 最後更新時間顯示

- **通知系統**
  - 即時通知訊息顯示
  - 4 種通知類型：成功、錯誤、警告、資訊
  - 自動消失通知機制
  - 動畫效果通知

- **後端架構**
  - Flask 3.0.0 Web 框架
  - twstock 1.3.1 股票資料套件
  - RESTful API 設計
  - 完整的錯誤處理機制

- **開發環境**
  - Python 3.13+ 支援
  - 虛擬環境 stock29env 設定
  - requirements.txt 相依性管理
  - .gitignore 檔案設定

- **測試系統**
  - pytest 測試框架整合
  - 股票服務單元測試（13 個測試案例）
  - Mock 物件測試支援
  - 100% 測試通過率

- **文件系統**
  - 完整的 README.md 專案說明
  - 詳細的安裝與使用指南
  - API 文件說明
  - 故障排除指南
  - 開發指南與程式碼風格
  - copilot-instructions.md 開發指引

- **實作計畫**
  - 詳細的實作步驟記錄
  - 進度追蹤與狀態管理
  - 驗收標準定義
  - 時程規劃

### 技術細節
- **前端技術棧**
  - Bootstrap 5 (via jsDelivr CDN)
  - FontAwesome 6 (via jsDelivr CDN)
  - Animate.css (via jsDelivr CDN)
  - Vanilla JavaScript

- **後端技術棧**
  - Python 3.13.5
  - Flask 3.0.0
  - twstock 1.3.1
  - lxml 6.0.0
  - requests 2.31.0
  - python-dotenv 1.0.0

- **測試技術棧**
  - pytest 7.4.3
  - unittest.mock

### 已知問題
- 無已知問題

### 安全性
- 無安全性問題

---

## 版本說明

### [1.0.0] - 2025-07-29
- 首次正式發布
- 包含所有基礎功能
- 完整的測試覆蓋
- 詳細的文件說明

---

## 貢獻者

- GitHub Copilot - 主要開發者
- 基於 twstock 套件提供的台灣股票資料

---

## 授權條款

本專案僅供學習與教育用途。
