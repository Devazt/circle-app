import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";

export default function useSugestion() {
    const {
        data: sugestion,
        isLoading,
        error
    } = useQuery({
        queryKey: ["sugestion"],
        queryFn: async () => {
            const res = await API.get("/users");
            return res.data.users;
        },
    });

    return { sugestion, isLoading, error };
}