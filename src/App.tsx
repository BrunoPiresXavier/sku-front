import { listSku, createSku } from "./clients/sku.client.ts";
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { List } from "./components/List/List.tsx";
import { LoadingSVG } from "./utils/loading.tsx";
import { Header } from "./components/Header/Header.tsx";
import { SkuForm } from "./components/SkuForm/SkuForm.tsx";

function App() {
  const [data, setData] = useState<
    {
      id: string;
      description: string;
      commercialDescription: string;
      sku: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [showSkuForm, setShowSkuForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const result = await listSku();
    setData(result);
    setLoading(false);
  }

  async function handleCreateSku(skuData: {
    description: string;
    commercialDescription: string;
    sku: string;
  }) {
    try {
      setLoading(true);
      await createSku(skuData);
      setShowSkuForm(false);
      await fetchData();
    } catch (error) {
      console.error("Erro ao criar SKU:", error);
      alert("Erro ao criar SKU. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header
        onClickLogo={() => {
          window.history.pushState({}, "", "/");
          fetchData();
        }}
        onClickMyListButton={() => setShowSkuForm(true)}
      />
      <div className={styles.content}>
        {loading ? <LoadingSVG /> : <List list={data} />}
      </div>

      {showSkuForm && (
        <SkuForm
          onSubmit={handleCreateSku}
          onCancel={() => setShowSkuForm(false)}
          props={{
            title: "Criar Nova SKU",
            submitLabel: "Criar SKU",
          }}
        />
      )}
    </div>
  );
}

export default App;
