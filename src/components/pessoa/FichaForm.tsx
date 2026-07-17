"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Input from "../ui/Inputs";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { atualizarFicha, FichaInput } from "@/types/pessoa";
import { Ficha } from "@/types/pessoa";

const fichaSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  cpf: z.string().optional().nullable(),
  cnpj: z.string().optional().nullable(),
  estadoCivil: z.string().optional().nullable(),
  descricaoProfissao: z.string().optional().nullable(),
  cidade: z.string().optional().nullable(),
  uf: z.string().optional().nullable(),
});

interface FichaFormProps {
  idPessoa: string;
  fichaInicial: Ficha;
}

export default function FichaForm({ idPessoa, fichaInicial }: FichaFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FichaInput>({
    resolver: zodResolver(fichaSchema),
    defaultValues: {
      nome: fichaInicial.nome || "",
      cpf: fichaInicial.cpf || "",
      cnpj: fichaInicial.cnpj || "",
      estadoCivil: fichaInicial.estadoCivil || "",
      descricaoProfissao: fichaInicial.descricaoProfissao || "",
      cidade: fichaInicial.cidade || "",
      uf: fichaInicial.uf || "",
    },
  });

  const onSubmit = async (data: FichaInput) => {
    setSubmitError(null);
    try {
      await atualizarFicha(idPessoa, fichaInicial.idFichaPessoa, data);
      router.push(`/pessoas/${idPessoa}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setSubmitError(
        "Erro ao atualizar a ficha. Verifique os dados e tente novamente.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      {submitError && <ErrorMessage message={submitError} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input
            label="Nome / Razão Social *"
            {...register("nome")}
            error={errors.nome?.message}
          />
        </div>

        <Input
          label="CPF"
          placeholder="Apenas números"
          {...register("cpf")}
          error={errors.cpf?.message}
        />
        <Input
          label="CNPJ"
          placeholder="Apenas números"
          {...register("cnpj")}
          error={errors.cnpj?.message}
        />
        <Input
          label="Estado Civil"
          placeholder="Ex: solteiro, casado"
          {...register("estadoCivil")}
          error={errors.estadoCivil?.message}
        />
        <Input
          label="Profissão"
          placeholder="Ex: agricultor, empresário"
          {...register("descricaoProfissao")}
          error={errors.descricaoProfissao?.message}
        />
        <Input
          label="Cidade"
          {...register("cidade")}
          error={errors.cidade?.message}
        />
        <Input
          label="UF"
          placeholder="Ex: PR, SP"
          maxLength={2}
          {...register("uf")}
          error={errors.uf?.message}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  );
}
