import React from 'react';
import { Table, Container, Row, Button, Input } from 'reactstrap';

export default class Example extends React.Component {
  state = {
    rawInputs: {}
  };

  onClickConverter = async () => {
    const newInputs = { ...this.state.rawInputs };
    const { n, convertToMatrix } = this.props;
    for (let i = 0; i < n; i++) {
      const letter = String.fromCharCode(65 + i);
      newInputs[letter] = newInputs[letter] || '';
    }
    convertToMatrix(newInputs);
    this.setState({ rawInputs: newInputs });
  };

  handleInputChange = (letter, value) => {
    value = value.toUpperCase();
    const newInputs = { ...this.state.rawInputs };
    newInputs[letter] = value;
    this.setState({ rawInputs: newInputs });
  };

  renderInput(n) {
    let inputs = [];

    for (let i = 0; i < n; i++) {
      const res = String.fromCharCode(65 + i);
      inputs[i] = (
        <tr key={res + 1}>
          <th scope='row'>{res}</th>
          <td>
            <Input
              onChange={e => this.handleInputChange(res, e.target.value)}
              value={this.state.rawInputs[res]}
              className='inputAdj'
              type='text'
            />
          </td>
        </tr>
      );
    }
    return inputs;
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
        <Button onClick={this.onClickConverter}>Converter para matriz</Button>
      </Container>
    );
  }
}
