import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
          <AtSignIcon className="w-16 h-16 mx-auto sm:mx-0 sm:mr-6" />
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h2 className="text-xl leading-tight">Error 404</h2>
            <p className="text-sm leading-tight text-gray-600">
              The page you are looking for does not exist.
            </p>
            <div className="mt-4">
              <Link href="/">
                <Button className="w-full sm:w-auto" variant="outline">
                  Return to Homepage
                  <ArrowLeftIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function AtSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  );
}
