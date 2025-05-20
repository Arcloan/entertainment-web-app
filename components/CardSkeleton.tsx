export function CardSkeleton() {
    return (
      <div className="rounded-lg overflow-hidden bg-gray-800 animate-pulse">
        <div className="aspect-video bg-gray-700"></div>
        <div className="p-2 space-y-2">
          <div className="h-3 w-2/3 bg-gray-700 rounded"></div>
          <div className="h-3 w-1/3 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }