import type { AreaType } from "@/lib/types";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetches area data from the API based on the provided value.
 * If the value is null, empty string, or less than 3 characters,
 * an empty array is returned.
 * If the value is valid, the function fetches the data and returns
 * an array of AreaType objects.
 * If the API returns a 403 status code, an empty array is returned.
 * If an error occurs while fetching the data, an empty array is returned.
 * The function also returns a boolean indicating whether the data is currently being fetched.
 * @param {string | null} value - The value to fetch data for.
 * @returns {{ data: AreaType[], showNoResults: boolean, isLoading: boolean }}
 */
export default function useFetchAreaData(value: string | null) {
  const [data, setData] = useState<AreaType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const trimmedValue = value?.trim();
      setShowNoResults(false);
      if (!trimmedValue || trimmedValue.length < 3) {
        setData([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          API_URL + "/api/fetch?query=" + encodeURIComponent(trimmedValue)
        );
        const responseData = await response.json();

        if (responseData?.error?.status === 403) {
          throw new Error("403 Forbidden", { cause: 403 });
        }

        setData(responseData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setShowNoResults(true);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [value]);

  return { data, showNoResults, isLoading };
}
