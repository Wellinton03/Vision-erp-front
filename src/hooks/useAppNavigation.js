import { useNavigate } from "react-router-dom";

export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    CadastroUsuarios: () => navigate("/usuarios/cadastro-usuarios"),
    CadastroEmpresas: () => navigate("/empresas/cadastro-empresas"),
    CadastroProdutos: () => navigate("/produtos/cadastro-produtos"),
    CadastroClientes: () => navigate("/clientes/cadastro-clientes"),
  };
}
