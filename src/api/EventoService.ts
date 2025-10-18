import api from "./Api";

export const listarEventos = async () => {
  const response = await api.get("/evento/listar");
  return response.data;
};

export const criarEvento = async (evento) => {
  const response = await api.post("/evento/cadastrar", evento);
  return response.data;
};

export const atualizarEvento = async (evento) => {
  const response = await api.put("/evento/editar/", evento);
  return response.data;
};

export const deletarEvento = async (id) => {
  const response = await api.delete(`/evento/excluir/${id}`);
  return response.data;
}

export const EventoService = {
  listarEventos,
  criarEvento,
  atualizarEvento,
  deletarEvento,
}