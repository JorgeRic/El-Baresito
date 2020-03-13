import React, { Component } from 'react'
import barBackendService from '../services/bar-service';
import { Redirect } from 'react-router-dom'

class CreateConsumiciones extends Component {
  state = {
    nameBebida: '',
    priceBebida: '',
    imageBebida: '',
    typeBebida: '',
    stockBebida: '',
    success: false,
    message: 'Nueva Bebida Añadida al Almacén',
    redirect: false
  }
  handleSubmit= (event) => {
    const { nameBebida, priceBebida, imageBebida, typeBebida, stockBebida } = this.state;
    event.preventDefault();
    barBackendService.addOneActuacion({
      nameBebida,
      priceBebida,
      imageBebida,
      typeBebida,
      stockBebida
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
      const { nameBebida, priceBebida, imageBebida, typeBebida } = this.state
      const noValido = !nameBebida || !imageBebida || !typeBebida || !priceBebida
      return noValido
    }

  render() {
    const { nameBebida, priceBebida, imageBebida, typeBebida, stockBebida, success, message, redirect } = this.state;
    
    return (
      <div className="mt-2 text-center">
        <h2>Crear Nueva Bebida en Almacén</h2>
        <p>Rellene todos los campos</p>
        { success ? <h4 className="bg-success font-weight-bold text-white p-4">{message}</h4> : '' }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='typeBebida' className="datos-creacion">Tipo de Bebida</label>
            <div className="mr-5 ml-5">
              <select id='typeBebida' className="border-warning form-control letra mb-1  " value={typeBebida} onChange={this.handleOnChange} name='typeBebida'>
                <option value=''>Elegir</option>
                <option value='cerveza'>Cerveza</option>
                <option value='ron'>Ron</option>
                <option value='ginebra'>Ginebra</option>
                <option value='Whisky'>Whisky</option>
                <option value='refresco'>Refresco</option>
              </select>
            </div>
          <label htmlFor='nameBebida'>Nombre</label>
          <div className="mr-5 ml-5">
            <input type='text' className="p-3 border-warning form-control letra mb-1 " id='nameBebida' name='nameBebida' value={nameBebida} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='imageBebida'>Imagen</label>
          <div className="mr-5 ml-5">
            <input type='text' className=" p-3 border-warning form-control letra mb-1  " id='imageBebida' name='imageBebida' value={imageBebida} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='priceBebida'>Precio Compra</label>
          <div className="mr-5 ml-5">
            <input type='number' className="p-3 border-warning form-control letra mb-1  " id='priceBebida' name='priceBebida' value={priceBebida} onChange={this.handleOnChange}></input>
          </div>
          <label htmlFor='stockBebida'>Stock en Almacen</label>
          <div className="mr-5 ml-5">
            <input type='number' className=" p-3 border-warning form-control letra mb-1  " id='stockBebida' name='stockBebida' value={stockBebida} onChange={this.handleOnChange}></input>
          </div>
          <button type='submit' className="btn btn-info mt-2 mb-3 btn-small w-20 font-weight-bold text-white" onClick={this.goToPreviousPage} disabled={this.validarForm()}>Añadir Bebida</button>
        </form>
        {redirect ? <Redirect to = '/almacen'/> : null}
      </div>
    )
  }
}
export default CreateConsumiciones
