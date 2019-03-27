import React from 'react';
import { Table, Input } from 'reactstrap';

const CList = props => {
  const { values, nVertices, type } = props;

  const keys = Object.keys(values);
  const thead = (
    <thead>
      <tr>
        <th>#</th>
        {keys.map((key, i) => {
          return (
            i < nVertices && (
              <th
                key={key}
                align='center'
                style={{ textAlign: 'center' }}
                className='coluna'
              >
                {key}
              </th>
            )
          );
        })}
      </tr>
    </thead>
  );

  const tbody = (
    <tbody>
      {keys.map(
        (key, ind) =>
          ind < nVertices && (
            <tr key={key}>
              <th scope='row' style={{ width: '50px' }}>
                {key}
              </th>
              {Object.values(values[key]).map(
                (value, i) =>
                  i < nVertices && (
                    <td align='center' key={key + value + i}>
                      <Input
                        value={value}
                        type={type}
                        checked={value}
                        className='input'
                        readOnly
                      />
                    </td>
                  )
              )}
            </tr>
          )
      )}
    </tbody>
  );

  return (
    <Table>
      {thead}
      {tbody}
    </Table>
  );
};

export default CList;
