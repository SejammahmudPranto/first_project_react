import { useEffect, useState } from "react";

export default function useFetch(url, method, headers) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchResult() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          mode: "no-cors",
          method: method || "Get",
          headers: headers,
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchResult();
    // console.log("useFetch called");
    // console.log(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    loading,
    error,
    result,
  };
}
