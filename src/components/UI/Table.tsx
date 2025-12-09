// src/components/UI/Table.tsx
"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "@/ui";

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];

  /** Id of the column to filter on (must match accessorKey or id) */
  filterColumnId?: string;
  filterPlaceholder?: string;

  /** Optional: message to show when there are no rows */
  emptyMessage?: string;

  /** Optional: wrapper className to tweak layout */
  className?: string;
}

/**
 * Generic table wrapper around TanStack Table.
 * Sorting/filtering logic lives here; rendering of cells is fully column-driven.
 * Default filter UI is your Search component, full width.
 */
export function Table<TData>({
  data,
  columns,
  filterColumnId,
  filterPlaceholder = "Filter…",
  emptyMessage = "No rows to display.",
  className,
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const filterColumn = filterColumnId
    ? table.getColumn(filterColumnId)
    : undefined;

  const filterValue =
    (filterColumn?.getFilterValue() as string | undefined) ?? "";

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {/* Default filter: your Search, full width */}
      {filterColumn && (
        <div className="mb-3">
          <Search
            value={filterValue}
            placeholder={filterPlaceholder}
            onChange={(event) =>
              filterColumn.setFilterValue(event.target.value)
            }
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-card border bg-surface">
        <table className="min-w-full text-sm">
          <thead className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-left text-xs font-medium text-muted"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border-subtle/60 last:border-b-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-3 py-6 text-center text-xs text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
