import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { classNames } from "./lib/functions";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./providers/ThemeProvider";
import Main from "./components/Main";

const plus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "coded by filecc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
     
      <ThemeProvider>
        <body className={classNames(plus.className)}>
          <Main>
            <div className="bg-light-grey dark:bg-very-dark-grey text-very-dark-grey dark:text-white min-h-dvh flex flex-col">
              <Navbar />
              {children}
            </div>
          </Main>
        </body>
      </ThemeProvider>
    </html>
  );
}
