import Link from "next/link";
import { PessoaResumo } from "@/types/pessoa";
import PessoaTipoBadge from "./PessoaTipoBadge";

interface PessoaRowProps {
  pessoa: PessoaResumo;
}

export default function PessoaRow({ pessoa }: PessoaRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{pessoa.nomeAtual}</div>
        {pessoa.estadoCivilOuNomeFantasia && (
          <div className="text-xs text-gray-500">
            {pessoa.estadoCivilOuNomeFantasia}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PessoaTipoBadge tipo={pessoa.tipo} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {pessoa.cpFouCNPJ || "—"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {pessoa.cidadeUF || "—"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
        {pessoa.totalFichas}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          href={`/pessoas/${pessoa.idPessoa}`}
          className="text-blue-600 hover:text-blue-900 transition-colors"
        >
          Detalhes
        </Link>
      </td>
    </tr>
  );
}
