import { Component, OnInit } from "@angular/core"
import { Usuario } from "../../model/usuario"
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public usuario;
  public returnUrl: string;

  constructor(public router: Router, private activateRouter: ActivatedRoute) {    
  }

  ngOnInit(): void {
    this.returnUrl = this.activateRouter.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario();
  }

  login() {
    if (this.usuario.email == "teste@email.com" && this.usuario.senha == "abc123") {
      sessionStorage.setItem('usuario-autenticado', '1');
      this.router.navigate([this.returnUrl]);  // redireciona para a rota raiz.
    }
  }
}
