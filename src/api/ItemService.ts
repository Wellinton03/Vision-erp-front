import api from "./Api";

export const listarItems = async () => {
  const response = await api.get("/item/listar");
  return response.data;
};

export const criarItem = async (item) => {
  const response = await api.post("/item/cadastrar", item);
  return response.data;
};

export const atualizarItem = async (item) => {
  const response = await api.put("/item/editar/", item);
  return response.data;
};

export const deletarItem = async (id) => {
  const response = await api.delete(`/item/excluir/${id}`);
  return response.data;
};


export const ItemService = {
  listarItems,
  criarItem,
  atualizarItem,
  deletarItem,
};

