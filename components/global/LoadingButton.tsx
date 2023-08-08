import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export default function LoadingButton({
    asChild,
    children,
    variant,
    className,
    size
} : {
    asChild?: boolean;
    children: React.ReactNode;
    variant?: "secondary" | "destructive" | "outline" | "ghost" | "link" | "default" | null | undefined;
    className?: string;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) {
    return (
        <Button size={size} asChild={asChild} variant={variant} className={className} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            { children }
        </Button>
    )
}