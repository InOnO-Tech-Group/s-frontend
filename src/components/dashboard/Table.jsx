import React from 'react';
const Table = ({ columns, data }) => {
  const renderCell = (value) => {
    if (typeof value === 'string' && value.startsWith('http')) {
      return <img src={value} alt="Image" className="w-16 h-16 object-cover" />;
    }
    return value; 
  };

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="px-4 py-2 text-left border-b">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className="mt-5 bg-white">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border-b ">
                  {col === '#'
                    ? rowIndex + 1
                    : renderCell(row[col.toLowerCase()])}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="px-4 py-2 text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
