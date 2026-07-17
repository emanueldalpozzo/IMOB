import Link from "next/link";
import { obterPessoa } from "@/services/pessoas";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import PessoaTipoBadge from "@/components/pessoa/PessoaTipoBadge";

export const revalidate = 0;

export default async function PessoaDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let pessoa = null;
  let ocorreuErro = false;

  try {
    pessoa = await obterPessoa(id);
  } catch (error) {
    console.error(error);
    ocorreuErro = true;
  }

  if (ocorreuErro || !pessoa) {
    return (
      <main className="max-w-5xl mx-auto p-6">
        <PageHeader title="Detalhes da Pessoa">
          <Link href="/">
            <Button variant="secondary">Voltar</Button>
          </Link>
        </PageHeader>
        <ErrorMessage message="Não foi possível carregar os detalhes desta pessoa." />
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <PageHeader title="Detalhes da Pessoa">
        <Link href="/">
          <Button variant="secondary">Voltar</Button>
        </Link>
        <Link href={`/pessoas/${id}/fichas/nova`}>
          <Button variant="primary">+ Nova Ficha</Button>
        </Link>
      </PageHeader>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {pessoa.nomeAtual}
          </h2>
          <PessoaTipoBadge tipo={pessoa.tipo} />
        </div>
        <div className="text-gray-600 text-sm">
          <p>
            ID da Pessoa:{" "}
            <span className="font-medium text-gray-900">
              {pessoa.idPessoa}
            </span>
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Histórico de Fichas
      </h3>

      {pessoa.fichas && pessoa.fichas.length > 0 ? (
        <div className="grid gap-4">
          {pessoa.fichas.map((ficha) => (
            <div
              key={ficha.idFichaPessoa}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {ficha.nome}
                    </h4>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-200">
                      Ficha #{ficha.sequencia}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Criada em:{" "}
                    {ficha.dataCriacao
                      ? new Date(ficha.dataCriacao).toLocaleDateString("pt-BR")
                      : "Data não informada"}
                    {ficha.motivoCriacaoFicha &&
                      ` • Motivo: ${ficha.motivoCriacaoFicha}`}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/pessoas/${id}/fichas/${ficha.idFichaPessoa}/editar`}
                  >
                    <Button variant="secondary">Editar</Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-sm text-gray-700">
                {ficha.cpf && (
                  <p>
                    <span className="font-medium text-gray-900">CPF:</span>{" "}
                    {ficha.cpf}
                  </p>
                )}
                {ficha.cnpj && (
                  <p>
                    <span className="font-medium text-gray-900">CNPJ:</span>{" "}
                    {ficha.cnpj}
                  </p>
                )}
                {ficha.estadoCivil && (
                  <p>
                    <span className="font-medium text-gray-900">
                      Estado Civil:
                    </span>{" "}
                    <span className="capitalize">{ficha.estadoCivil}</span>
                  </p>
                )}
                {ficha.descricaoProfissao && (
                  <p>
                    <span className="font-medium text-gray-900">
                      Profissão:
                    </span>{" "}
                    {ficha.descricaoProfissao}
                  </p>
                )}
                {ficha.cidade && ficha.uf && (
                  <p>
                    <span className="font-medium text-gray-900">
                      Localização:
                    </span>{" "}
                    {ficha.cidade}/{ficha.uf}
                  </p>
                )}
              </div>

              {ficha.observacoesCriacaoFicha && (
                <div className="mt-2 bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm border border-yellow-200">
                  <span className="font-medium">Observação: </span>
                  {ficha.observacoesCriacaoFicha}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
          <p className="text-gray-500">
            Nenhuma ficha encontrada para esta pessoa.
          </p>
        </div>
      )}
    </main>
  );
}