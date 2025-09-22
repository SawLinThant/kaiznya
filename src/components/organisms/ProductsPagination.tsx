"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className
}) => {
  const paginationItems = useMemo(() => {
    const items = [];
    const maxVisiblePages = 5;
    
    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      items.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        items.push(
          <span key="ellipsis-start" className="px-3 py-2 text-sm text-gray-500">
            ...
          </span>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            'px-3 py-2 text-sm font-medium border border-gray-300',
            i === currentPage
              ? 'bg-pink-600 text-white border-pink-600'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          )}
        >
          {i}
        </button>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <span key="ellipsis-end" className="px-3 py-2 text-sm text-gray-500">
            ...
          </span>
        );
      }
      
      items.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    return items;
  }, [currentPage, totalPages, onPageChange]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4', className)}>
      {/* Results Info */}
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'flex items-center px-3 py-2 text-sm font-medium border border-gray-300 rounded-l-lg',
            currentPage === 1
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          )}
        >
          <Icon name="send" className="w-4 h-4 mr-1 rotate-180" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex">
          {paginationItems}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'flex items-center px-3 py-2 text-sm font-medium border border-gray-300 rounded-r-lg',
            currentPage === totalPages
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          )}
        >
          Next
          <Icon name="send" className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ProductsPagination;
