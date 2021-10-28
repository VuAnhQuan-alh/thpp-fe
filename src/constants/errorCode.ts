export const SUCCESS = "0"; // Thành

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