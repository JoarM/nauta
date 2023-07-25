import ClientAuthProvider from "@/components/auth/ClientAuthProvider";
import Navbar from "@/components/global/Navbar";

export default function DashboardRoot({ children } : { children: React.ReactNode }) {
    return (
        <ClientAuthProvider>
            <Navbar/>
            {children}
        </ClientAuthProvider>
    )
}