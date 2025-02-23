const Table = ({ data, columns }) => {
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border p-2">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col} className="border p-2">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  