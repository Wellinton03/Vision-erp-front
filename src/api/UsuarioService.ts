import api from "./Api";

export const listarUsuarios = async () => {
  try {
    const response = await api.get("/usuario/listar");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data?.message || "Erro desconhecido no servidor"
      );
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

export const criarUsuario = async (usuario) => {
  const response = await api.post("/usuario/cadastrar", usuario);
  return response.data;
};

export const atualizarUsuario = async (usuario) => {
  const response = await api.put("/usuario/editar/", usuario);
  return response.data;
};

export const deletarUsuario = async (id) => {
  const response = await api.delete(`/usuario/excluir/${id}`);
  return response.data;
}

export const UsuarioService = {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};
