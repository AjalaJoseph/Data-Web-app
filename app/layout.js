import Link from "next/link";
import "./globals.css";
import Providers from "./Provider";
export const metadata = {
  title: "AJFdata",
  description: "AJFdata is one of the most data and all other subscription web app that offer instant recharge card, data subscription Exam checker e.t.c....",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
    <div>
        <Providers>
          {children}
          <div className="fixed bottom-10 right-5">
           <Link href="https://wa.me/2349015017469?text=Hello%20JOSEPH!%20%20is%20from%20your%20website." target="_blank">
            <img src="/chart-removebg-preview.png" className="w-15"/></Link>
          </div>
        </Providers>
    </div>
      </body>
    </html>
  );
}
