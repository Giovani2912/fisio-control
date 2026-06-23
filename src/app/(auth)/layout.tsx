export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1f1f1] p-4">
      {children}
    </div>
  );
}
