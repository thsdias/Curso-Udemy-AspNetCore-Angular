import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { Usuario } from "../../model/usuario";

@Injectable({
  providedIn: "root"
})
export class UsuarioService
{
  private _baseUrl: string;
  private _usuario: Usuario;

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  get usuario(): Usuario {
    let usuarioJSON = sessionStorage.getItem('usuario-autenticado');
    this._usuario = JSON.parse(usuarioJSON);
    return this._usuario;
  }
  set usuario(usuario: Usuario) {
    sessionStorage.setItem('usuario-autenticado', JSON.stringify(usuario));
    this._usuario = usuario;
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public usuarioAutenticado(): boolean {
    return this._usuario != null && (this._usuario.email != "" && this._usuario.senha != null);
  }

  public verificarUsuario(usuario: Usuario): Observable<Usuario> { 
    return this.http.post<Usuario>(this._baseUrl + "api/usuario/verificarUsuario", JSON.stringify(usuario), { headers: this.headers });
  }

  public cadastrar(usuario: Usuario): Observable<Usuario> {

    /*
    var body = {
      email: usuario.email,
      senha: usuario.senha,
      nome: usuario.nome,
      sobreNome: usuario.sobreNome
    }

    return this.http.post<Usuario>(this._baseUrl + "api/usario", body, { headers });
    */

    console.log('acesso metodo Cadastrar.ts');
    console.log(usuario);

    return this.http.post<Usuario>(this._baseUrl + "api/usuario/cadastrarUsuario", JSON.stringify(usuario), { headers: this.headers });
  }

  public limparSessao() {
    sessionStorage.setItem('usuario-autenticado', '');
    this._usuario = null;
  }
}
