"""
股票服務模組
此模組負責處理股票相關的業務邏輯，包括取得即時股價等功能
"""

import twstock
from typing import Dict, Any, Optional
from datetime import datetime


class StockService:
    """
    股票服務類別
    提供股票相關功能，如取得即時股價、股票資訊等
    """
    
    def __init__(self):
        """
        初始化股票服務
        """
        pass
    
    def get_real_time_price(self, stock_code: str) -> Dict[str, Any]:
        """
        取得指定股票的即時股價資訊
        
        Args:
            stock_code (str): 股票代碼（例如：'2330' 代表台積電）
            
        Returns:
            Dict[str, Any]: 包含股價資訊的字典
            
        Raises:
            ValueError: 當股票代碼無效時
            Exception: 當無法取得股價資訊時
        """
        try:
            # 驗證股票代碼格式
            if not stock_code or not stock_code.isdigit():
                raise ValueError(f"無效的股票代碼: {stock_code}")
            
            # 使用 twstock 取得即時股價
            stock = twstock.realtime.get(stock_code)
            
            if not stock or not stock.get('success'):
                raise Exception(f"無法取得股票 {stock_code} 的即時資訊")
            
            # 提取股價資訊
            stock_info = stock['info']
            stock_realtime = stock['realtime']
            
            # 格式化回傳資料
            result = {
                'code': stock_code,
                'name': stock_info.get('name', ''),
                'price': float(stock_realtime.get('latest_trade_price', 0)),
                'change': float(stock_realtime.get('change', 0)),
                'change_percent': float(stock_realtime.get('change_percent', 0)),
                'volume': int(stock_realtime.get('accumulate_trade_volume', 0)),
                'high': float(stock_realtime.get('high', 0)),
                'low': float(stock_realtime.get('low', 0)),
                'open': float(stock_realtime.get('open', 0)),
                'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            
            return result
            
        except ValueError as ve:
            # 重新拋出值錯誤
            raise ve
        except Exception as e:
            # 處理其他例外狀況
            raise Exception(f"取得股價時發生錯誤: {str(e)}")
    
    def is_valid_stock_code(self, stock_code: str) -> bool:
        """
        驗證股票代碼是否有效
        
        Args:
            stock_code (str): 要驗證的股票代碼
            
        Returns:
            bool: 股票代碼是否有效
        """
        try:
            # 檢查基本格式
            if not stock_code or not stock_code.isdigit():
                return False
            
            # 台灣股票代碼通常是 4 位數字
            if len(stock_code) != 4:
                return False
            
            # 嘗試取得股票資訊來驗證是否存在
            stock = twstock.realtime.get(stock_code)
            return stock and stock.get('success', False)
            
        except Exception:
            return False
