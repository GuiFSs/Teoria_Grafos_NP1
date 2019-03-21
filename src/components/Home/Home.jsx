import React, { Component } from 'react';
import { Container, Input, Label, FormGroup, Row, Col } from 'reactstrap';
import Table from '../Table/table';
import List from '../List/List';
import CTable from '../Converted/CTable';
import CList from '../Converted/CList';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nVertices: 0,
      table: false,
      list: false,
      input: {},
      direcionado: true,
      valorado: false,
      showConvertedTable: false,
      show: false,
      listState: {
        showCList: false,
        values: {},
        rawInputs: {}
      }
    };
    this.setList = this.setList.bind(this);
    this.gerarGrafo = this.gerarGrafo.bind(this);
  }
  setTable = async e => {
    const value = isNaN(e.target.value) ? this.state.nVertices : e.target.value;
    await this.setState({
      nVertices: value
    });

    document.getElementById('select').value !== '...' &&
    document.getElementById('radio').checked !== false
      ? this.setState({ table: true, list: false })
      : this.setState({ table: false });
  };
  async setList() {
    document.getElementById('select').value !== '...' &&
    document.getElementById('radio2').checked !== false
      ? this.setState({ list: true, table: false })
      : this.setState({ list: false });
  }

  sortKeys = obj => {
    const ordered = {};
    Object.keys(obj)
      .sort()
      .map(key => (ordered[key] = obj[key]));
    return ordered;
  };

  formatInput = rawInput => {
    let output = {};
    const nVertices = document.getElementById('select').value;

    if (this.state.valorado) {
      // rawInput = '1 A; 3 B; 2 C'
      const separatedBySemicolon = rawInput.split(';');

      separatedBySemicolon.map(word => {
        word = word.trim();
        const arrChars = word.split(' ');
        if (arrChars.length !== 2) return null;
        output[arrChars[1]] = arrChars[0]; // arrChars[0] = value, arrChars[1] = letter
        return null;
      });

      for (let i = 0; i < nVertices; i++) {
        const letter = String.fromCharCode(65 + i);
        output[letter] = output[letter] || '';
      }

      // output = {B: 1, C: 3}
    } else {
      // rawInput = 'A; B; C'
      rawInput = rawInput.replace(/[0-9]/g, '');
      const separatedBySemicolon = rawInput.split(';');

      separatedBySemicolon.map(letter => {
        letter = letter.trim();
        if (letter.length === 0) return null;
        output[letter] = true; // arrChars[0] = letter
        return null;
      });

      for (let i = 0; i < nVertices; i++) {
        const letter = String.fromCharCode(65 + i);
        output[letter] = output[letter] || false;
      }

      // output A: {B: true, C: true}
    }

    output = this.sortKeys(output);

    return output;
  };

  deleteMissingLetters = rawInput => {
    const possiblesLetters = [];
    const nVertices = document.getElementById('select').value;
    for (let i = 0; i < nVertices; i++) {
      possiblesLetters[i] = String.fromCharCode(65 + i);
    }

    if (this.state.valorado) {
      let separatedBySemicolon = rawInput.split(';');
      separatedBySemicolon = separatedBySemicolon.filter(word => {
        word = word.trim();
        const arrChars = word.split(' ');
        if (arrChars.length !== 2) return null;
        return possiblesLetters.includes(arrChars[1]);
      });

      return separatedBySemicolon.join(';');
    } else {
      rawInput = rawInput.replace(/[0-9]/g, '');
      let separatedBySemicolon = rawInput.split(';');
      separatedBySemicolon = separatedBySemicolon.filter(letter => {
        letter = letter.trim();
        return possiblesLetters.includes(letter);
      });
      return separatedBySemicolon.join(';').trim();
    }
  };

  naoDirecionado = rawInputs => {
    const keys = Object.keys(rawInputs);
    const newRawInputs = { ...rawInputs };

    if (this.state.valorado) {
      keys.map(key => {
        let separatedBySemicolon = rawInputs[key].split(';');
        separatedBySemicolon.filter(word => {
          word = word.trim();
          const arrChars = word.split(' ');
          if (arrChars.length !== 2) return null;
          if (arrChars[1] !== key) {
            newRawInputs[arrChars[1]] += `; ${arrChars[0]} ${key}`;
          }
          return null;
        });
        return null;
      });
    } else {
      keys.map(key => {
        let separatedBySemicolon = rawInputs[key].split(';');
        separatedBySemicolon.filter(letter => {
          letter = letter.trim();
          if (letter.length !== 1) return null;
          if (letter !== key) {
            newRawInputs[letter] += `; ${key}`;
          }
          return null;
        });
        return null;
      });
    }
    return newRawInputs;
  };

  removeDuplicateCharacters = string =>
    string
      .split('')
      .filter(function(item, pos, self) {
        if (item === ';' || !isNaN(item) || item === ' ') {
          return true;
        }
        return self.indexOf(item) === pos;
      })
      .join('')
      .trim();

  cleanInputs = rawInputs => {
    const keys = Object.keys(rawInputs);
    const newRawInputs = { ...rawInputs };

    if (this.state.valorado) {
      keys.map(key => {
        newRawInputs[key] = this.removeDuplicateCharacters(rawInputs[key]);
        let separatedBySemicolon = newRawInputs[key].split(';');
        separatedBySemicolon = separatedBySemicolon.filter(word => {
          word = word.trim();
          const arrChars = word.split(' ');
          return arrChars.length === 2;
        });

        newRawInputs[key] = separatedBySemicolon.join(';').trim();
        return null;
      });
    } else {
      keys.map(key => {
        newRawInputs[key] = this.removeDuplicateCharacters(rawInputs[key]);
        return null;
      });
    }
    return newRawInputs;
  };

  convertToMatrix = rawInputs => {
    const keys = Object.keys(rawInputs);
    const formatedInputs = {};

    keys.map(key => {
      rawInputs[key] = this.deleteMissingLetters(rawInputs[key]);
      return (formatedInputs[key] = this.formatInput(rawInputs[key]));
    });

    this.setState({
      listState: {
        ...this.state.listState,
        showCList: true,
        values: formatedInputs,
        rawInputs: rawInputs
      }
    });
  };

  gerarGrafo(changedLetter, changedIndexL, type = null) {
    let select = document.getElementById('select').value;
    let input = document.getElementsByClassName('input');
    let array = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: []
    };
    const alf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let j = -1;
    for (let i = 0; i < input.length; i++) {
      if (i % select === 0) {
        j++;
      }

      array[alf[j]].push(
        this.state.valorado ? input[i].value : input[i].checked
      );
    }

    const objList = {};
    let letterIndex = 0; // index of l in array below
    console.log(array);
    console.log('l:', changedLetter, 'index:', changedIndexL);

    for (const l in array) {
      if (array[l].length !== 0) {
        if (!this.state.direcionado) {
          for (let i = 0; i < array[l].length; i++) {
            if (array[l][i]) {
              if (!this.state.valorado) {
                array[String.fromCharCode(65 + i)][letterIndex] = true;
              } else {
                // TODO: PEGAR O changedLetter ver se o q mudou é menor e entao fazer com q o maior fique com o msmo valor
                // se o q mudou é menor q o atual array[l][i], entao array[l][i] = o q mudou
                array[String.fromCharCode(65 + i)][letterIndex] = array[l][i];
              }
            }
          }
        }

        objList[l] = array[l];
      }
      letterIndex++;
    }

    if (type !== 'input') {
      if (changedLetter && !isNaN(changedIndexL)) {
        if (objList[changedLetter][changedIndexL]) {
          objList[changedLetter][changedIndexL] = false;

          // pega a letra do index d indexL (o q foi clicado) e dpois pega a letra da row e transforma em numero
          objList[String.fromCharCode(65 + changedIndexL)][
            changedLetter.charCodeAt(0) - 65
          ] = false;
        }
      }
    }

    for (const l in array) {
      if (array[l].length !== 0) {
        objList[l] = array[l];
      }
    }

    this.setState({ input: objList, showConvertedTable: true, show: true });
  }
  handleCheckbox = (e, key) => {
    this.setState({ [key]: e.target.checked });
  };
  render() {
    const { direcionado, valorado, showConvertedTable, input } = this.state;
    return (
      <Container style={{ marginTop: '100px' }}>
        <Row>
          <Col xs={4}>
            <FormGroup>
              <Label>Numero de Vertices</Label>
              <Input
                type='select'
                onChange={this.setTable}
                name='select'
                id='select'
              >
                <option>...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup tag='fieldset'>
          <FormGroup check>
            <Label check>
              <Input
                type='radio'
                id='radio'
                onChange={this.setTable}
                name='radio1'
              />
              Matriz Adjacente
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type='radio'
                id='radio2'
                onChange={this.setList}
                name='radio1'
              />{' '}
              Lista Adjacente
            </Label>
          </FormGroup>
          <FormGroup check style={{ marginLeft: '30px' }}>
            <Label check>
              <Input
                type='checkbox'
                defaultChecked={direcionado}
                onChange={e => this.handleCheckbox(e, 'direcionado')}
              />
              direcionado
            </Label>
          </FormGroup>
          <FormGroup style={{ marginLeft: '50px' }}>
            <Label check>
              <Input
                type='checkbox'
                defaultChecked={valorado}
                onChange={e => this.handleCheckbox(e, 'valorado')}
              />
              valorado
            </Label>
          </FormGroup>
        </FormGroup>
        {this.state.table ? (
          <Table
            grafoGerado={this.state.input}
            gerarGrafo={this.gerarGrafo}
            direcionado={direcionado}
            valorado={valorado}
            n={document.getElementById('select').value}
          />
        ) : (
          ''
        )}

        {this.state.list ? (
          <List
            cleanInputs={this.cleanInputs}
            naoDirecionado={this.naoDirecionado}
            rawInputs={this.state.listState.rawInputs}
            convertToMatrix={this.convertToMatrix}
            grafoGerado={this.state.input}
            gerarGrafo={this.gerarGrafo}
            direcionado={direcionado}
            valorado={valorado}
            n={document.getElementById('select').value}
          />
        ) : (
          ''
        )}

        {this.state.listState.showCList && (
          <CList
            type={this.state.valorado ? 'text' : 'checkbox'}
            nVertices={this.state.nVertices}
            values={this.state.listState.values}
          />
        )}
        {/* {this.state.list && (
          <Button onClick={this.convertToMatrix}>Gerar Grafo</Button>
        )} */}

        {showConvertedTable && (
          <CTable nVertices={this.state.nVertices} inputs={input} />
        )}
        {/* {this.state.show ? <Wrapper inputs={this.state.input} /> : ''} */}
      </Container>
    );
  }
}
