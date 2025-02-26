import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Table = ({ data, columns }) => {
  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
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
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col} className="text-center">
                      {row[col] || "N/A"} {/* Handle missing data */}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
