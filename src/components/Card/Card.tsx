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

  async function clickStatus(id: string, status: string) {
    const result = await updateStatus(id, status);
    setData(result);
  }

  async function handleUpdateSku(skuData: {
    description: string;
    commercialDescription: string;
    sku: string;
  }) {
    try {
      await updateSku(data.id, skuData);
      setData(await findById(data.id));
      setShowSkuForm(false);
    } catch (error) {
      console.error("Erro ao criar SKU:", error);
      alert("Erro ao criar SKU. Tente novamente.");
    }
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
        {rule.statusAllowed?.map((status: string) => (
          <button
            className={styles.add}
            onClick={(e) => {
              clickStatus(data.id, status);
              e.stopPropagation();
            }}
            key={status}
          >
            {status}
          </button>
        ))}
        <p className={styles.status}>{data.status}</p>
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
          editablefields={rule.editablefields}
        />
      )}
    </div>
  );
}
