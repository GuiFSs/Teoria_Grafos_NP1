import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import imagem from '../../img/logoGrafo.png';

export default class Logo extends React.Component {
  render() {
    return (
      <Navbar color='dark' className='navbar-dark'>
        <NavbarBrand href='#home' color='light'>
          <img
            alt=''
            src={imagem}
            width='50'
            height='50'
            className='d-inline-block align-top'
          />
          <span id='text'>Grafos: Matriz e Lista Adjacentes</span>
        </NavbarBrand>
      </Navbar>
    );
  }
}
