import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

interface SearchBarProps {
  onSearchChange: (term: string) => void;
}

export function SearchBar(props: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      props.onSearchChange(value);
    }, 500);
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Digite o SKU..."
        className={styles.search}
        value={inputValue}
        onChange={handleChange}
      />

      <span className={styles.searchIcon}>
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </div>
  );
}
