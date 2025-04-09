"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page content - adds padding to account for fixed navbar */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

        <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="w-full">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || ""}
                      />
                      <AvatarFallback>
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">
                        {session?.user?.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {session?.user?.email}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Roll Number
                      </h3>
                      <p className="text-lg font-medium">
                        {session?.user?.rollNumber || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Batch
                      </h3>
                      <p className="text-lg font-medium">
                        {session?.user?.batch
                          ? `20${session.user.batch}`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Branch
                      </h3>
                      <p className="text-lg font-medium">
                        {session?.user?.branch
                          ? getBranchName(session.user.branch)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Current Semester
                      </h3>
                      <p className="text-lg font-medium">
                        {session?.user?.semester || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        CGPA
                      </h3>
                      <p className="text-lg font-medium">
                        {session?.user?.cgpa || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Contact
                      </h3>
                      <p className="text-lg font-medium">
                        {session?.user?.contact || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Courses</CardTitle>
                <CardDescription>
                  View your current semester courses and materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No courses to display. Course registration will begin soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>
                  Check your pending and submitted assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No active assignments at the moment.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>
                  Important updates from administration and faculty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No new announcements.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
