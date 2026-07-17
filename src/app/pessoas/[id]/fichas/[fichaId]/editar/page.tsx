import Link from "next/link";
import { obterPessoa } from "@/services/pessoas";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FichaForm from "@/components/pessoa/FichaForm";

export const revalidate = 0;

export default async function EditarFichaPage({
  params,
}: {
  params: Promise<{ id: string; fichaId: string }>;
}) {
  const { id, fichaId } = await params;
  let pessoa = null;
  let erroNaBusca = false;

  try {
    pessoa = await obterPessoa(id);
  } catch (error) {
    console.error(error);
    erroNaBusca = true;
  }

  if (erroNaBusca || !pessoa) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <PageHeader title="Editar Ficha" />
        <ErrorMessage message="Não foi possível conectar com o servidor para buscar os dados da ficha." />
        <Link href={`/pessoas/${id}`}>
          <Button variant="secondary">Voltar</Button>
        </Link>
      </main>
    );
  }

  const fichaParaEditar = pessoa.fichas?.find(
    (f) => f.idFichaPessoa === Number(fichaId)
  );

  if (!fichaParaEditar) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <PageHeader title="Editar Ficha" />
        <ErrorMessage message="A ficha solicitada não foi encontrada para esta pessoa." />
        <Link href={`/pessoas/${id}`}>
          <Button variant="secondary">Voltar para Detalhes</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <PageHeader title={`Editar Ficha #${fichaParaEditar.sequencia}`}>
        <Link href={`/pessoas/${id}`}>
          <Button variant="secondary">Voltar</Button>
        </Link>
      </PageHeader>
      <div className="mt-6">
        <FichaForm idPessoa={id} fichaInicial={fichaParaEditar} />
      </div>
    </main>
  );
}