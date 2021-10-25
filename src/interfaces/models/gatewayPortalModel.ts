export interface GatewayPortalModel {
    error: string;
    message: string;
    status: string;
    code: string;
    data: AGatewayPortal[]
}

export interface AGatewayPortal {
    code: string;
    name: string;
    active: string
}