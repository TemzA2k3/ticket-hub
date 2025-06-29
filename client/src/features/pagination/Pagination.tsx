import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const visiblePages = [
    prevPage >= 1 ? prevPage : null,
    currentPage,
    nextPage <= totalPages ? nextPage : null,
  ].filter((page): page is number => page !== null);

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        className="w-10 h-10 flex items-center justify-center border border-border rounded-[var(--radius)] bg-background text-foreground disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center border rounded-[var(--radius)] ${
            currentPage === page
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        className="w-10 h-10 flex items-center justify-center border border-border rounded-[var(--radius)] bg-background text-foreground disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};
