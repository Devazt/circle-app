import React, { useState } from "react"
import { API } from "@/lib/api"
import { IUseThread } from "@/types/ThreadProps"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useToast from "../../../hooks/useToast"

export function useThreadCreate() {
    const toast = useToast();
    const queryClient = useQueryClient();

    const [form, setForm] = React.useState<IUseThread>({
        content: "",
        image: "",
    });

   const [ file, setFile ] = useState< File | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = e.target

        if (files) {
           setFile(files[0])
        } else {
            setForm({
                ...form,
                [name]: value
            })
        }
    }

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    function handleClickButton() {
        fileInputRef.current?.click()
    }

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const formData = new FormData()

            formData.append("content", form.content)
            formData.append("image", file as File)

            return await API.post("/thread", formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feed"] });
            toast("Success", "New Thread Successfully Created", "success");
            setForm({
                content: "",
                image: "",
            })
        },
        onError: (error: any) => {
            toast("error", error.response.data.message, "warning");
        }
    })

    return {
        form,
        handleChange,
        mutate,
        isPending,
        fileInputRef,
        handleClickButton,
        file,
        setFile,
    }
}