import React, { Component } from 'react';
import barBackendService from '../services/bar-service';
import { Redirect } from 'react-router-dom';

class UpdateActuacion extends Component {
  state={
    name: '',
    date: '',
    description: '',
    price: '',
    image: '',
    type: '',
    redirect: false,
    message: 'Datos Modificados',
    update: false
  }

  componentDidMount(){
    const {id} = this.props.match.params
    // console.log(this.props.match.params)
    barBackendService.getOneActuacion(id)
    .then((response)=>{
      // console.log(response)
      this.setState({
        name: response.data.name,
        price: response.data.price,
        type: response.data.type,
        image: response.data.image,
        description: response.data.description
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
    const {name, price, type, image, description} = this.state;
    const{id} = this.props.match.params
    console.log(id)
    event.preventDefault()
    barBackendService.updateOneActuacion(id, {
      name, 
      price, 
      type, 
      image, 
      description
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
    const {redirect, update, image, price, message, name, type, description, date } = this.state;
    return (
      <div className='text-center'>
        <h2>Modificar Actuación</h2>
        { update ? <h4 className=" bg-success p-4 message">{message}</h4> : '' }
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
          <button type='submit' className=" btn btn-success btn-small  mt-4 mb-1 col-6 font-weight-bold text-white"><h4>Modificar Datos</h4></button>
          <button className=" btn btn-warning btn-small mt-4 mb-1 col-6 font-weight-bold text-white" onClick={this.goToPreviousPage}><h4>Volver</h4></button>
        </form>
        {redirect ? <Redirect to = '/'/> : null}
      </div>
    )
  }
}
export default UpdateActuacion 