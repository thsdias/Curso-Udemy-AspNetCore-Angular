import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { Pedido } from '../../model/pedido';

@Injectable({
  providedIn: "root"
})
export class PedidoService
{
  public _baseUrl: string;

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public efetivarCompra(pedido: Pedido): Observable<number> { 
    return this.http.post<number>(this._baseUrl + "api/pedido/incluir", JSON.stringify(pedido), { headers: this.headers })
  }
}
