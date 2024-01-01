import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";

export function useSideProfile() {
  const {
    data: profile,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["profile-card"],
    queryFn: async () => {
      const res = await API.get("/user");
      return res.data.data;
    },
  });
  return { profile, isLoading, error, refetch };
}
