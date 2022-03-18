export class Factura {
    id:number;
    nit:number;
    descripcion:string;
    valorTotal:number;
    iva:number;

    constructor(){
        this.id=0;
        this.nit=0;
        this.descripcion="";
        this.valorTotal=0;
        this.iva=0;
    }
}