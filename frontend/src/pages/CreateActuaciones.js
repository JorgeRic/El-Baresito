import React, { Component } from 'react';
import barBackendService from '../services/bar-service';
import { Redirect } from 'react-router-dom'

class createActuaciones extends Component {
  state = {
    name: '',
    date: '',
    description: '',
    price: '',
    image: '',
    redirect: false,
    type: '',
    success: false,
    message: 'Nueva Evento Creado'
  }
  
  handleSubmit = (event) => {
    const { name, image, price, date, description, type } = this.state
    event.preventDefault()
    barBackendService.addOneActuacion({
      name,
      image,
      price,
      date,
      description,
      type
    })
    .then(() => {
      this.setState({
        success: true
      }, () => {
        setTimeout(()=>{
          this.setState({
            redirect: true
          })
        }, 3000)
      })
    })
    .catch (error => {console.log(error)})
  };
 
  
  handleOnChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
    window.state = this.state;
  }

  validarForm = () => {
    const { name, image, price, date, description, type } = this.state
    const noValido = !name || !image || !description || !date || !type || !price
    return noValido
  }

  render() {
    const { name, redirect, message, success, image, price, date, description, type } = this.state
   
    return (
      <div className="mt-2 text-center">
        <h2>Crear Nuevo Evento</h2>
        <p>Rellene todos los campos</p>
        { success ? <h4 className="bg-info font-weight-bold text-white p-4">{message}</h4> : '' }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Grupo o Artista</label>
          <div className="mr-5 ml-5">
            <input type='text' className="p-3 border-warning form-control letra mb-1  " id='name' name='name' value={name} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='image'>Imagen</label>
          <div className="mr-5 ml-5">
            <input type='text' className=" p-3 border-warning form-control letra mb-1  " id='image' name='image' value={image} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='price'>Precio</label>
          <div className="mr-5 ml-5">
            <input type='number' className=" p-3 border-warning form-control letra mb-1  " id='price' name='price' value={price} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='date'>Fecha Evento</label>
          <div className="mr-5 ml-5">
            <input type='date' className=" p-3 border-warning form-control letra mb-1  " id='date' name='date' value={date} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='type' className="datos-creacion">Tipo de Evento</label>
            <div className="mr-5 ml-5">
              <select id='type' className="border-warning form-control letra mb-1  " value={type} onChange={this.handleOnChange} name='type'>
                <option value=''>Elegir</option>
                <option value='charla'>Charla</option>
                <option value='concierto'>Concierto</option>
                <option value='monologo'>Monologo</option>
              </select>
            </div>
            <div className="d-flex flex-column">
            <label htmlFor='description' className="datos-creacion">Descripcion Evento</label>
              <div className=" mr-5 ml-5">
                <textarea type='text' className=" p-3 border-warning form-control letra mb-1  " cols="80" rows="3" id='description' name='description' value={description} onChange={this.handleOnChange}/> 
              </div>
          </div>
          <button type='submit' className="btn btn-info mt-2 mb-3 btn-small w-20 font-weight-bold text-white" onClick={this.goToPreviousPage} disabled={this.validarForm()}>Añadir Evento</button>
        </form>
        {redirect ? <Redirect to = '/'/> : null}
      </div>
    )
  }
}
export default createActuaciones 