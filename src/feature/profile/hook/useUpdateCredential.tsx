import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { API } from "@/lib/api";
import useToast from "@/hooks/useToast";

export default function useUpdateCredential() {
    const [form, setForm] = useState({
        password:""
    })

    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: async () => {
            return await API.patch("/userpw", form);
        },
        onSuccess: () => {
            toast("Success", "Profile Updated", "success");
            queryClient.invalidateQueries({ queryKey: ["following"] });
        },
        onError: (err) => {
            console.error(err);
            toast("Error", err.message, "error");
        }
    });

    return { form, setForm, updateUser, isUpdating };
}
