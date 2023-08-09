import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/home");
    }

    return redirect("/dashboard");
}