import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-10 w-3/4 max-w-2xl mb-4" />
      <Skeleton className="h-6 w-1/2 max-w-xl mb-8" />

      <Skeleton className="h-[400px] w-full max-w-4xl mb-8 rounded-lg" />

      <div className="space-y-4 max-w-4xl">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  )
}
