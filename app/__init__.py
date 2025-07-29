"""
Flask 應用程式初始化模組
此模組負責建立和設定 Flask 應用程式實例
"""

from flask import Flask, jsonify


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
    
    # 全域錯誤處理器
    @app.errorhandler(404)
    def handle_404(error):
        """
        處理 404 Not Found 錯誤
        Args:
            error: 錯誤物件
        Returns:
            JSON 格式錯誤訊息
        """
        return (jsonify({
            'success': False,
            'error': '找不到資源',
            'code': 404
        }), 404)

    @app.errorhandler(500)
    def handle_500(error):
        """
        處理 500 Internal Server Error 錯誤
        Args:
            error: 錯誤物件
        Returns:
            JSON 格式錯誤訊息
        """
        return (jsonify({
            'success': False,
            'error': '伺服器內部錯誤',
            'code': 500
        }), 500)

    @app.errorhandler(Exception)
    def handle_exception(error):
        """
        處理所有未捕捉的例外
        Args:
            error: 錯誤物件
        Returns:
            JSON 格式錯誤訊息
        """
        return (jsonify({
            'success': False,
            'error': str(error),
            'code': 500
        }), 500)
    return app
