import { useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");

  const updateSearch = (newSearch) => {
    if (newSearch.startsWith(" ")) return; // if (newSearch === " ") return;
    setSearch(newSearch);
  };

  return { search, updateSearch };
}
