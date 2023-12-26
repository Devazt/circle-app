import React, { FormEvent } from "react";
import { API } from "@/lib/api";
import { IKomen } from "@/types/reply";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useReply() {

    const [form, setForm] = React.useState<IKomen>({
        content: "",
        image: "",
        thread: 0
    });

    async function getReply() {
        try {
            // const param = useParams();
            const response = await API.get(`/reply/1`);
            // const json = await response.data;
            return response.data
        } catch (error) {
            throw new Error
        }
    }

    const { data: reply, refetch } = useQuery({ queryKey: ['reply'], queryFn: getReply })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = e.target

        if (files) {
            setForm({
                ...form,
                [name]: files[0]
            })
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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        let formData = new FormData()

        formData.append("content", form.content)
        formData.append("image", form.image as File)
        formData.append("thread", `${useParams().id}`)

        API.post("/reply", formData)
        refetch()
    }

    return {
        form,
        reply,
        handleChange,
        handleClickButton,
        handleSubmit,
        fileInputRef
    }
}