import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useStatusReply() {
    const { id } = useParams();
    const { data: reply, isLoading, error, refetch } = useQuery({
        queryKey: ["reply", id],
        queryFn: async () => {
            const res = await API.get(`/thread/${id}`);
            return res.data;
        },
    });
    refetch();

    return { reply, isLoading, error, refetch };
}