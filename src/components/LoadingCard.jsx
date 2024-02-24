import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCard() {
  return (
    <>
      <section className="card w-72">
        <Skeleton className="h-40 w-full" />
        <div className="space-y-2 mt-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </section>
    </>
  );
}
