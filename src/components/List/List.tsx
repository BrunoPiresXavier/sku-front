import styles from "./List.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { searchBySku, listSku } from "../../clients/sku.client";
import { LoadingSVG } from "../../utils/loading";
import { Card } from "../Card/Card";

export function List(props: {
  list: {
    id: string;
    description: string;
    commercialDescription: string;
    sku: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) {
  const [list, setList] = useState(props.list);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  async function handleSearch(sku: string) {
    setLoading(true);
    let result;
    if (sku.length === 0) {
      result = await listSku();
    } else {
      result = [await searchBySku(sku)];
    }
    setList(result);
    setLoading(false);
  }

  return (
    <div className={styles.content}>
      <div className={styles.listHeader}>
        <div className={styles.description}>
          <h2 className={styles.title}>Lista de SKU's</h2>
        </div>
        <SearchBar onSearchChange={handleSearch} />
      </div>
      {loading ? (
        <LoadingSVG />
      ) : (
        <div className={styles.list}>
          {list?.map((sku) => (
            <Card
              key={sku.id}
              id={sku.id}
              description={sku.description}
              commercialDescription={sku.commercialDescription}
              sku={sku.sku}
              status={sku.status}
              createdAt={sku.createdAt}
              updatedAt={sku.updatedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
