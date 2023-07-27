import { useState } from "react";

export default useApi = (apiRequest) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [args, setArgs] = useState([]);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiRequest(...args);
    setLoading(false);

    if (!response.ok) return setError(true);

    setError(false);
    setData(response.data);

    let argsList = [];
    argsList.push(...args);
    setArgs(argsList);
  };
  return { data, error, loading, request, args };
};
