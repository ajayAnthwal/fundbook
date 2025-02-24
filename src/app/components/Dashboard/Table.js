import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Table = ({ data, columns }) => {
  return (
    <div className="container mt-4">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-center text-white">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col} className="text-center">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
