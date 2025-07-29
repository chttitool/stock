"""
Flask 路由模組
此模組定義所有的網頁路由和 API 端點
"""

from flask import Blueprint, render_template, jsonify, request
from typing import Dict, Any
from app.services.stock_service import StockService

# 建立 Blueprint 實例，用於組織路由
main = Blueprint('main', __name__)

# 建立股票服務實例
stock_service = StockService()


@main.route('/')
def index() -> str:
    """
    首頁路由
    
    Returns:
        str: 渲染的 HTML 模板
    """
    return render_template('index.html')


@main.route('/api/stock/<stock_code>')
def get_stock_price(stock_code: str) -> Dict[str, Any]:
    """
    取得指定股票代碼的即時股價 API
    
    Args:
        stock_code (str): 股票代碼
        
    Returns:
        Dict[str, Any]: 包含股價資訊的 JSON 回應
    """
    # 使用股票服務取得股價資訊
    stock_data = stock_service.get_real_time_price(stock_code)
    # 回傳成功的 JSON 回應
    return jsonify({
        'success': True,
        'data': stock_data
    })
