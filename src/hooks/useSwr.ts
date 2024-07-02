import { BASE_URL, getFromLocalStorage } from "@/utils";

import useSWR, { SWRConfiguration } from "swr";

const useSwr = (url: string | null, options?: SWRConfiguration) => {
  const accessToken = getFromLocalStorage("ACCESS_TOKEN");

  const fetcher = async (url: string) => {
    const headers: {
      Authorization?: string;

      "Content-Type"?: string;
    } = {};

    accessToken && (headers["Authorization"] = `Bearer ${accessToken}`);

    headers["Content-Type"] = "application/json";

    const res = await fetch(url, {
      method: "GET",

      headers,
    });

    const data = await res.json();

    return { data, res };
  };

  const { data, error, mutate, isValidating } = useSWR(
    url ? [`${BASE_URL}/${url}`] : null,

    fetcher,

    {
      ...options,

      revalidateOnFocus: false,
    }
  );

  return {
    data:data?.data?.data,

    error,

    isValidating,

    mutate,
    pagination: data?.data?.pagination,
  };
};

export default useSwr;