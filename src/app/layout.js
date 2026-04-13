import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Aura - Premium Wedding Invitations & RSVPs",
  description: "Design stunning wedding invitations and manage your guest RSVPs effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="app-container">
          {children}
        </main>
      </body>
    </html>
  );
}
