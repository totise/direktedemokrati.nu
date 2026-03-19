import Link from "next/link";

export default function HomePage(): React.ReactElement {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="font-bold text-3xl text-text">direktedemokrati.nu</h1>
        <p className="mt-4 text-text-muted">
          Next.js-appen er nu scaffoldet. Fortsæt til vote-feeden for at bygge de
          første brugerflows.
        </p>
        <Link
          className="mt-6 inline-flex rounded-xl bg-primary px-4 py-3 font-semibold text-white"
          href="/vote"
        >
          Gå til Vote Feed
        </Link>
      </div>
    </main>
  );
}
