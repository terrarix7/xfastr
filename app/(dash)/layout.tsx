import Link from "next/link";
import React from "react";
import Profile from "./profile";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex items-center p-2 gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Link href="/create">Home</Link>
      <Link href="/content">Content</Link>
      <Link href="/profile">Profile</Link>
      <Profile />
    </div>
  );
}

export default Layout;
