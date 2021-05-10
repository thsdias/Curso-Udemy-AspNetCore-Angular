import { Component, OnInit } from "@angular/core"
import { Usuario } from "../../model/usuario"
import { ActivatedRoute, Router } from "@angular/router"
import { UsuarioService } from "../../service/usuario/usuario.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit
{
  public usuario: Usuario;
  public returnUrl: string;
  public mensagem: string;
  public _ativarSpinner: Boolean;
  
  ngOnInit(): void {
    this.returnUrl = this.activateRouter.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario();
  }

  constructor(public router: Router, private activateRouter: ActivatedRoute, private usuarioService: UsuarioService) {

  }

  login() {
    this._ativarSpinner = true;
    this.usuarioService.verificarUsuario(this.usuario).subscribe(
      usuario => { 
        this.usuarioService.usuario = usuario;
        if (this.returnUrl == null) {
          this.router.navigate(['/']);  // retorna para a pagina raiz/principal.
        } else {
          this.router.navigate([this.returnUrl]);
        }
      },
      erro => { 
        console.log(erro.error);
        this.mensagem = erro.error;
        this._ativarSpinner = false;
      }
    );
  }
}
