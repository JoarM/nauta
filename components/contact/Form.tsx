"use client";

import FormStatus from "@/components/global/FormstatusButton";
import LoadingButton from "@/components/global/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "../ui/use-toast";
import { useRef } from "react";

export default function Form() {
    const { toast } = useToast();
    const form = useRef<HTMLFormElement>(null);

    async function contact(formData: FormData) {
        const data = {
            email: formData.get("email"),
            name: formData.get("name"),
            message: formData.get("message"),
        }

        const res = await fetch(`/api/contact`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        
        if (res.status != 200) {
            const error = await res.json()

            toast({
                title: "Wooops something went wrong.",
                description: error.error,
                duration: 5000,
            });
        } else {
            form.current?.reset();

            toast({
                title: "Thanks for your message",
                description: "Thanks for messaging us we will get back to you as soon as possible",
                duration: 5000,
            });
        }
    }

    return (
        <form className="grid gap-6" action={contact} ref={form}>
            <div className="grid gap-2">
                <Label className="text-primary-foreground/60 font-light">Email</Label>
                <Input required type="email" name="email" />
            </div>
            <div className="grid gap-2">
                <Label className="text-primary-foreground/60 font-light">Your name</Label>
                <Input required name="name" />
            </div>
            <div className="grid gap-2">
                <Label className="text-primary-foreground/60 font-light">What on your mind?</Label>
                <Textarea className="bg-background resize-none" rows={7} required maxLength={200} minLength={1} name="message" />
            </div>
            <FormStatus>
                <Button className="w-48 max-w-full">
                    Submit
                </Button>
                <LoadingButton className="w-48 max-w-full">
                    Submiting
                </LoadingButton>
            </FormStatus>
        </form>
    )
}