import api from "./Api";

export const listarEmpresas = async () => {
  const response = await api.get("/empresa/listar");
  return response.data;
};

export const criarEmpresa = async (empresa) => {
  const response = await api.post("/empresa/cadastrar", empresa);
  return response.data;
};

export const atualizarEmpresa = async (empresa) => {
  const response = await api.put("/empresa/editar/", empresa);
  return response.data;
};

export const deletarEmpresa = async (id) => {
  const response = await api.delete(`/empresa/excluir/${id}`);
  return response.data;
}


export const EmpresaService = {
  listarEmpresas,
  criarEmpresa,
  atualizarEmpresa,
  deletarEmpresa
};