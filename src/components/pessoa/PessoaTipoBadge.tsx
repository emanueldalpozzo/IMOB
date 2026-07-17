import { TipoPessoa } from "@/types/pessoa";

export default function PessoaTipoBadge({ tipo }: { tipo: TipoPessoa }) {
  const styles =
    tipo === "Fisica"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-purple-50 text-purple-700 border-purple-200";

  return (
    <span
      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${styles}`}
    >
      {tipo === "Fisica" ? "Física" : "Jurídica"}
    </span>
  );
}
