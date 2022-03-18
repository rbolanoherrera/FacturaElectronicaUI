import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Factura } from './models/Factura';
import { GeneralResponse } from './models/GeneralResponse';
import { FacturaService } from './services/FacturaService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FacturaElectronicaUI';
  loading = false;
  submitted = false;
  form: any;
  facturas: Factura[] = [];
  resultado:string[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private facturaService: FacturaService
  ) {

  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]+$')]],
      nit: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
      descripcion: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z0-9ñáéíóú ]+$')]],
      valorTotal: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9.,]+$')]],
      iva: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9.]+$')]],
      //iva: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0?0)?)$')]],

    });

  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    console.log("click en submit");

    // stop here if form is invalid
    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    //this.loading = true;
    //if (this.isAddMode)
    this.agregarFactura();


  }

  agregarFactura() {

    console.log("agregar factura");
    this.resultado=[];

    this.facturas.push(this.crearFacturaObject());

  }

  crearFacturaObject(): Factura {
    let factura = new Factura();

    //console.log('cantEquivalente', this.form.get("cantEquivalente").value);

    factura.id = parseInt(this.form.get("id").value);
    factura.nit = parseInt(this.form.get("nit").value);
    factura.descripcion = this.form.get("descripcion").value;
    factura.valorTotal = parseFloat(this.form.get("valorTotal").value);
    factura.iva = parseFloat(this.form.get("iva").value);

    return factura;
  }

  enviarFacturas() {

    console.log("enviar facturas", this.facturas);
    this.resultado = [];

    this.facturaService.validarFacturas(this.facturas)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          //this.toast.success('Producto registrado exitosamente');
          //this.router.navigate(['.', { relativeTo: this.route }]);

          if (data != null) {
            console.log("response", data);
            
            let re= (<GeneralResponse>data);

            if(re.messageCode == "Invalid"){
              (<string[]>data).forEach(element => {
                this.resultado.push(element);
              });
            }
            else if(re.messageCode == "Total"){
              this.resultado.push(re.message + ". Total: " + re.data);
            }else
              this.resultado.push(re.message);

          }
        },
        error => {
          this.loading = false;
          //this.toast.error('Error desconocido al crear el Producto');
          console.log("error al consumir el servicio");
        },
        () => {
          this.loading = false;
        });

  }

  deleteItem(id:number){
    this.facturas.splice(id, 1);
}

}
