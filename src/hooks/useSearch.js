import { useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  // const [error, setError] = useState(null);

  const getSearch = (newSearch) => {
    setSearch(newSearch);
  };

  return { search, getSearch };
}
