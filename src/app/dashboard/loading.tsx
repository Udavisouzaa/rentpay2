export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-pulse">
      {/* Top Bar Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 h-24 flex flex-col justify-center">
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* Header List Skeleton */}
      <div className="mb-4">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Properties List Skeleton */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex flex-col sm:flex-row sm:items-center justify-between h-20">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 rounded"></div>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
