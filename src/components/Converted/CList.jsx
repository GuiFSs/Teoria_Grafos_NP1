import React from 'react';
import { Table, Input } from 'reactstrap';

const CList = props => {
  const { values } = props;
  console.log(values);

  const keys = Object.keys(values);
  const thead = (
    <thead>
      <tr>
        <th>#</th>
        {keys.map(key => (
          <th
            key={key}
            align='center'
            style={{ textAlign: 'center' }}
            className='coluna'
          >
            {key}
          </th>
        ))}
      </tr>
    </thead>
  );

  const tbody = (
    <tbody>
      {keys.map(key => (
        <tr key={key}>
          <th scope='row' style={{ width: '50px' }}>
            {key}
          </th>
          {Object.values(values[key]).map(value => (
            <td key={key + value}>
              <Input value={value} readOnly />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  // const alf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  // let tr = [];
  // tr[0] = <th>#</th>;
  // for (let i = 0; i < n; i++) {
  //   tr[i + 1] = (
  //     <th align='center' style={{ textAlign: 'center' }} className='coluna'>
  //       {alf[i]}
  //     </th>
  //   );
  // }
  // return tr.map(test => test);

  return (
    <Table>
      {thead}
      {tbody}
    </Table>
  );
};

export default CList;
