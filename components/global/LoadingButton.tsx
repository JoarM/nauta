import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

const LoadingButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <Button {...props} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            { children }
        </Button>
    )
}

export default LoadingButton;