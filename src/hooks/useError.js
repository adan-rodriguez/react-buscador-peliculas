import { useState } from "react";

export function useError() {
  const [error, setError] = useState(null);

  const updateError = (error) => {
    setError(error);
  };

  return {
    error,
    updateError,
  };
}
