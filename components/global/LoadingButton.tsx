import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export default function LoadingButton({
    asChild,
    children,
    variant
} : {
    asChild?: boolean;
    children: React.ReactNode;
    variant?: "secondary" | "destructive" | "outline" | "ghost" | "link" | "default" | null | undefined;
}) {
    return (
        <Button asChild={asChild} variant={variant} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            { children }
        </Button>
    )
}