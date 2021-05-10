import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { Endereco } from "../../model/endereco";
import { Usuario } from "../../model/usuario";

@Injectable({
  providedIn: "root"
})
export class EnderecoService implements OnInit
{
  private _baseUrl: string;
  public _enderecos: Endereco[];

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  ngOnInit(): void {
    this._enderecos = [];
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public cadastrar(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this._baseUrl + "api/endereco/incluir",
                                    JSON.stringify(endereco), { headers: this.headers });
  }

  public atualizar(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this._baseUrl + "api/endereco/incluir",
                                    JSON.stringify(endereco), { headers: this.headers });
  }

  public deletar(endereco: Endereco): Observable<Endereco[]> {
    return this.http.post<Endereco[]>(this._baseUrl + "api/endereco/remover",
                                      JSON.stringify(endereco), { headers: this.headers });
  }

  public obterTodos(usuario: Usuario): Observable<Endereco[]> { 
    return this.http.get<Endereco[]>(this._baseUrl + ("api/endereco/obterTodos?usuarioId=" + usuario.id));
  }
}
