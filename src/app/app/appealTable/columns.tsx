'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TaxRecord } from '@/redux/slices/appealTableSlice';
import { useState } from 'react';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

export const columns = (
  onEdit: (item: TaxRecord) => void,
  onDelete: (item: TaxRecord) => void
): ColumnDef<TaxRecord>[] =>[
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 sticky left-0 bg-white"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 sticky left-0 bg-white"
      />
    ),
    size: 3, // 5% width
  },
  {
    accessorKey: 'taxYear',
    header: 'Tax Year',
    size: 10, // 15% width
  },
  {
    accessorKey: 'company',
    header: 'Company',
    size: 10, // 20% width
  },
  {
    accessorKey: 'state',
    header: 'State',
    size: 10, // 15% width
  },
  {
    accessorKey: 'assessor',
    header: 'Assessor',
    size: 10, // 15% width
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
    size: 10, // 20% width
  },
  {
    accessorKey: 'appealDeadline',
    header: 'Appeal Deadline',
    size: 10, // 15% width
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === 'Sent'
              ? ' text-green-600'
              : 'text-red-600'
          }`}
        >
          {status}
        </div>
      );
    },
    size: 10, // 10% width
  },
  {
    accessorKey: 'appealedDate',
    header: 'Appealed Date',
    size: 10, // 10% width
  },
  {
    accessorKey: 'appliedBy',
    header: 'Applied By',
    size: 10, // 10% width
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const item = row.original;
      const isEditable = item.status !== 'Sent'; 
      return (
       <div className="flex items-center justify-end gap-2 sticky right-0 bg-white">
        {/* Edit Button */}
        <button
          onClick={() => isEditable && onEdit(item)} // Only call onEdit if editable
          className={`rounded p-1 hover:bg-gray-100 ${
            isEditable ? '' : 'cursor-not-allowed opacity-50'
          }`}
          disabled={!isEditable}
        >
          <Pencil className="h-4 w-4 text-gray-500" />
        </button>
        {/* Delete Button */}
        <button
           onClick={() => onDelete(item)} // Call the onDelete function with the row data
          className="rounded p-1 hover:bg-gray-100"
        >
          <Trash className="h-4 w-4 text-red-500" />
        </button>
      </div>
      );
    },
    size: 15, // 10% width
  },
];