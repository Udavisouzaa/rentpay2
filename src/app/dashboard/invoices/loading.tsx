export default function InvoicesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 h-12">
              <tr>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row} className="h-20">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div></td>
                  <td className="px-6 py-4 text-right"><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
