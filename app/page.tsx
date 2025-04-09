import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="border-b w-full">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
          <h1 className="text-2xl font-bold">IIITDMJ ONE</h1>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center w-full px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold tracking-tight">
            Welcome to IIITDMJ Portal
          </h2>
          <p className="text-xl text-muted-foreground mt-4 mb-8 max-w-2xl mx-auto">
            A secure portal for students of Indian Institute of Information
            Technology, Design and Manufacturing, Jabalpur
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>
      </main>
      
      <footer className="border-t py-6 w-full mt-auto">
        <div className="container mx-auto text-center text-muted-foreground px-4 md:px-6">
          &copy; {new Date().getFullYear()} IIITDMJ. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
