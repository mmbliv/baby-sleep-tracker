import useSWR from "swr";

import fetcher from "../../libs/fetcher";

const useSleepingWithDate = (userId, date) => {
  const url = `/api/sleeping?userId=${userId}&date=${date}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSleepingWithDate;
