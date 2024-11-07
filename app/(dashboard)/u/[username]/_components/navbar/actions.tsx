import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

export const Actions =  () => {
    return(
        <div className="flex items-center justify-end gap-x-4">
            <Button
                size={"sm"}
                variant={"ghost"}
                className="text-muted-foreground hover:text-primary"
                asChild
            >
                <Link href={"/"}>
                    <LogOut className="h-5 w-5"/>
                    Exit
                </Link>
            </Button>
            <UserButton/>
        </div>
    )
}