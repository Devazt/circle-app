import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";

export default function useSearch() {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ["users"], queryFn: async() => {
            const res = await API.get("/users");
            return res.data.users
        }
    })

    return { users, isLoading, error }
}