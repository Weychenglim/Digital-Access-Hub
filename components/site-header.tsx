import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="bg-teal-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center">
          {/* Logo and Title aligned left */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/digital-access-hub-logo.png"
              alt="Digital Access Hub Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-2xl md:text-3xl font-bold leading-none">Digital Access Hub</h1>
          </Link>

          {/* Navigation aligned right */}
          <nav>
            <ul className="flex space-x-6 text-lg">
              <li>
                <Link href="/" className="hover:underline font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/websites" className="hover:underline font-medium">
                  All Websites
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:underline font-medium">
                  Get Help
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline font-medium">
                  About Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
