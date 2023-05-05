import useSWR from "swr";

import fetcher from "../../libs/fetcher";

const useSleeping = (userId) => {
  const url = `/api/sleeping?userId=${userId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    // refreshInterval: 1000,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSleeping;
