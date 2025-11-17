import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, Usuario, Empresa } from '@/types/auth';

// Dados mockados
const MOCK_EMPRESAS: Empresa[] = [
  { id: '1', nome: 'Tech Solutions Ltda', cnpj: '12.345.678/0001-90' },
  { id: '2', nome: 'Comércio Brasil S.A.', cnpj: '98.765.432/0001-10' },
  { id: '3', nome: 'Serviços Premium ME', cnpj: '11.222.333/0001-44' },
];

const MOCK_USUARIOS: Usuario[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@techsolutions.com',
    senha: '123456',
    role: 'owner',
    empresaId: '1',
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@techsolutions.com',
    senha: '123456',
    role: 'user',
    empresaId: '1',
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    email: 'pedro@comerciobrasil.com',
    senha: '123456',
    role: 'owner',
    empresaId: '2',
  },
  {
    id: '4',
    nome: 'Ana Oliveira',
    email: 'ana@servicospremium.com',
    senha: '123456',
    role: 'user',
    empresaId: '3',
  },
];

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, senha: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há sessão salva no localStorage
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string): Promise<{ success: boolean; error?: string }> => {
    // Simular delay de requisição
    await new Promise(resolve => setTimeout(resolve, 500));

    const usuario = MOCK_USUARIOS.find(u => u.email === email && u.senha === senha);
    
    if (!usuario) {
      return { success: false, error: 'Email ou senha incorretos' };
    }

    const empresa = MOCK_EMPRESAS.find(e => e.id === usuario.empresaId);
    
    if (!empresa) {
      return { success: false, error: 'Empresa não encontrada' };
    }

    const authUser: AuthUser = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      empresa,
    };

    setUser(authUser);
    localStorage.setItem('authUser', JSON.stringify(authUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
