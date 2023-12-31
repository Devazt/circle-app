import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";

export function useThread() {
  const {
    data: feed,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await API.get("/thread");
      return res.data;
    },
  });
  refetch();
  return { feed, isLoading, error, refetch };
}
