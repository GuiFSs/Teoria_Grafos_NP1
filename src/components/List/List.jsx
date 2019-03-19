import React from 'react';
import { Table, Container, Row } from 'reactstrap';

export default class Example extends React.Component {
  renderInput(n) {
    const alf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    return alf.map((res, i) => {
      if (i < n) {
        return (
          <tr key={res + 1}>
            <th scope='row'>{res}</th>
            <td>
              <input
                onChange={e => this.props.convertToMatrix(res, e.target.value)}
                className='inputAdj'
                type='text'
              />
            </td>
          </tr>
        );
      }
      return null;
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th>Lista Adjacente</th>
              </tr>
            </thead>

            <tbody>{this.renderInput(this.props.n)}</tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}
