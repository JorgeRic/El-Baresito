import React, { Component } from 'react';
import barBackendService from '../services/bar-service';
import { Redirect } from 'react-router-dom'

class createActuaciones extends Component {
  state = {
    nameActuacion: '',
    dateActuacion: '',
    descriptionActuacion: '',
    priceActuacion: '',
    imageActuacion: '',
    redirect: false,
    typeActuacion: '',
    success: false,
    message: 'Nueva Evento Creado'
  }
  
  handleSubmit = (event) => {
    const { nameActuacion, imageActuacion, priceActuacion, dateActuacion, descriptionActuacion, typeActuacion } = this.state
    event.preventDefault()
    barBackendService.addOneActuacion({
      nameActuacion,
      imageActuacion,
      priceActuacion,
      dateActuacion,
      descriptionActuacion,
      typeActuacion
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
    const { nameActuacion, imageActuacion, priceActuacion, dateActuacion, descriptionActuacion, typeActuacion } = this.state
    const noValido = !nameActuacion || !imageActuacion || !descriptionActuacion || !dateActuacion || !typeActuacion || !priceActuacion
    return noValido
  }

  render() {
    const { nameActuacion, redirect, message, success, imageActuacion, priceActuacion, dateActuacion, descriptionActuacion, typeActuacion } = this.state
   
    return (
      <div className="mt-2 text-center">
        <h2>Crear Nuevo Evento</h2>
        <p>Rellene todos los campos</p>
        { success ? <h4 className="bg-success font-weight-bold text-white p-4">{message}</h4> : '' }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='nameActuacion'>Grupo o Artista</label>
          <div className="mr-5 ml-5">
            <input type='text' className="p-3 border-warning form-control letra mb-1  " id='nameActuacion' name='nameActuacion' value={nameActuacion} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='imageActuacion'>Imagen</label>
          <div className="mr-5 ml-5">
            <input type='text' className=" p-3 border-warning form-control letra mb-1  " id='imageActuacion' name='imageActuacion' value={imageActuacion} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='priceActuacion'>Precio</label>
          <div className="mr-5 ml-5">
            <input type='number' className=" p-3 border-warning form-control letra mb-1  " id='priceActuacion' name='priceActuacion' value={priceActuacion} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='dateActuacion'>Fecha Evento</label>
          <div className="mr-5 ml-5">
            <input type='date' className=" p-3 border-warning form-control letra mb-1  " id='dateActuacion' name='dateActuacion' value={dateActuacion} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='typeActuacion' className="datos-creacion">Tipo de Evento</label>
            <div className="mr-5 ml-5">
              <select id='typeActuacion' className="border-warning form-control letra mb-1  " value={typeActuacion} onChange={this.handleOnChange} name='typeActuacion'>
                <option value=''>Elegir</option>
                <option value='charla'>Charla</option>
                <option value='concierto'>Concierto</option>
                <option value='monologo'>Monologo</option>
              </select>
            </div>
            <div className="d-flex flex-column">
            <label htmlFor='descriptionActuacion' className="datos-creacion">Descripcion Evento</label>
              <div className=" mr-5 ml-5">
                <textarea type='text' className=" p-3 border-warning form-control letra mb-1  " cols="80" rows="3" id='descriptionActuacion' name='descriptionActuacion' value={descriptionActuacion} onChange={this.handleOnChange}/> 
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