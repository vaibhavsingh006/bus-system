import React from "react";

export const Table = ({ className = "", children, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ className = "", children, ...props }) => (
  <thead className={`border-b ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody = ({ className = "", children, ...props }) => (
  <tbody className={`last:border-0 ${className}`} {...props}>
    {children}
  </tbody>
);

export const TableFooter = ({ className = "", children, ...props }) => (
  <tfoot className={`border-t bg-gray-100 font-medium ${className}`} {...props}>
    {children}
  </tfoot>
);

export const TableRow = ({ className = "", children, ...props }) => (
  <tr
    className={`border-b transition-colors hover:bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </tr>
);

export const TableHead = ({ className = "", children, ...props }) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium text-gray-500 ${className}`}
    {...props}
  >
    {children}
  </th>
);

export const TableCell = ({ className = "", children, ...props }) => (
  <td className={`p-4 align-middle ${className}`} {...props}>
    {children}
  </td>
);

export const TableCaption = ({ className = "", children, ...props }) => (
  <caption className={`mt-4 text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </caption>
);
