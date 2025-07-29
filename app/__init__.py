"""
Flask 應用程式初始化模組
此模組負責建立和設定 Flask 應用程式實例
"""

from flask import Flask


def create_app() -> Flask:
    """
    建立並設定 Flask 應用程式實例
    
    Returns:
        Flask: 設定完成的 Flask 應用程式實例
    """
    # 建立 Flask 應用程式實例
    app = Flask(__name__)
    
    # 設定應用程式密鑰，用於 session 加密
    app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'
    
    # 匯入並註冊路由
    from app.routes import main
    app.register_blueprint(main)
    
    return app
