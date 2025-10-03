import api from "./Api";

export const listarUsuarios = async () => {
  const response = await api.get("/usuario/listar");
  return response.data;
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
};
