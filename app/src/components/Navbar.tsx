import Link from "next/link"
import { Globe2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { getUserData } from "@/db/helpers/getUserData"
import UserProfileModal from "./Navbar/UserProfileModal"

export default async function Component() {

    const userData = await getUserData();

    return (
        <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
            <Link className="flex items-center gap-2" href="/">
                <Globe2Icon className="h-6 w-6" />
                <span className="text-lg font-semibold">Study Sphere (beta)</span>
            </Link>
            <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
                <Link href="/home"><Button variant="ghost" color="black">Home</Button></Link>
                <Link href="/groups"><Button variant="ghost">Groups</Button></Link>
                <Link href="/about"><Button variant="ghost">About</Button></Link>
                {userData && <UserProfileModal user={userData} />}
                {!userData && <Link href="/auth/signin"><Button>Login</Button></Link>}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="md:hidden" size="icon" variant="outline">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="grid gap-6 p-6">
                        <Link href="/home"><Button variant="ghost" color="black">Home</Button></Link>
                        <Link href="/about"><Button variant="ghost">About</Button></Link>
                        <Link href="/groups"><Button variant="ghost">Groups</Button></Link>
                        <Link href="/auth/signin"><Button>Sign In</Button></Link>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}
