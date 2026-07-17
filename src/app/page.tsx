import Link from "next/link";
import { listarPessoas } from "@/services/pessoas";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import PessoaTable from "@/components/pessoa/PessoaTable";

export const revalidate = 0;

export default async function Home() {
  try {
    const pessoas = await listarPessoas();

    return (

      <main className="max-w-7xl mx-auto p-6">
        <PageHeader title="IMOB">
          <Link href="/pessoas/nova">
            <Button variant="primary">+ Nova Pessoa</Button>
          </Link>
        </PageHeader>

        <PessoaTable pessoas={pessoas} />
      </main>
    );
  } catch (error) {
    console.error("Erro ao carregar pessoas no servidor:", error);
    return (
      <main className="max-w-7xl mx-auto p-6">
        <PageHeader title="Pessoas" />
        <ErrorMessage message="Não foi possível carregar a lista de pessoas. Verifique sua conexão ou tente novamente mais tarde." />
      </main>
    );
  }
}