import styles from "./Card.module.css";
import { rules } from "../../utils/rules";
import { updateStatus, updateSku, findById } from "../../clients/sku.client";
import { useState } from "react";
import { SkuForm } from "../SkuForm/SkuForm";

export function Card(props: {
  id: string;
  description: string;
  commercialDescription: string;
  sku: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  const [data, setData] = useState(props);
  const [showSkuForm, setShowSkuForm] = useState(false);

  const rule = rules[data.status as keyof typeof rules];

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "PRE_CADASTRO":
        return "Pre cadastro";
      case "CADASTRO_COMPLETO":
        return "Cadastro completo";
      case "ATIVO":
        return "Ativo";
      case "DESATIVADO":
        return "Desativado";
      case "CANCELADO":
        return "Cancelado";
      default:
        return status;
    }
  };

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    if (newStatus && newStatus !== data.status) {
      const result = await updateStatus(data.id, newStatus);
      setData(result);
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "PRE_CADASTRO":
        return "#f59e0b";
      case "CADASTRO_COMPLETO":
        return "#3b82f6";
      case "ATIVO":
        return "#10b981";
      case "DESATIVADO":
        return "#ef4444";
      case "CANCELADO":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  async function handleUpdateSku(skuData: {
    description: string;
    commercialDescription: string;
    sku: string;
  }) {
    await updateSku(data.id, skuData);
    setData(await findById(data.id));
    setShowSkuForm(false);
  }

  const handleClick = () => {
    setShowSkuForm(true);
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.leftCard}>
        <div className={styles.cardLeftContent}>
          <h3>{data.description}</h3>
          <div className={styles.skuTitle}>
            <p>{data.sku}</p>
          </div>
          <div className={styles.skuCategory}>
            <p>{data.commercialDescription}</p>
          </div>
          <div className={styles.skuViewers}>
            <p>{data.createdAt.toString().split("T")[0]}</p>
          </div>
        </div>
      </div>
      <div className={styles.platform}>
        <p
          className={styles.status}
          style={{ backgroundColor: getStatusColor(data.status) }}
        >
          {getStatusLabel(data.status)}
        </p>
        {rule?.statusAllowed && rule.statusAllowed.length > 0 ? (
          <select
            className={styles.statusSelect}
            value=""
            onChange={handleStatusChange}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="" disabled>
              Alterar Status
            </option>
            {rule?.statusAllowed?.map((status: string) => (
              <option
                key={status}
                value={status}
                style={{ backgroundColor: getStatusColor(status) }}
              >
                {getStatusLabel(status)}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      {showSkuForm && (
        <SkuForm
          onSubmit={handleUpdateSku}
          onCancel={() => setShowSkuForm(false)}
          props={{
            id: data.id,
            description: data.description,
            commercialDescription: data.commercialDescription,
            sku: data.sku,
            title: "Editar SKU",
            submitLabel: "Salvar Alterações",
          }}
          editablefields={rule?.editablefields || []}
        />
      )}
    </div>
  );
}
