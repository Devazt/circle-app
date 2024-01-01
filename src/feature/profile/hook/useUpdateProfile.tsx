import React from "react";
import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";

export function useUpdateProfile() {

    const [form, setForm] = React.useState({
        fullname: "",
        username: "",
        bio: "",
    });

    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: async () => {
            return await API.patch("/userpw", form);
        },
        onSuccess: () => {
            toast("Success", "Password Updated", "success");
            queryClient.invalidateQueries({ queryKey: ["following"] });
        },
        onError: (err) => {
            console.error(err);
            toast("Error", err.message, "error");
        }
    });

    return { form, setForm, updateUser, isUpdating };
}

