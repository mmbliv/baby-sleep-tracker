import useSWR from "swr";

import fetcher from "../../libs/fetcher";

const useSleepingWithDate = (userId, weekOrMonth, date) => {
  const url = `/api/date?userId=${userId}&weekOrMonth=${weekOrMonth}&date=${date}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSleepingWithDate;
