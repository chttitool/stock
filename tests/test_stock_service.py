"""
股票服務單元測試
此模組包含對 StockService 類別的單元測試
"""

import pytest
from unittest.mock import patch, MagicMock
from app.services.stock_service import StockService


class TestStockService:
    """
    股票服務測試類別
    測試 StockService 的各種功能
    """
    
    def setup_method(self):
        """
        測試方法執行前的設定
        建立 StockService 實例供測試使用
        """
        self.stock_service = StockService()
    
    def test_init(self):
        """
        測試 StockService 初始化
        """
        service = StockService()
        assert service is not None
    
    @patch('app.services.stock_service.twstock.realtime.get')
    def test_get_real_time_price_success(self, mock_twstock_get):
        """
        測試成功取得即時股價
        
        Args:
            mock_twstock_get: twstock.realtime.get 的模擬物件
        """
        # 模擬 twstock 回傳的資料
        mock_response = {
            'success': True,
            'info': {
                'name': '台積電'
            },
            'realtime': {
                'latest_trade_price': '500.0',
                'change': '5.0',
                'change_percent': '1.0',
                'accumulate_trade_volume': '10000',
                'high': '505.0',
                'low': '495.0',
                'open': '498.0'
            }
        }
        mock_twstock_get.return_value = mock_response
        
        # 執行測試
        result = self.stock_service.get_real_time_price('2330')
        
        # 驗證結果
        assert result['code'] == '2330'
        assert result['name'] == '台積電'
        assert result['price'] == 500.0
        assert result['change'] == 5.0
        assert result['change_percent'] == 1.0
        assert result['volume'] == 10000
        assert result['high'] == 505.0
        assert result['low'] == 495.0
        assert result['open'] == 498.0
        assert 'time' in result
        
        # 驗證 twstock 被正確呼叫
        mock_twstock_get.assert_called_once_with('2330')
    
    def test_get_real_time_price_invalid_code_empty(self):
        """
        測試空的股票代碼
        """
        with pytest.raises(ValueError) as exc_info:
            self.stock_service.get_real_time_price('')
        
        assert '無效的股票代碼' in str(exc_info.value)
    
    def test_get_real_time_price_invalid_code_non_digit(self):
        """
        測試非數字的股票代碼
        """
        with pytest.raises(ValueError) as exc_info:
            self.stock_service.get_real_time_price('ABCD')
        
        assert '無效的股票代碼' in str(exc_info.value)
    
    @patch('app.services.stock_service.twstock.realtime.get')
    def test_get_real_time_price_twstock_failure(self, mock_twstock_get):
        """
        測試 twstock 回傳失敗的情況
        
        Args:
            mock_twstock_get: twstock.realtime.get 的模擬物件
        """
        # 模擬 twstock 回傳失敗
        mock_twstock_get.return_value = {'success': False}
        
        # 執行測試並驗證例外
        with pytest.raises(Exception) as exc_info:
            self.stock_service.get_real_time_price('2330')
        
        assert '無法取得股票 2330 的即時資訊' in str(exc_info.value)
    
    @patch('app.services.stock_service.twstock.realtime.get')
    def test_get_real_time_price_twstock_none(self, mock_twstock_get):
        """
        測試 twstock 回傳 None 的情況
        
        Args:
            mock_twstock_get: twstock.realtime.get 的模擬物件
        """
        # 模擬 twstock 回傳 None
        mock_twstock_get.return_value = None
        
        # 執行測試並驗證例外
        with pytest.raises(Exception) as exc_info:
            self.stock_service.get_real_time_price('2330')
        
        assert '無法取得股票 2330 的即時資訊' in str(exc_info.value)
    
    @patch('app.services.stock_service.twstock.realtime.get')
    def test_get_real_time_price_twstock_exception(self, mock_twstock_get):
        """
        測試 twstock 拋出例外的情況
        
        Args:
            mock_twstock_get: twstock.realtime.get 的模擬物件
        """
        # 模擬 twstock 拋出例外
        mock_twstock_get.side_effect = Exception('網路錯誤')
        
        # 執行測試並驗證例外
        with pytest.raises(Exception) as exc_info:
            self.stock_service.get_real_time_price('2330')
        
        assert '取得股價時發生錯誤' in str(exc_info.value)
    
    def test_is_valid_stock_code_empty(self):
        """
        測試空的股票代碼驗證
        """
        result = self.stock_service.is_valid_stock_code('')
        assert result is False
    
    def test_is_valid_stock_code_non_digit(self):
        """
        測試非數字股票代碼驗證
        """
        result = self.stock_service.is_valid_stock_code('ABCD')
        assert result is False
    
    def test_is_valid_stock_code_wrong_length(self):
        """
        測試錯誤長度的股票代碼驗證
        """
        # 測試太短
        result = self.stock_service.is_valid_stock_code('123')
        assert result is False
        
        # 測試太長
        result = self.stock_service.is_valid_stock_code('12345')
        assert result is False
    
    @patch('app.services.stock_service.twstock.realtime.get')
    def test_is_valid_stock_code_valid(self, mock_twstock_get):
        """
        測試有效的股票代碼驗證
        
        Args:
            mock_twstock_get: twstock.realtime.get 的模擬物件
        """
        # 模擬 twstock 回傳成功
        mock_twstock_get.return_value = {'success': True}
        
        result = self.stock_service.is_valid_stock_code('2330')
        assert result is True
        
        mock_twstock_get.assert_called_once_with('2330')
    
    @patch('app.services.stock_service.twstock.realtime.get')
    def test_is_valid_stock_code_invalid(self, mock_twstock_get):
        """
        測試無效的股票代碼驗證
        
        Args:
            mock_twstock_get: twstock.realtime.get 的模擬物件
        """
        # 模擬 twstock 回傳失敗
        mock_twstock_get.return_value = {'success': False}
        
        result = self.stock_service.is_valid_stock_code('9999')
        assert result is False
    
    @patch('app.services.stock_service.twstock.realtime.get')
    def test_is_valid_stock_code_exception(self, mock_twstock_get):
        """
        測試股票代碼驗證時發生例外
        
        Args:
            mock_twstock_get: twstock.realtime.get 的模擬物件
        """
        # 模擬 twstock 拋出例外
        mock_twstock_get.side_effect = Exception('網路錯誤')
        
        result = self.stock_service.is_valid_stock_code('2330')
        assert result is False
