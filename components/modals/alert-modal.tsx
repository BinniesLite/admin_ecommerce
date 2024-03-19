"use client"

import { useState, useEffect} from "react"
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void,
    loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({ open, onClose, onConfirm, loading}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return <>
        <Modal
            title="Are you sure?"
            description="This action cannot be undone"
            open={open}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    </>
}       