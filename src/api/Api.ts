import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export interface Usuario {
  id: number;
  nome: string;
  Empresa: string;
  cnpj: string;
  telefone: string;
  cidade: string;
  email: string;
  status: string;
  funcao: string;
}

export interface Empresa {
  id: number;
  nome: string;
  cnpj: string;
  tipoEmpresa: string;
  telefone: string;
  cidade: string;
  email: string;
  status: string;
}

export interface Item {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  quantidade: number;
  status: string;
}

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  relator: Usuario;
  responsavel: Usuario;
  setorResponsavel: string;
  local: string;
  dtCriacao: string;
  dtAtualizacao: string;
  statusEvento: string;
  itens: Item[];
}

export default api;
