"use client";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import LoadingButton from "../global/LoadingButton";
import { useRouter } from "next/navigation";

export default function JoinProject({ id, title }: { id: string, title: string }) {
    const router = useRouter();
    const [joining, setJoining] = useState(false);
    const { toast } = useToast();  

    function join() {
        setJoining(true);
        fetch(`/api/project/${encodeURI(id)}/members`, {
            method: "PATCH",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            if (res.status != 200) {
                res.json()
                .then(data => {
                    toast({
                        title: "Error joining project",
                        description: data.error,
                        duration: 5000,
                    });
                })
                .catch(() => {
                    toast({
                        title: "Error joining project",
                        description: "Something failed on our side please try again soon",
                        duration: 5000,
                    });
                })
            } else {
                router.push("/dashboard");
            }
            setJoining(false);
        });
    }

    return (
        <>
            {joining ? <LoadingButton className="ml-auto">Joining</LoadingButton> : <Button className="ml-auto" onClick={join}>Join { title }</Button>}
        </>
    )
}