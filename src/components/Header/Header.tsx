import styles from "./Header.module.css";

import logo from "../../assets/logo.png";

export function Header(props: {
  onClickCreateSKU: () => void;
  onClickLogo: () => void;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoAndTitle} onClick={props.onClickLogo}>
          <img src={logo} alt="SKU Logo" />
          <h1>Gerenciamento SKU</h1>
        </div>
      </div>

      <button className={styles.button} onClick={props.onClickCreateSKU}>
        <span className={styles.buttonText}>Criar SKU</span>
      </button>
    </header>
  );
}
