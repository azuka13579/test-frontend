export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <h1>Admin Layout</h1>
      {children}
    </main>
  );
}
