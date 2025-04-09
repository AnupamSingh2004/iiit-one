"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  function getBranchName(branchCode: string) {
    const branchMap: Record<string, string> = {
      bcs: "Computer Science and Engineering",
      bec: "Electronics and Communication Engineering",
      bme: "Mechanical Engineering",
      bsm: "Smart Manufacturing",
    };

    return branchMap[branchCode] || branchCode;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">IIITDMJ Portal</h1>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container flex-1 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || ""}
                />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{session?.user?.name}</CardTitle>
                <CardDescription>{session?.user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Roll Number
                </h3>
                <p>{session?.user?.rollNumber || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Batch
                </h3>
                <p>
                  {session?.user?.batch ? `20${session.user.batch}` : "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Branch
                </h3>
                <p>
                  {session?.user?.branch
                    ? getBranchName(session.user.branch)
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
