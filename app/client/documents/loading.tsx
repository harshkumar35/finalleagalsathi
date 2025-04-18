import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-10 w-96 mb-8" />
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    </div>
  )
}
