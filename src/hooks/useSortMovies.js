import { useState } from "react";

export function useSortMovies() {
  const [sort, setSort] = useState(false);

  const handleSort = () => {
    setSort(!sort);
  };

  return { sort, handleSort };
}
