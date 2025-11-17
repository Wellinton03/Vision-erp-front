export type UserRole = 'owner' | 'user';

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
  empresaId: string;
}

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  empresa: Empresa;
}
