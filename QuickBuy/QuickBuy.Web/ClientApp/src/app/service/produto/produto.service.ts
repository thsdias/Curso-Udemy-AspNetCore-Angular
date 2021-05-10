import { Injectable, Inject, inject, OnInit, DebugElement } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { Produto } from "../../model/produto";
import { debug } from "util";

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

  ngOnInit(): void {
    this.produtos = [];
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public cadastrar(produto: Produto): Observable<Produto> { 
    return this.http.post<Produto>(this._baseUrl + "api/produto/incluir",
                                    JSON.stringify(produto), { headers: this.headers });
  }

  public atualizar(produto: Produto): Observable<Produto> { 
    return this.http.put<Produto>(this._baseUrl + "api/produto/atualizar",
                                    JSON.stringify(produto), { headers: this.headers });
  }

  public deletar(produto: Produto): Observable<Produto[]> { 
    return this.http.post<Produto[]>(this._baseUrl + "api/produto/remover",
                                    JSON.stringify(produto), { headers: this.headers });
  }

  public obter(produtoId: number): Observable<Produto> {
    return this.http.get<Produto>(this._baseUrl + "api/produto/obterProduto");
  }

  public obterTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this._baseUrl + "api/produto");
  }

  public enviarArquivo(arquivoSelecionado: File): Observable<string> { 
    const formData: FormData = new FormData();

    // Chave / arquivo / nome.
    formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);

    return this.http.post<string>(this._baseUrl + "api/produto/enviarArquivo", formData);
  }
}
