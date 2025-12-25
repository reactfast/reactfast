import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  const renderPageNumbers = () => {
    const pages = []
    const totalPagesToShow = 5 // how many around current
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    if (totalPages <= 7) {
      // Show all pages if small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageButton(i))
      }
    } else {
      // Always show first + last
      pages.push(renderPageButton(1))

      // Insert "..." if needed before window
      if (currentPage > totalPagesToShow) {
        pages.push(
          <span key="start-ellipsis" className="px-3 py-2 text-gray-400">
            …
          </span>,
        )
      }

      // Pages around current
      const start = Math.max(2, currentPage - 2)
      const end = Math.min(totalPages - 1, currentPage + 2)

      for (let i = start; i <= end; i++) {
        pages.push(renderPageButton(i))
      }

      // Insert "..." if needed after window
      if (currentPage < totalPages - (totalPagesToShow - 1)) {
        pages.push(
          <span key="end-ellipsis" className="px-3 py-2 text-gray-400">
            …
          </span>,
        )
      }

      pages.push(renderPageButton(totalPages))
    }

    return pages
  }

  const renderPageButton = (i) => (
    <button
      key={i}
      onClick={() => onPageChange(i)}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
        i === currentPage
          ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          : 'text-gray-900 hover:bg-gray-50'
      }`}
    >
      {i}
    </button>
  )

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
