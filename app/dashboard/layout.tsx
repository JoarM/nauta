import ClientAuthProvider from "@/components/auth/ClientAuthProvider";
import Navbar from "@/components/global/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Vercel",
    openGraph: {
        images: "/og-general.png",
        url: ""
    },
}

export default function DashboardRoot({ children } : { children: React.ReactNode }) {
    return (
        <ClientAuthProvider>
            <Navbar/>
            {children}
        </ClientAuthProvider>
    )
}