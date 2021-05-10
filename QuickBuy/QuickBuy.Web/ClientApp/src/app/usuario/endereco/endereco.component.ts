import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EnumType } from "typescript";
import { Endereco } from "../../model/endereco";
import { EnderecoService } from "../../service/endereco/enderecoService";
import { UsuarioService } from "../../service/usuario/usuario.service";

@Component({
  selector: "endereco",
  templateUrl: "./endereco.component.html",
  styleUrls: ["./endereco.component.css"]
})
export class EnderecoComponent implements OnInit
{
  public endereco: Endereco;
  public mensagem: string;
  public ativarSpinner: boolean;
  public enderecoCadastrado: boolean;
  public atualizarEndereco: boolean;
  public titulo: string;
  public rotuloBotao: string;

  ngOnInit(): void { 
    let enderecoJSON = sessionStorage.getItem('enderecoSession');

    if (enderecoJSON) {
      this.endereco = JSON.parse(enderecoJSON);
      this.atualizarEndereco = true;
      this.titulo = 'Editar Endereço';
      this.rotuloBotao = 'Editar';
    } else {
      this.endereco = new Endereco();
      this.titulo = 'Novo Endereço';
      this.rotuloBotao = 'Cadastrar';
    }
  }

  constructor(private enderecoService: EnderecoService,
              private router: Router,
              private usuarioService: UsuarioService) {    
  }

  public cadastrar() {
    this.ativarSpinner = true;
    this.endereco.usuarioId = this.usuarioService.usuario.id;

    if (this.atualizarEndereco) {
      this.enderecoService.atualizar(this.endereco).subscribe(
        ret => {
          this.mensagem = "";
          console.log(ret);
          this.router.navigate(['/conta-usuario']);
        },
        err => {
          console.log('Erro ao atualizar endereco');
          this.mensagem = err.error;
        }
      );
    } else {
      this.enderecoService.cadastrar(this.endereco).subscribe(
        ret => {
          this.mensagem = "";
          console.log(ret);
          this.router.navigate(['/conta-usuario']);
        },
        err => {
          console.log('Erro ao cadastrar endereco');
          this.mensagem = err.error;
        }
      );
    }

    this.ativarSpinner = false;
  }

  public voltar() {
    return this.router.navigate(["/conta-usuario"]);
  }

  public estados: string[] = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins'
  ];
}
