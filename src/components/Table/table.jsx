import React, { Component } from 'react';
import { Table, Container, Row, Input, Label, Col } from 'reactstrap';

export default class table extends Component {
  renderCol(n) {
    const alf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let tr = [];
    tr[0] = <th>#</th>;
    for (let i = 0; i < n; i++) {
      tr[i + 1] = (
        <th align='center' style={{ textAlign: 'center' }} className='coluna'>
          {alf[i]}
        </th>
      );
    }
    return tr.map(test => test);
  }

  handleChangeInput = (letter, i, e, type) => {
    if (type === 'checkbox') {
      if (!e.target.checked) {
        this.props.gerarGrafo(letter, i);
      } else {
        this.props.gerarGrafo(null, null);
      }
    } else {
      if (e.target.value === '') {
        this.props.gerarGrafo(letter, i);
      } else {
        // this.props.gerarGrafo(null, null);
        this.props.gerarGrafo(letter, i, e.target.value, type);
      }
    }
  };

  renderInput(n, type) {
    const alf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let input = [];

    let aux = []; // culpa do andersu
    for (let i = 0; i < n; i++) {
      aux[i] = i;
    }

    for (let i = 0; i < n; i++) {
      input[i] = (
        <td key={alf[i]} align='center'>
          <Label>
            <Input
              onChange={e => this.handleChangeInput(alf[i], i, e, type)}
              className='input'
              type={type}
            />
          </Label>
        </td>
      );
    }

    const { grafoGerado, direcionado } = this.props;
    let temGrafo = !direcionado && Object.keys(grafoGerado).length !== 0;

    return alf.map((letter, i) => {
      if (i < n) {
        return (
          <tr>
            <th scope='row' style={{ width: '50px' }}>
              {letter}
            </th>
            {temGrafo
              ? aux.map((_, i) => (
                  <td key={_ + i} align='center'>
                    <Label>{this.makeInput(type, letter, i)}</Label>
                  </td>
                ))
              : input}
          </tr>
        );
      }
      return null;
    });
  }

  makeInput = (type, letter, i) => {
    const { grafoGerado } = this.props;
    if (type === 'checkbox') {
      return (
        <Input
          onChange={e => this.handleChangeInput(letter, i, e, type)}
          className='input'
          type={type}
          checked={grafoGerado[letter] ? grafoGerado[letter][i] : false}
        />
      );
    } else {
      let value;
      if (grafoGerado[letter]) {
        value =
          typeof grafoGerado[letter][i] === 'boolean'
            ? ''
            : grafoGerado[letter][i];
      } else {
        value = '';
      }

      return (
        <Input
          onChange={e => this.handleChangeInput(letter, i, e, type)}
          className='input'
          type={type}
          value={value}
        />
      );
    }
  };

  render() {
    const { n, valorado } = this.props;
    const type = valorado ? 'input' : 'checkbox';
    return (
      <Container>
        <Row>
          <Col>
            <Table dark responsive>
              <thead>
                <tr>{this.renderCol(n)}</tr>
              </thead>

              <tbody>{this.renderInput(n, type)}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
