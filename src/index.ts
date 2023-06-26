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

class Astrious {
    private appId: string;
    private apiKey: string;

    constructor(appId: string, apiKey: string) {
        this.appId = appId;
        this.apiKey = apiKey;
    }

    async createTransfer(payload: CreateTransferPayload): Promise<AxiosResponse<string, any>> {


        const credentials = `${this.appId}:${this.apiKey}`;
        const encodedCredentials = btoa(credentials);

        return await axios({
            method: "POST",
            url: `${config.endpoint}/createTransfer`,
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
            url: `${config.endpoint}/propayFunctions-handleCardPayment`,
            headers: {
                'authorization': `Basic ${encodedCredentials}`
            },
            data: payload
        })
    }
}

export default Astrious;