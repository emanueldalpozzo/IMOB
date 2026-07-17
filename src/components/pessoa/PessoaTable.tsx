import { PessoaResumo } from "@/types/pessoa";
import PessoaRow from "./PessoaRow";

interface PessoaTableProps {
  pessoas: PessoaResumo[];
}

export default function PessoaTable({ pessoas }: PessoaTableProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome / Razão Social
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CPF / CNPJ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cidade/UF
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Fichas
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pessoas.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                Nenhuma pessoa cadastrada.
              </td>
            </tr>
          ) : (
            pessoas.map((pessoa) => (
              <PessoaRow key={pessoa.idPessoa} pessoa={pessoa} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
