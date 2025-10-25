import api from "./Api";

export const listarEmpresas = async () => {
  try {
    const response = await api.get("/empresa/listar");
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

export const criarEmpresa = async (empresa) => {
  const response = await api.post("/empresa/cadastrar", empresa);
  if (response.status === 201) {
    return response.data;
  }
};

export const atualizarEmpresa = async (empresa) => {
  const response = await api.put("/empresa/editar/", empresa);
  return response.data;
};

export const deletarEmpresa = async (id) => {
  const response = await api.delete(`/empresa/excluir/${id}`);
  return response.data;
};

export const EmpresaService = {
  listarEmpresas,
  criarEmpresa,
  atualizarEmpresa,
  deletarEmpresa,
};
