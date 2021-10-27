const WAIT_PAYMENT = "-1"; // CHờ thanh toán
const SUCCESS = "0"; // Thành công
const ERROR_CUSTOMER_CANCEL = "1"; // khách hành hủy giao dịch
const ERROR_DENY_TRANSACTION = "2"; // bị từ chối giao dịch
const ERROR_MERCHANT_CODE = "3"; // Mã merchant chưa được kết nối
const ERROR_CHECK_SUM = "4"; // Lỗi ký số
const ERROR_AMOUNT = "5"; // Lỗi sai số tiền
const ERROR_CURRENCY = "6"; // Lỗi mã tiền tệ không hợp lệ
const ERROR_ACCOUNT_BANK = "7"; // Lỗi với tài khoản ngân hàng
const ERROR_CARD_NUMBER = "8"; // LỖI thẻ ngân hàng
const ERROR_UNDEFINED = "9"; // lỗi không xác định
const ERROR_CONNECT = "10"; // LỖI KẾT NỐI
const ERROR_CALL_BACK_URL = "11"; // LỖI CALL BACK URL;
const ERROR_IPN_URL = "12"; // LỖI IPN URL
const ERROR_ORDER_INFO = "13"; // LỖI HÓA ĐƠN
const ERROR_TRX_REF = "14"; // LỖI TRX_REF
const ERROR_MERCHANT = "15"; // LỖI VỚI MERCHANT;
const ERROR_TRANSACTION = "16"; // LỖI TRANSACTION
const ERROR_FEE_USER = "17"; // LỖI CƯỚC PHÍ
const ERROR_INFO_PAYMENT = "18"; // LỖI THÔNG TIN THANH TOÁN
const ERROR_CHECK_INFO = "19"; // LỖI KIỂM TRA THÔNG TIN THANH TOÁN
const ERROR_PAYMENT = "21"; // LỖI THANH TOÁN
const ERROR_SERVER = "22"; // LỖI SERVER
const ERROR_METHDO_PAYMENT = "23"; // lỗi phương thức thanh toán
const ERROR_TOKEN = "24"; // LỖI TOKEN
const ERROR_SUPPORT_TRANSACTION = "25"; // LỖI KHÔNG HỖ TRỢ THANH TOÁN
const ERROR_EFFECT_TIME = "26"; // SAI THỜI GIAN HIỆU LỰC
const ERROR_DATA = "27"; // LỖI DỮ LIỆU
const ERROR_QUERY = "28"; // LỖI TRUY VẤN DỮ LIỆU
const ERROR_PASSWORD = "29"; // LỖI MẬT KHẨU
const ERROR_OTP = "30"; // LỖI OTP
const ERROR_CONTRANCT = "31"; // LỖI HỢP ĐỒNG
const ERROR_TIME = "32"; // LỖI QUÁ SỐ LẦN NHẬP
const ERROR_FAKE = "33"; // lỗi do nghi ngờ giao dịch gian lận
const ERROR_EXPIRED = "34"; // lỗi do giao dịch hết hạn
const ERROR_OUT_OF_DATE = "35"; // LỖI VƯỢT QUÁ SỐ LẦN GIAO DỊCH TRONG NGÀY
const INPROCESS_PAYMENT = "36"; // đang xử lý giao dịch
const ERROR_QR = "37"; // LỖI QR
const ERROR_OPERATE = "38"; // LỖI THAO TÁC
const ERROR_GATEWAY_NOT_FOUND = "39"; // LỖI KHÔNG TIM THẤY CỔNG THAY TOÁN

export const mapErrorCodeToMsg = (errorCode: string): string => {
    switch (errorCode) {
        case SUCCESS:
            return 'Giao dịch thành công';
        case WAIT_PAYMENT:
            return 'Chờ thanh toán';
        case ERROR_CUSTOMER_CANCEL:
            return 'Giao dịch đã bị hủy';
        case ERROR_DENY_TRANSACTION:
            return 'Giao dịch bị từ chối';
        case ERROR_CONNECT:
            return 'Lỗi kết nối';
        case ERROR_ACCOUNT_BANK:
            return 'Lỗi tài khoản ngân hàng';
        case ERROR_CARD_NUMBER:
            return 'Lỗi thẻ ngân hàng';
        case ERROR_SUPPORT_TRANSACTION:
            return 'Không hỗ trợ thanh toán';
        case ERROR_PASSWORD:
            return 'Mật khẩu không đúng';
        case ERROR_OTP:
            return 'OTP không đúng';
        case ERROR_TIME:
            return 'Quá số lần nhập';
        case ERROR_FAKE:
            return 'Lỗi do nghi ngờ giao dịch gian lận';
        case ERROR_EXPIRED:
            return 'Giao dịch đã hết hạn';
        case ERROR_OUT_OF_DATE:
            return 'Bạn đã vượt quá số lần giao dịch trong ngày';
        case INPROCESS_PAYMENT:
            return 'Đang xử lý giao dịch';
        case ERROR_QR:
            return 'Lỗi mã QR';
        case ERROR_GATEWAY_NOT_FOUND:
            return 'Không tìm thấy cổng thanh toán';
        case ERROR_MERCHANT_CODE:
        case ERROR_CHECK_SUM:
        case ERROR_AMOUNT:
        case ERROR_CURRENCY:
        case ERROR_CALL_BACK_URL:
        case ERROR_IPN_URL:
        case ERROR_ORDER_INFO:
        case ERROR_TRX_REF:
        case ERROR_MERCHANT:
        case ERROR_TRANSACTION:
        case ERROR_FEE_USER:
        case ERROR_INFO_PAYMENT:
        case ERROR_CHECK_INFO:
        case ERROR_PAYMENT:
        case ERROR_SERVER:
        case ERROR_METHDO_PAYMENT:
        case ERROR_TOKEN:
        case ERROR_EFFECT_TIME:
        case ERROR_DATA:
        case ERROR_QUERY:
        case ERROR_CONTRANCT:
        case ERROR_OPERATE:
            return 'Lỗi hệ thống';
        default:
            return 'Lỗi không xác định';
    }
}