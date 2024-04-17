import { AlertTriangle } from "lucide-react"

interface FormErrorProps {
    message?: string
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
    return <div className="flex items-center gap-4 text-destructive p-2 rounded justify-center bg-destructive/15">
        <AlertTriangle className="h-4 w-4"/>
        <p>{message}</p>
    </div>
}