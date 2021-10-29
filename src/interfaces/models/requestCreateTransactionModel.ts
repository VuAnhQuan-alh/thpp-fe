import { getExpDate } from "helpers";
import { RouteBase } from "routes/routeUrl";

const PC_WINDOW_TYPE = '0';
const MOBILE_WINDOW_TYPE = '1';

const WEB_CHANNEL_TYPE = 2;
const MOBILE_CHANNEL_TYPE = 1;

export class RequestCreateTransactionModel extends Object {
    // fields from user
    windowColor: string | undefined;
    windowType: string | undefined; // 0 : pc ; 1 : mobile
    chanelType: number | undefined; // 1: mobile ; 2: web
    token: string | undefined;
    customerName: string | undefined;
    phone: string | undefined;
    ipAddress: string | undefined;
    orderInfo: string | undefined;
    amount: string | undefined;
    currency: string | undefined;
    locale: string | undefined;
    serviceCode: string | undefined;
    serviceName: string | undefined;
    hospitalType: number | undefined;
    hospitalName: string | undefined;
    dataDetail: any;

    // fields fe add
    expDate: string | undefined;
    description: string | undefined;
    gatewayCode: string | undefined;
    returnUrl: string | undefined;
    againLink: string | undefined;
    cancelUrl: string | undefined;

    RequestCreateTransactionModel() {
        this.windowColor = '#ef5459';
    }

    checkValidFieldsFromUser(): boolean {
        return (
            (this.windowType == PC_WINDOW_TYPE || this.windowType == MOBILE_WINDOW_TYPE)
            && (this.chanelType == WEB_CHANNEL_TYPE || this.chanelType == MOBILE_CHANNEL_TYPE)
            && this.token != null
            && this.customerName != null
            && this.ipAddress != null
            && this.phone != null
            && this.orderInfo != null
            && this.amount != null
            && this.currency != null
            && this.locale != null
            && this.serviceCode != null
            && this.serviceName != null
            && this.hospitalType != null
            && this.hospitalName != null
        );
    }

    setAdditionalFields(gatewayCode: string) {
        const returnURL = `${window.location.origin}${RouteBase.Return}`;

        this.returnUrl = returnURL;
        this.againLink = returnURL;
        this.cancelUrl = returnURL;
        this.gatewayCode = gatewayCode;

        this.description = this.customerName + ' ' + this.serviceName?.toLowerCase() + ' ' + this.hospitalName?.toLowerCase();
        this.expDate = (Math.floor(getExpDate().getTime() / 1000)).toString();
    }

    toJSON() {
        return {
            windowColor: this.windowColor,
            windowType: this.windowType,
            chanelType: this.chanelType != null ? parseInt(this.chanelType.toString()) : null,
            customerName: this.customerName,
            phone: this.phone,
            orderInfo: this.orderInfo,
            amount: this.amount != null ? parseInt(this.amount).toString() : null,
            serviceCode: this.serviceCode,
            serviceName: this.serviceName,
            hospitalType: this.hospitalType != null ? parseInt(this.hospitalType.toString()) : null,
            hospitalName: this.hospitalName,
            expDate: this.expDate,
            ipAddress: this.ipAddress,
            description: this.description,
            gatewayCode: this.gatewayCode,
            returnUrl: this.returnUrl,
            againLink: this.againLink,
            cancelUrl: this.cancelUrl,
        };
    }
}