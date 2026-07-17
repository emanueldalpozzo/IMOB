"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Input from "../ui/Inputs";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { criarPessoa } from "@/services/pessoas";

const fichaSchema = z.object({
  nome: z.string().min(3, "O nome/razão social deve ter no mínimo 3 caracteres"),
  sobrenome: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  cnpj: z.string().optional().nullable(),
  nomeFantasia: z.string().optional().nullable(),
});

const criarPessoaSchema = z
  .object({
    tipo: z.enum(["Fisica", "Juridica"]),
    ficha: fichaSchema,
  })
  .superRefine((data, ctx) => {
    if (data.tipo === "Fisica" && (!data.ficha.cpf || data.ficha.cpf.length < 11)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CPF é obrigatório e deve ser válido para Pessoa Física",
        path: ["ficha", "cpf"],
      });
    }
    if (data.tipo === "Juridica" && (!data.ficha.cnpj || data.ficha.cnpj.length < 14)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CNPJ é obrigatório e deve ser válido para Pessoa Jurídica",
        path: ["ficha", "cnpj"],
      });
    }
  });

type PessoaFormData = z.infer<typeof criarPessoaSchema>;

export default function PessoaForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PessoaFormData>({
    resolver: zodResolver(criarPessoaSchema),
    defaultValues: {
      tipo: "Fisica",
      ficha: {
        nome: "",
        sobrenome: "",
        cpf: "",
        cnpj: "",
        nomeFantasia: "",
      },
    },
  });

  const tipoPessoa = useWatch({
    control,
    name: "tipo",
  });

  const onSubmit = async (data: PessoaFormData) => {
    setSubmitError(null);
    try {
      const payload = { ...data };
      if (payload.tipo === "Fisica") {
        payload.ficha.cnpj = null;
        payload.ficha.nomeFantasia = null;
      } else {
        payload.ficha.cpf = null;
        payload.ficha.sobrenome = null;
      }

      await criarPessoa(payload);
      router.push("/"); 
      router.refresh(); 
    } catch (error) {
      console.error(error);
      setSubmitError("Erro ao salvar a pessoa. Verifique os dados e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {submitError && <ErrorMessage message={submitError} />}

      <div className="space-y-4">
        <div className="flex flex-col gap-1.5 w-full md:w-1/3">
          <label className="text-sm font-medium text-gray-700">Tipo de Pessoa</label>
          <select
            {...register("tipo")}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option className="text-black" value="Fisica">Pessoa Física</option>
            <option className="text-black" value="Juridica">Pessoa Jurídica</option>
          </select>
        </div>

        <hr className="border-gray-100" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 placeholder:text-gray-500">
          <Input
            label={tipoPessoa === "Fisica" ? "Nome *" : "Razão Social *"}
            placeholder={tipoPessoa === "Fisica" ? "João" : "Empresa XYZ Ltda"}
            {...register("ficha.nome")}
            error={errors.ficha?.nome?.message}
          />

          {tipoPessoa === "Fisica" && (
            <>
              <Input
                label="Sobrenome"
                placeholder="Silva"
                {...register("ficha.sobrenome")}
                error={errors.ficha?.sobrenome?.message}
              />
              <Input
                label="CPF *"
                placeholder="000.000.000-00"
                {...register("ficha.cpf")}
                error={errors.ficha?.cpf?.message}
              />
            </>
          )}

          {tipoPessoa === "Juridica" && (
            <>
              <Input
                label="Nome Fantasia"
                placeholder="Loja do João"
                {...register("ficha.nomeFantasia")}
                error={errors.ficha?.nomeFantasia?.message}
              />
              <Input
                label="CNPJ *"
                placeholder="00.000.000/0001-00"
                {...register("ficha.cnpj")}
                error={errors.ficha?.cnpj?.message}
              />
            </>
          )}
        </div>
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
          {isSubmitting ? "Salvando..." : "Salvar Pessoa"}
        </Button>
      </div>
    </form>
  );
}