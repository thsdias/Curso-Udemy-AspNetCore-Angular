import { Injectable, Inject, inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { Produto } from "../../model/produto";


@Injectable({
  providedIn: "root"
})
export class ProdutoService implements OnInit
{
  private _baseUrl: string;
  public produtos: Produto[];

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.produtos = [];
  }

  public cadastrar(produto: Produto): Observable<Produto> { 
    return this.http.post<Produto>(this._baseUrl + "api/produto/cadastrar",
                                    JSON.stringify(produto), { headers: this.headers });
  }

  public atualizar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this._baseUrl + "api/produto/atualizar",
                                    JSON.stringify(produto), { headers: this.headers });
  }

  public deletar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this._baseUrl + "api/produto/deletar",
                                    JSON.stringify(produto), { headers: this.headers });
  }

  public obter(produtoId: number): Observable<Produto> {
    return this.http.get<Produto>(this._baseUrl + "api/produto/obterProduto");
  }

  public obterTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this._baseUrl + "api/produto");
  }
}
