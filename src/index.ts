import axios, { AxiosResponse } from "axios"
import { config } from "./config.js"

interface CreateTransferPayload {
    ip: string,
    email: string,
    email_domain: string,
    session_id: string,
    session: string,
    public_token_object: {
        public_token: string,
    },
    account_id: string,
    customerUrl: string,
    paymentId: string,
    type: string,
    apiDeckPayload: any,
    user: string
}

interface CardPaymentPayload {
    ip: string,
    email: string,
    email_domain: string,
    session_id: string,
    session: string,
    token: string,
    zip: string | number,
    amount: string | number,
    paymentId: string,
    type: string,
    apiDeckPayload: any,
    user: string
}

interface contructorPayload {
    appId: string,
     apiKey: string
}

class Astrious {
    private appId: string;
    private apiKey: string;

    constructor( payload : contructorPayload ) {
        this.appId = payload.appId;
        this.apiKey = payload.apiKey;
    }

    async createTransfer(payload: CreateTransferPayload): Promise<AxiosResponse<string, any>> {


        const credentials = `${this.appId}:${this.apiKey}`;
        const encodedCredentials = btoa(credentials);

        return await axios({
            method: "POST",
            url: `${config.endpoint}/publicCreateTransfer`,
            headers: {
                'authorization': `Basic ${encodedCredentials}`
            },
            data: payload
        })
    }

    async cardProcess(payload: CardPaymentPayload): Promise<AxiosResponse<string, any>> {

        const credentials = `${this.appId}:${this.apiKey}`;
        const encodedCredentials = btoa(credentials);

        return await axios({
            method: "POST",
            url: `${config.endpoint}/publicHandleCardPayment`,
            headers: {
                'authorization': `Basic ${encodedCredentials}`
            },
            data: payload
        })
    }
}

export default Astrious;