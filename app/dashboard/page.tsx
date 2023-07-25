import { db } from "@/lib/firebase"
import { Project } from "@/lib/schemas";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Projects from "@/components/dashboard/Projects";
import styles from "./Dashboard.module.scss";

type ReducedProject = {
    title: string;
    description: string;
    owner: boolean;
    id: string;
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect(`/signin?callbackUrl=/dashboard`);
    }

    const q = query(collection(db, "projects"), orderBy("createdAt"), where("memberEmails", "array-contains", session.user?.email));
    const data = await getDocs(q);
    let projects: ReducedProject[]  = [];
    data.forEach((doc) => {
        const res = doc.data() as Project;
        const reduced: ReducedProject = {
            title: res.title,
            description: res.description,
            owner: res.owner === session.user?.email,
            id: doc.id,
        }
        projects.push(reduced);
    });

    

    return (
        <main className={styles.wrapper}>
            <Projects
            projects={projects}
            />
        </main>
    )
}