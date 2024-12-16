export default function Unauthorized() {
  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-2xl font-medium text-center mb-4">You are not allowed to go there</h1>
          <p className="text-sm text-foreground/60 text-center mb-6">
            This page is restricted to authenticated users only.
          </p>
        </main>
      </div>
  );
}