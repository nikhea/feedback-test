import Header from "@/app/components/header";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-blue-400 w-64 md:w-72 lg:w-80 h-full p-4">
        <div className="text-white font-bold text-xl mb-4">Dashboard</div>
        <nav>
          <ul>
            <li className="mb-2">
              <Link className="text-white hover:underline" href="/dashboard">
                home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                className="text-white hover:underline"
                href="/dashboard/profile"
              >
                profile
              </Link>
            </li>
            <li className="mb-2">
              <Link
                className="text-white hover:underline"
                href="/dashboard/register"
              >
                register
              </Link>
            </li>
            <li className="mb-2">
              <Link
                className="text-white hover:underline"
                href="/dashboard/setting"
              >
                setting
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-green-400 overflow-auto">
        <Header />

        {children}
      </main>
    </div>
    // {/* </html> */}
  );
}
