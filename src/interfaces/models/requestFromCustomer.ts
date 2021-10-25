export class RequestFromCustomerModel extends Object {
    // fields from user
    token: string | undefined;
    transactionId: string | undefined;

    checkValidFieldsFromCustomer(): boolean {
        return (
            this.token != null
            && this.transactionId != null
        );
    }
}