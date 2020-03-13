import React, { Component } from 'react';
import barBackendService from '../services/bar-service';
import { Redirect } from 'react-router-dom';

class UpdateBebida extends Component {
  state={
    nameBebida: '',
    priceBebida: '',
    imageBebida: '',
    typeBebida: '',
    stockBebida: '',
    success: false,
    redirect: false,
    message: 'Datos Modificados'
  }

  componentDidMount(){
    const {id} = this.props.match.params
    barBackendService.getOneActuacion(id)
    .then((response)=>{
      this.setState({
        nameBebida: response.data.nameBebida,
        priceBebida: response.data.priceBebida,
        typeBebida: response.data.typeBebida,
        imageBebida: response.data.imageBebida,
        stockBebida: response.data.stockBebida
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleUpdate = (event)=> {
    const {name,value} = event.target;
    this.setState({
      [name]: value,
    })  
  }

  handleSubmit = (event) => {
    const{id} = this.props.match.params
    const {nameBebida, priceBebida, typeBebida, imageBebida, stockBebida} = this.state;
    event.preventDefault()
    barBackendService.updateOneActuacion(id, {
      nameBebida, 
      priceBebida, 
      typeBebida, 
      imageBebida, 
      stockBebida
    })
    .then(() => {
      this.onSuccessfulSubmit()
    })
    .catch(error => console.log(error))
  }

  handleOnChange = (event)=> {
    const {name,value} = event.target;
    this.setState({
      [name]: value,

    });
  }

  onSuccessfulSubmit = ()=> {
    this.setState({
      success: true
    }, () => {
      setTimeout(()=>{
        this.setState({
          redirect: true
        })
      }, 2500)
    })
  }

  goToPreviousPage = () => {
    this.props.history.goBack()
  }
 
  render() {
    const { nameBebida, priceBebida, imageBebida, typeBebida, stockBebida, success, message, redirect } = this.state;
    return (
      <div className='text-center'>
        <h2>Modificar Datos Bebidas</h2>
        { success ? <h4 className=" bg-success p-4 font-weight-bold text-white">{message}</h4> : '' }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='typeBebida' className="datos-creacion">Tipo de Bebida</label>
            <div className="mr-5 ml-5">
              <select id='typeBebida' className="border-warning form-control letra mb-1" name='typeBebida' value={typeBebida} onChange={this.handleOnChange}>
                <option value=''>Elegir</option>
                <option value='cerveza'>Cerveza</option>
                <option value='ron'>Ron</option>
                <option value='ginebra'>Ginebra</option>
                <option value='whisky'>Whisky</option>
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
          <button type='submit' className=" btn btn-success btn-small  mt-4 mb-1 col-6 font-weight-bold text-white"><h4>Modificar Datos</h4></button>
          <button className=" btn btn-warning btn-small mt-4 mb-1 col-6 font-weight-bold text-white" onClick={this.goToPreviousPage}><h4>Volver</h4></button>
        </form>
        {redirect ? <Redirect to = '/almacen'/> : null}
      </div>
    )
  }
}
export default UpdateBebida