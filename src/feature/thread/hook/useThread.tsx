import React, { FormEvent } from "react"
import { API } from "@/lib/api"
import { IThread } from "@/types/thread"
import { useQuery } from "@tanstack/react-query"

export function useThread() {

    const [form, setForm] = React.useState<IThread>({
        content: "",
        image: "",
    });

    async function getThreads() {
        try {
            const response = await API.get(`/thread`);
            return response.data;
        } catch (error) {
            throw new Error
        }
    }

    const { data: thread, refetch } = useQuery({ queryKey: ['threads' ], queryFn: getThreads })

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

        API.post("/thread", formData)
        refetch()
    }

    return {
        form,
        thread,
        handleChange,
        fileInputRef,
        handleClickButton,
        handleSubmit
    }
}