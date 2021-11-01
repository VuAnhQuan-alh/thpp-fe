export const SUCCESS = "0"; // Thành công
export const ERROR_CUSTOMER_CANCEL = "24";

const UNAUTHENTICATED = 401;

export const mapStatusCodeAPIToMsg = (code: any)=>{
    switch (code) {
        case UNAUTHENTICATED:
            return 'Lỗi xác thực';
        default:
            return 'Đã xảy ra lỗi';
    }
}

export const mapErrorCodeToMsg = (code: string) => {
    switch (code) {
        case ERROR_CUSTOMER_CANCEL:
            return 'Khách hàng hủy giao dịch';
        default:
            return 'Đã xảy ra lỗi'
    }
}

export const mapErrorCodeStringToMsg = (code: string) => {
    switch (code) {
        case 'MERCHANT_IS_INACTIVE':
            return 'Merchant chưa được kích hoạt';
        case 'MERCHANT_IS_NOT_EXIST':
            return 'Merchant khong tồn tại';
        case 'AMOUNT_INVALID':
            return 'Số tiền không hợp lệ';
        case 'GATEWAY_NOT_CONFIGURED':
            return 'Cổng thanh toán chưa được cấp hình';
        case 'TRANSACTION_ALREADY_EXISTS':
            return 'Giao dịch này đã tồn tại';
        case 'TRANSACTION_NOT_FOUND':
            return 'Giao dịch không tồn tại';
        case 'TRANSACTION_ALREADY_EXISTS':
            return 'Tạo thất bại';
        case 'ERROR':
            return 'Đã xảy ra lỗi';
        case 'UPDATE_ONEPAY_TRANSACTION_IS_NOT_EXIST':
            return 'Giao dịch không tồn tại';
        case 'TRANSACTION_AMOUNT_INVALID':
            return 'Số tiền không đúng';
        case 'TRNASACTION_WRONG_SIGNATURE':
            return 'Sai ký số';
        default: return 'Đã xảy ra lỗi';
    }
}