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
    const headers = new HttpHeaders().set('content-type', 'application/json');

    var body = {
      email: usuario.email,
      senha: usuario.senha
    }

    return this.http.post<Usuario>(this._baseUrl + "api/usuario/verificarusuario", body, { headers });
  }

  public limparSessao() {
    sessionStorage.setItem('usuario-autenticado', '');
    this._usuario = null;
  }
}
