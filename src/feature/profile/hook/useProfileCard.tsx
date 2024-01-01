import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";

export function useProfileCard() {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile-card"],
    queryFn: async () => {
      const res = await API.get("/user");
      return res.data.data;
    },
  });
  refetch();
  return { profile, isLoading, error };
}
