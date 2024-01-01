import { useQuery } from "@tanstack/react-query"
import { API } from "@/lib/api"

export function useFollowing() {
    const {
        data: userFollow,
        isLoading,
        error
    } = useQuery({
        queryKey: ["following"],
        queryFn: async () => {
            const res = await API.get("/user")
            return res.data.data
        },
    })

    return { userFollow, isLoading, error }
}