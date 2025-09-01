import { useState } from "react";
import styles from "./SkuForm.module.css";

interface SkuFormProps {
  onSubmit: (skuData: {
    description: string;
    commercialDescription: string;
    sku: string;
  }) => void;
  onCancel: () => void;
  props: {
    id?: string;
    description?: string;
    commercialDescription?: string;
    sku?: string;
    title: string;
    submitLabel: string;
  };
  editablefields?: string[];
}

export function SkuForm({
  onSubmit,
  onCancel,
  props,
  editablefields,
}: SkuFormProps) {
  const [formData, setFormData] = useState({
    description: props?.description || "",
    commercialDescription: props?.commercialDescription || "",
    sku: props?.sku || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{props?.title ? props?.title : "Criar novo SKU"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="description">Descrição:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles.input}
              disabled={
                editablefields ? !editablefields.includes("description") : false
              }
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="commercialDescription">Descrição Comercial:</label>
            <textarea
              id="commercialDescription"
              name="commercialDescription"
              value={formData.commercialDescription}
              onChange={handleChange}
              required
              className={styles.textarea}
              maxLength={100}
              rows={3}
              disabled={
                editablefields
                  ? !editablefields.includes("commercialDescription")
                  : false
              }
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="sku">SKU:</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              className={styles.input}
              disabled={
                editablefields ? !editablefields.includes("sku") : false
              }
            />
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
            >
              Cancelar
            </button>
            {editablefields && editablefields.length > 0 ? (
              <button type="submit" className={styles.submitButton}>
                {props?.submitLabel ? props?.submitLabel : "Criar SKU"}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
