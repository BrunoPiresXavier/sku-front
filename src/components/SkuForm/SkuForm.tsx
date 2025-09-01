import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./SkuForm.module.css";

const skuFormSchema = z.object({
  description: z
    .string()
    .min(3, "Descrição deve ter pelo menos 3 caractere")
    .max(100, "Descrição deve ter no máximo 100 caracteres"),
  commercialDescription: z
    .string()
    .min(3, "Descrição comercial deve ter pelo menos 3 caractere")
    .max(100, "Descrição comercial deve ter no máximo 100 caracteres"),
  sku: z
    .string()
    .min(3, "SKU deve ter pelo menos 3 caractere")
    .max(100, "SKU deve ter no máximo 100 caracteres"),
});

type SkuFormData = z.infer<typeof skuFormSchema>;

interface SkuFormProps {
  onSubmit: (skuData: SkuFormData) => Promise<void> | void;
  onCancel: () => void;
  props: {
    id?: string;
    description?: string;
    commercialDescription?: string;
    sku?: string;
    title: string;
    submitLabel: string;
    create?: boolean;
  };
  editablefields?: string[];
}

export function SkuForm({
  onSubmit,
  onCancel,
  props,
  editablefields,
}: SkuFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SkuFormData>({
    resolver: zodResolver(skuFormSchema),
    defaultValues: {
      description: props?.description || "",
      commercialDescription: props?.commercialDescription || "",
      sku: props?.sku || "",
    },
  });

  const onSubmitForm = async (data: SkuFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{props?.title ? props?.title : "Criar novo SKU"}</h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="description">Descrição:</label>
            <input
              type="text"
              id="description"
              {...register("description")}
              className={`${styles.input} ${
                errors.description ? styles.inputError : ""
              }`}
              disabled={
                editablefields ? !editablefields.includes("description") : false
              }
              maxLength={100}
            />
            {errors.description && (
              <span className={styles.errorText}>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="commercialDescription">Descrição Comercial:</label>
            <textarea
              id="commercialDescription"
              {...register("commercialDescription")}
              className={`${styles.textarea} ${
                errors.commercialDescription ? styles.inputError : ""
              }`}
              maxLength={100}
              rows={3}
              disabled={
                editablefields
                  ? !editablefields.includes("commercialDescription")
                  : false
              }
            />
            {errors.commercialDescription && (
              <span className={styles.errorText}>
                {errors.commercialDescription.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="sku">SKU:</label>
            <input
              type="text"
              id="sku"
              {...register("sku")}
              className={`${styles.input} ${
                errors.sku ? styles.inputError : ""
              }`}
              disabled={
                editablefields ? !editablefields.includes("sku") : false
              }
              maxLength={100}
            />
            {errors.sku && (
              <span className={styles.errorText}>{errors.sku.message}</span>
            )}
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            {(editablefields && editablefields.length > 0) ||
            props.create === true ? (
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Salvando..."
                  : props?.submitLabel
                  ? props?.submitLabel
                  : "Criar SKU"}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
