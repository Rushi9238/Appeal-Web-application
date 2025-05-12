'use client';

import { useState } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onEdit?: (row: TData) => void;
    onDelete?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });

    return (
        <div className="rounded-md ">
            {/* Add horizontal scrolling */}
            <div className="overflow-x-auto">
                <table className="min-w-[1900px] w-full border-collapse">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b border-gray-300 bg-[#ecf3f9]">
                                {headerGroup.headers.map((header, index) => (
                                    <th
                                        key={header.id}
                                        style={{
                                            width: `${header.column.columnDef.size}% `,
                                            backgroundColor:'#ecf3f9',
                                        }}
                                        className={`px-4 py-3 text-left text-sm font-medium text-gray-500
                        ${index === 0 && "sticky left-0 z-10 bg-gray-50"}
                        ${index === headerGroup.headers.length - 1 && "sticky right-0 z-10 bg-gray-50"}`}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center gap-2
                            header.column.getCanSort() && "cursor-pointer select-none"`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanSort() && (
                                                    <div className="flex flex-col">
                                                        <ChevronUp
                                                            className={`h-3 w-3 
                                ${header.column.getIsSorted() === "asc" ? "text-black" : "text-gray-400"}`}
                                                        />
                                                        <ChevronDown
                                                            className={`h-3 w-3 -mt-1
                                ${header.column.getIsSorted() === "desc" ? "text-black" : "text-gray-400"}`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-b border-gray-300 hover:bg-gray-50">
                                {row.getVisibleCells().map((cell, index) => (
                                    <td
                                        key={cell.id}
                                        style={{
                                            width: `${cell.column.columnDef.size}%`,
                                        }}
                                        className={`px-4 py-3 text-sm
                        ${index === 0 && "sticky left-0 z-10 bg-white"}
                        ${index === row.getVisibleCells().length - 1 && "sticky right-0 z-10 bg-white"}`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between border-t px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span>Rows per page:</span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                        className="rounded border p-1"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}