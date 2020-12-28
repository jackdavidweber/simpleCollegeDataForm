import React from 'react';

import MuiTable from 'mui-virtualized-table'
import faker from 'faker';


function createPersonData(count = 5) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        id: faker.random.number(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        jobTitle: faker.name.jobTitle(),
        jobArea: faker.name.jobArea(),
        jobType: faker.name.jobType(),
      })
    }
  
    return data;
  }


function columns_reformatter(list_of_strings, width){
    const columns = []
    for (let s of list_of_strings){
        const inner_obj = {"width": width, "label": s, "dataKey": s}
        columns.push(inner_obj)
    }
    return columns
}

export default function NewCollegeTable({column_names, rows}) {
    const data = createPersonData(20);
    console.log(column_names)
    const columns = columns_reformatter(column_names, 200)
    return (
      <MuiTable
        includeHeaders={true}
        data={data}
        columns={[{ name: 'firstName' }, { name: 'lastName' }]}
        width={500}
        style={{ backgroundColor: 'white' }}

      />
    );
}
