
import React, { Component } from 'react';
import barBackendService from '../services/bar-service';
import { Redirect } from 'react-router-dom';

class UpdateActuacion extends Component {
  state={
    nameActuacion: '',
    dateActuacion: '',
    descriptionActuacion: '',
    priceActuacion: '',
    imageActuacion: '',
    typeActuacion: '',
    redirect: false,
    message: 'Datos Modificados',
    update: false
  }

  componentDidMount(){
    const {id} = this.props.match.params
    barBackendService.getOneActuacion(id)
    .then((response)=>{
      this.setState({
        nameActuacion: response.data.nameActuacion,
        priceActuacion: response.data.priceActuacion,
        typeActuacion: response.data.typeActuacion,
        imageActuacion: response.data.imageActuacion,
        dateActuacion: response.data.dateActuacion,
        descriptionActuacion: response.data.descriptionActuacion
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
    const {nameActuacion, priceActuacion, dateActuacion, typeActuacion, imageActuacion, descriptionActuacion} = this.state;
    const{id} = this.props.match.params
    event.preventDefault()
    barBackendService.updateOneActuacion(id, {
      nameActuacion, 
      priceActuacion, 
      typeActuacion, 
      imageActuacion, 
      dateActuacion,
      descriptionActuacion
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
      update: true
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
    const {redirect, update, imageActuacion, priceActuacion, message, nameActuacion, typeActuacion, descriptionActuacion, dateActuacion } = this.state;
    return (
      <div className='text-center'>
        <h2>Modificar Actuación</h2>
        { update ? <h4 className=" bg-success p-4 font-weight-bold text-white">{message}</h4> : '' }
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
          <button type='submit' className=" btn btn-success btn-small  mt-4 mb-1 col-6 font-weight-bold text-white"><h4>Modificar Datos</h4></button>
          <button className=" btn btn-warning btn-small mt-4 mb-1 col-6 font-weight-bold text-white" onClick={this.goToPreviousPage}><h4>Volver</h4></button>
        </form>
        {redirect ? <Redirect to = '/'/> : null}
      </div>
    )
  }
}
export default UpdateActuacion 