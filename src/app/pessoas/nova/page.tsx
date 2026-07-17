

import PageHeader from "@/components/layout/PageHeader";
import PessoaForm from "@/components/pessoa/PessoaForm";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NovaPessoaPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <PageHeader title="Nova Pessoa">
        <Link href="/">
          <Button variant="secondary">Voltar para Lista</Button>
        </Link>
      </PageHeader>

      <div className="mt-6">
        <PessoaForm />
      </div>
    </main>
  );
}