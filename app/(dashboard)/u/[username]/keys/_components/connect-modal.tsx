"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { 
    Alert,
    AlertDescription,
    AlertTitle
 } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const ConnectModal = () => {
    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"primary"}>
                    Generate connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose>
                        Cancel
                    </DialogClose>
                    <Button
                        onClick={() => {}}
                        variant={"primary"}
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default ConnectModal;
