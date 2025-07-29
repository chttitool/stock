# Copilot 指令說明

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## 專案概述

這是一個 Python Flask 網頁應用程式，用於顯示台灣股票的即時價格。

## 開發指南

### 程式語言與框架
- Python 3.13+
- Flask 作為後端框架
- twstock 套件用於取得台灣股票資訊
- pytest 作為測試框架
- Bootstrap 5 作為前端 UI 框架

### 程式碼風格
- 所有的 Class 與 Method 必須有詳細的中文註解
- 所有的變數與參數必須有說明註解
- 使用 Type Hints 來標註變數型別
- 遵循 PEP 8 程式碼風格指南

### 註解要求
- 所有函數都要有 docstring，說明功能、參數、回傳值
- 複雜的邏輯要有行內註解說明
- 所有註解使用繁體中文

### 測試要求
- 只針對業務邏輯部分撰寫單元測試
- 不需要測試前端 UI 或 API 端點
- 測試檔案命名格式：test_*.py
- 測試函數命名格式：test_功能名稱

### 檔案結構
- app/ - Flask 應用程式主目錄
- app/services/ - 業務邏輯服務
- app/static/ - 靜態檔案（CSS、JS）
- app/templates/ - HTML 模板
- tests/ - 單元測試
- docs/ - 文件目錄
