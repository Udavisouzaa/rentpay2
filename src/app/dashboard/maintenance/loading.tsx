export default function MaintenanceLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-72 bg-gray-100 dark:bg-gray-800 rounded"></div>
      </div>

      {/* List Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 h-48 flex flex-col md:flex-row gap-6">
              {/* Image Skeleton */}
              <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
              
              {/* Content Skeleton */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-2 w-1/2">
                    <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-64 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="mt-4 h-16 w-full bg-gray-100 dark:bg-gray-900/50 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
