import { api } from "./api";
import { PessoaResumo } from "@/types/pessoa";

export async function listarPessoas() {
  const { data } = await api.get<PessoaResumo[]>("/pessoas");

  return data;
}

export interface CriarPessoaRequest {
  tipo: "Fisica" | "Juridica";
  ficha: {
    nome: string;
    sobrenome?: string | null;
    cpf?: string | null;
    cnpj?: string | null;
    nomeFantasia?: string | null;
  };
}

export async function criarPessoa(data: CriarPessoaRequest) {
  const response = await api.post("/pessoas", data);
  return response.data;
}

import { PessoaDetalhe } from "@/types/pessoa";

export async function obterPessoa(id: string | number) {
  const { data } = await api.get<PessoaDetalhe>(`/pessoas/${id}`);
  return data;
}
