import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-caps flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="text-[120px] font-bold leading-none text-[#ECECEC]">404</span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-[15px] text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-[52px] items-center gap-2 rounded-[14px] bg-primary px-8 text-[14px] font-medium text-secondary transition-all hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.8} /> Back to Home
      </Link>
    </div>
  );
}
