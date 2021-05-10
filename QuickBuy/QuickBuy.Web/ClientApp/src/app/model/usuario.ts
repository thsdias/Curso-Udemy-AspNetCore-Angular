import { Endereco } from "./endereco";
import { Pedido } from "./Pedido";

export class Usuario
{
  id: number;
  email: string;
  senha: string;
  nome: string;
  sobreNome: string;
  administrador: boolean;
  enderecos: Endereco[];
  pedidos: Pedido[];
}
