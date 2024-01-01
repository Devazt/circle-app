import React from "react";
import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { UseReply } from "@/types/RepliesProps";
import useToast from "@/hooks/useToast";

export function useFormReply() {
    const { id } = useParams();
    const toast = useToast();
    const queryClient = useQueryClient();
    const [form, setForm] = React.useState<UseReply>({
        content: "",
        image: "",
        thread: Number(id)
    });
    const [file, setFile] = React.useState<File | null>(null)
    
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
        mutationFn: () => {
            const formData = new FormData();

            formData.append("content", form.content)
            formData.append("image", file as File)
            formData.append("thread", form.thread.toString());

            return API.post("/replies", formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post-reply"] });
            toast("Success", "Reply Posted Successfully", "success");
            setForm({
                content: "",
                image: "",
                thread: Number(id)
            });
        },
        onError: (err) => {
            toast("Error", err.message , "error");
        }
    });

    return {
        form,
        handleChange,
        fileInputRef,
        handleClickButton,
        mutate,
        isPending,
        setFile,
        file
    }
}