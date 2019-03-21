import React from 'react';
import { Table, Input } from 'reactstrap';

const makeConnectedToAndValues = (input, nVertices) => {
  const arr = [];
  const values = [];
  for (let i = 0; i < input.length; i++) {
    if (i >= nVertices) break;
    if (input[i] !== '' && input[i] !== false) {
      arr[i] = String.fromCharCode(65 + i);
      values[i] = { connectedId: arr[i], weight: input[i] };
    }
  }
  return { connectedTo: arr, values };
};

const showValues = (arrayString, nVertices) => {
  const { connectedTo, values } = makeConnectedToAndValues(
    arrayString,
    nVertices
  );

  let res = '';

  connectedTo.map(
    (key, i) =>
      (res += `${
        typeof values[i].weight === 'boolean' ? '' : values[i].weight
      } ${key}; `)
  );

  return res.substr(0, res.length - 2);
};

const CTable = ({ inputs, nVertices }) => {
  const inputsKeys = Object.keys(inputs);
  const head = (
    <thead>
      <tr>
        <th>#</th>
        <th>Lista Adjacente</th>
      </tr>
    </thead>
  );

  const body = (
    <tbody>
      {inputsKeys.map(
        (key, i) =>
          i < nVertices && (
            <tr key={key}>
              {key}
              <td>
                <Input
                  type='text'
                  readOnly
                  value={showValues(inputs[key], nVertices)}
                />
              </td>
            </tr>
          )
      )}
    </tbody>
  );

  return (
    <Table>
      {head}
      {body}
    </Table>
  );
};

export default CTable;
