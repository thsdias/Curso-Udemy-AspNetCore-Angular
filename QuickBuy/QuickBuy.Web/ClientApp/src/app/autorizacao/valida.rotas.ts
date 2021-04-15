import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UsuarioService } from "../service/usuario/usuario.service";

@Injectable({
  providedIn: 'root'  // publica na raiz da aplicacao.
})
export class ValidaRotas implements CanActivate
{
  constructor(private router: Router, private usuarioService: UsuarioService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
    // Usuario autenticado.
    if (this.usuarioService.usuarioAutenticado()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
