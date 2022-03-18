export class GeneralResponse {
    statusCode: number;
    messageCode: string;
    message: string;
    jwtToken: string;
    data: any;

    constructor(){
        this.statusCode=0;
        this.messageCode="";
        this.message="";
        this.jwtToken = "";

    }
}