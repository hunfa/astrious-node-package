import axios, { AxiosResponse } from "axios"
import { config } from "./config.js"


interface CardPaymentPayload {
   
    token: string,
    zip: string | number,
    amount: string | number,
    
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