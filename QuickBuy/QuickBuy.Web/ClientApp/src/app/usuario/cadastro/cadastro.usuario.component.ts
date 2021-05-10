import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../model/usuario";
import { UsuarioService } from "../../service/usuario/usuario.service";

@Component({
  selector: "cadastro-usuario",
  templateUrl: "./cadastro.usuario.component.html",
  styleUrls: ["./cadastro.usuario.component.css"]
})
export class CadastroUsuarioComponent implements OnInit
{
  public usuario: Usuario;
  public mensagem: string;
  public ativarSpinner: boolean;
  public usuarioCadastrado: boolean;

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  constructor(private usuarioService: UsuarioService) {
  }

  public cadastrar() {
    this.ativarSpinner = true;
    this.usuarioService.cadastrar(this.usuario).subscribe(
      usuario => {
        this.usuarioCadastrado = true;
        this.mensagem = "Usuário cadastrado com sucesso!";
        this.ativarSpinner = false;
      },
      err => {
        this.mensagem = "Erro ao cadastrar usuário!";
        this.ativarSpinner = false;
      }      
    );
  }
}
