import React from "react";
import { API } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { IUserRegister } from "@/types/user";

export function useRegister () {
    const navigate = useNavigate();

    const [form, setForm] = React.useState<IUserRegister>({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleRegister() {
        try {
            await API.post("/auth/register", form);
            navigate("/auth/login");
        } catch (error) {
            throw error
        }
    }

    return {
        handleChange,
        handleRegister,
    }
}