import React from "react";
import { API } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { IUserRegister } from "@/types/UserProps";
import useToast from "@/hooks/useToast";

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

    const toast = useToast();

    async function handleRegister() {
        try {
            const response = await API.post("/auth/register", form);
            
            if (response) toast("Account Created", "Register successfully", "success");
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