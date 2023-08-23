"use client";

import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function FormStatus ({ children }: { children: JSX.Element[] }) {
    const { pending } = useFormStatus();

    return (
        children.at(pending ? 1 : 0) as JSX.Element | null
    )
}