'use client';
import { usePathname } from 'next/navigation';
import Header from "@/components/layout/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/dashboard')) {
    return null;
  }
  
  return <Header />;
}