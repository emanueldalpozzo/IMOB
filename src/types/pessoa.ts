import { api
    
 } from "@/services/api";
export type TipoPessoa = "Fisica" | "Juridica";

export interface PessoaResumo {
  idPessoa: number;
  tipo: TipoPessoa;
  nomeAtual: string;
  cpFouCNPJ: string | null;
  estadoCivilOuNomeFantasia: string | null;
  cidadeUF: string | null;
  idFichaAtiva: number;
  totalFichas: number;
}

export interface Ficha {
  idFichaPessoa: number;
  sequencia: number;
  nome: string;
  cpf?: string | null;
  cnpj?: string | null;
  motivoCriacaoFicha?: string;
  dataCriacao: string;
  estadoCivil?: string | null;
  descricaoProfissao?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoesCriacaoFicha?: string | null;
}

export interface PessoaDetalhe {
  idPessoa: number;
  tipo: TipoPessoa;
  nomeAtual: string;
  fichas: Ficha[];
}

export interface FichaInput {
  nome: string;
  cpf?: string | null;
  cnpj?: string | null;
  estadoCivil?: string | null;
  descricaoProfissao?: string | null;
  cidade?: string | null;
  uf?: string | null;
  motivoCriacaoFicha?: string | null;
  observacoesCriacaoFicha?: string | null;
}

export async function atualizarFicha(
  idPessoa: string | number,
  idFicha: string | number,
  data: FichaInput,
) {
  const response = await api.put(
    `/pessoas/${idPessoa}/fichas/${idFicha}`,
    data,
  );
  return response.data;
}
