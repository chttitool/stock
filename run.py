"""
股票即時價格顯示網站主程式入口
此檔案負責啟動 Flask 應用程式
"""

import requests
import warnings
from urllib3.exceptions import InsecureRequestWarning

# --- 最終解決方案：全域停用 requests 的 SSL 驗證 ---
# 警告：這會使所有 requests 的連線都不安全，僅適用於開發或信任的網路環境
# 1. 抑制不安全連線的警告訊息
warnings.simplefilter('ignore', InsecureRequestWarning)

# 2. 儲存原始的 request 方法
original_request = requests.Session.request

# 3. 定義新的、不進行 SSL 驗證的 request 方法
def patched_request(self, *args, **kwargs):
    # 強制將 verify 參數設為 False
    kwargs['verify'] = False
    # 呼叫原始的 request 方法
    return original_request(self, *args, **kwargs)

# 4. 應用猴子補丁
requests.Session.request = patched_request
# --- 補丁結束 ---


from app import create_app

# 建立 Flask 應用程式實例
app = create_app()

if __name__ == '__main__':
    # 在開發模式下啟動應用程式
    # debug=True 啟用除錯模式，讓程式碼變更時自動重新載入
    # host='0.0.0.0' 允許外部連線
    # port=5000 設定埠號為 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
