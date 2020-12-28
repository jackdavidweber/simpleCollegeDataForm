import React from 'react';
import MuiTable from 'mui-virtualized-table'
// For virtualized table, used the following:
// https://www.npmjs.com/package/mui-virtualized-table

function columns_reformatter(list_of_strings, width){
    const columns = []
    for (let s of list_of_strings){
        const inner_obj = {"width": width, "name": s, "dataKey": s}
        columns.push(inner_obj)
    }
    return columns
}

export default function NewCollegeTable({column_names, rows}) {
    const columns = columns_reformatter(column_names, 200)
    return (
      <MuiTable
        includeHeaders={true}
        data={rows}
        columns={columns}
        maxHeight={500}
        width={500}
        fixedRowCount={1} // freezes the top row
      />
    );
}
