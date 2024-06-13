import Link from "next/link"
import Image from "next/image"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users , Contact , Cloud  } from "lucide-react"

export default function Component() {
  return (
    <>
    <div key="1" className="flex flex-col min-h-[100dvh] px-4 md:px-6 py-4 md:py-6">
      <main className="flex-1">
        <section className="w-full ">
          <div className="container grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <Image
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              height="200"
              src="/cover_img.svg"
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Unlock Your Learning Potential with StudySphere
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover a world of collaborative learning, personalized resources, and seamless study experiences.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/groups"
                >
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg w-12 h-12 bg-[#55efc4] text-3xl flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Join Study Groups</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm/relaxed">
                  Connect with like-minded students and collaborate on assignments, projects, and more. Discover study
                  groups based on your interests and academic needs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg w-12 h-12 bg-[#ffeaa7] text-3xl flex items-center justify-center">
                    <Contact className="h-6 w-6" />
                  </div>
                  <CardTitle>Create Chat Rooms</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm/relaxed">
                  Engage in real-time discussions, share resources, and coordinate study sessions with your peers.
                  Create dedicated chat rooms for different topics and subjects.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg w-12 h-12 bg-[#fdcb6e] text-3xl flex items-center justify-center">
                    <Cloud className="h-6 w-6" />
                  </div>
                  <CardTitle>Access Cloud Storage</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm/relaxed">
                  Store and access your study materials, articles, PDFs, and other resources in the cloud. Seamlessly
                  share and collaborate on files with your study group.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="w-full pt-4 pb-20 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get Started with StudySphere</h2>
              <p className="mx-auto max-w-[600px] text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join our vibrant community of students and unlock a world of collaborative learning and personalized
                resources.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="flex space-x-2 py-4">
                <Button className="mx-auto" type="submit">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 StudySphere. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
    </>
  )
}