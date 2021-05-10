import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Endereco } from "../../model/endereco";
import { Usuario } from "../../model/usuario";
import { EnderecoService } from "../../service/endereco/enderecoService";
import { UsuarioService } from "../../service/usuario/usuario.service";

@Component({
  selector: "conta-usuario",
  templateUrl: "./conta.component.html",
  styleUrls: ["./conta.component.css"]
})
export class ContaUsuarioComponent implements OnInit {
  public usuario: Usuario;
  public enderecos: Endereco[];
  public mensagem: string;
  public mensagemSucesso: string;
  public ativarSpinner: boolean;

  ngOnInit(): void {
  }

  constructor(private enderecoService: EnderecoService, private usuarioService: UsuarioService, private router: Router) { 
    this.usuario = this.usuarioService.usuario;
    this.enderecoService.obterTodos(this.usuario).subscribe(
      ret => {
        this.enderecos = ret;
      },
      err => {
        console.log('Erro ao obter endereços: ' + err.error);
        this.mensagem = "Erro ao obter endereço do usuário!";
      }
    );
  }

  public cadastrarEndereco() {
    sessionStorage.setItem('enderecoSession', "");
    this.router.navigate(['/endereco']);
  }

  public editarEndereco(endereco: Endereco) {
    sessionStorage.setItem('enderecoSession', JSON.stringify(endereco));
    this.router.navigate(['/endereco']);
  }

  public deletarEndereco(endereco: Endereco) {
    var retorno = confirm("Deseja realmente deleter o endereço selecionado?");

    if (retorno == true) {
      this.enderecoService.deletar(endereco).subscribe(
        ret => {
          this.enderecoService.obterTodos(this.usuario).subscribe(
            end => {
              this.mensagem = "";
              this.enderecos = end;
            },
            err => {
              this.mensagem = "Erro ao atualizar lista de endereços!";
              console.log(err.error);
            }
          );
        },
        err => {
          this.mensagem = "Erro ao deletar o endereço!";
          console.log(err.error);
        }
      );
    } else {
      return false;
    }
  }

  public atualizarDadosUsuario() {
    this.ativarSpinner = true;
    this.usuarioService.atualizar(this.usuario).subscribe(
      usuario => {
        this.mensagem = "";
        this.mensagemSucesso = "Dados atualizados com sucesso!";
        this.usuarioService.atualizarUsuarioAutenticado(this.usuario);
        this.ativarSpinner = false;
      },
      err => {
        this.mensagemSucesso = "";
        this.mensagem = "Erro ao atualizar dados de usuário!";
        this.ativarSpinner = false;
      }
    );
  }
}
