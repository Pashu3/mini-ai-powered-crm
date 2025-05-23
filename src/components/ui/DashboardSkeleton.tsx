export function DashboardSkeleton() {
  return (
    <>
      {/* Quickstats skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-card rounded-lg border border-border shadow-sm">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-24 mb-3"></div>
              <div className="h-7 bg-muted rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded w-32 mb-4"></div>
              <div className="h-3 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and tables skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <div className="bg-muted/30 px-5 py-3.5 border-b border-border">
              <div className="h-5 bg-muted rounded w-32 animate-pulse"></div>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="animate-pulse">
                    <div className="flex justify-between items-center mb-1">
                      <div className="h-4 bg-muted rounded w-24"></div>
                      <div className="h-4 bg-muted rounded w-10"></div>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-1.5"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lower content skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <div className="bg-muted/30 px-5 py-3.5 border-b border-border">
              <div className="h-5 bg-muted rounded w-32 animate-pulse"></div>
            </div>
            <div className="divide-y divide-border">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="p-4">
                  <div className="animate-pulse">
                    <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

