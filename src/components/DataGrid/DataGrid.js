import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

const DataGrid = (props) => {
  let columns = props.cols.map((key, id) => {
    return {
      Header: key.title,
      accessor: key.field,
    };
  });
  columns.push({
    Header: "Action",
    show: props.canDeleteRow,
    Cell: (row) => (
      <div>
        <button
          onClick={(console.log(row), () => props.deleteRow(row.index))}
          style={{ cusror: "pointer" }}
        >
            Delete
        </button>
      </div>
    ),
  });

  if (props.datasource.length === 0) {
    // return <h4>No Records to Display.</h4>;
    return "";
  }

  return (
    <ReactTable
      data={props.datasource}
      columns={columns}
      defaultSorted={[
        {
          id: props.sortByKey,
          desc: false,
        },
      ]}
      pageSize={5}
    />
  );
};

export default DataGrid;
