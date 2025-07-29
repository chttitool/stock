"""
股票即時價格顯示網站主程式入口
此檔案負責啟動 Flask 應用程式
"""

from app import create_app

# 建立 Flask 應用程式實例
app = create_app()

if __name__ == '__main__':
    # 在開發模式下啟動應用程式
    # debug=True 啟用除錯模式，讓程式碼變更時自動重新載入
    # host='0.0.0.0' 允許外部連線
    # port=5000 設定埠號為 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
