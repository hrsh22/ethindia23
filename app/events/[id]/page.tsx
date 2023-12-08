import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const event = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/events?eventId=${params.id}`
  ).then((res) => res.json());

  if (!event.success) {
    notFound();
  }

  return <div>EVENT ID: {params.id}</div>;
}
