"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Book, Globe, Award, Users, ChevronRight } from "lucide-react";

export default function Home() {
  const { status } = useSession();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background pattern/gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 z-0" />

        {/* Content */}
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
                Welcome to IIITDMJ
                <span className="text-primary"> ONE</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                A secure portal for students of Indian Institute of Information
                Technology, Design and Manufacturing, Jabalpur
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {status === "authenticated" ? (
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="text-lg px-8" asChild>
                    <Link href="/auth/register">
                      Get Started
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg"
                    asChild
                  >
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything in One Place
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access all your academic resources, connect with peers, and stay
              updated with campus news
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Book className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Academic Resources</h3>
              <p className="text-muted-foreground">
                Access course materials, assignments, and grades in one central
                location
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Campus Connect</h3>
              <p className="text-muted-foreground">
                Stay updated with campus events, news, and important
                announcements
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Community</h3>
              <p className="text-muted-foreground">
                Connect with peers, join student groups, and participate in
                discussions
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Career Services</h3>
              <p className="text-muted-foreground">
                Access placement opportunities, internships, and career
                development resources
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the IIITDMJ community and access all your academic resources
              in one place
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {status === "authenticated" ? (
                <Button size="lg" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href="/auth/register">Register Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">IIITDMJ ONE</h3>
              <p className="text-muted-foreground">
                A comprehensive portal for IIITDMJ students
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.iiitdmj.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Official Website
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Social Media
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} IIITDMJ. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
