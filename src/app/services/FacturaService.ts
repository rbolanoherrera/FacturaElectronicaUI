import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GeneralResponse } from '../models/GeneralResponse';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Factura } from '../models/Factura';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  
  }


  validarFacturas(facturas: Factura[]) {
    return this.http.post(`${environment.apiUrl}/factura/RecibirFacturas`, facturas);
  }



}
