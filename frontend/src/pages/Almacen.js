import React, { Component } from 'react'
import barBackendService from '../services/bar-service';
import { Link } from 'react-router-dom';

class Almacen extends Component {
  state = {
    actuaciones: [],
    message: 'Bebida Eliminada del almacén',
    success: false
  }
  
  componentDidMount(){
    barBackendService.getAllActuaciones()
    .then(response => {
      this.setState({
        actuaciones: response.data.listaActuaciones
      })
    })
  }
  onSuccessfulSubmit = ()=> {
    this.setState({
      success: true
    }, () => {
      setTimeout(()=>{
        this.setState({
          success: false
        })
      }, 3000)
    })
  }
  handleDeleteClick = (id) => {
    const {actuaciones} = this.state
    barBackendService.deleteOneActuacion(id)
    .then(() => {
      this.onSuccessfulSubmit()
      const filteredActuaciones = actuaciones.filter((actuacion)=> {
        return actuacion._id !== id
      })
      this.setState({
        actuaciones : filteredActuaciones
      })
    })
  }
  render() {
    const { actuaciones, success, message } = this.state;
    console.log(actuaciones)
    return (
      <div className='text-center'>
       <h1>Almacén</h1>
       { success ? <h4 className="bg-danger p-4 font-weight-bold text-white">{message}</h4> : '' }
      <Link to= '/almacen/createBebidas' className=''>
        <button type='button' className='btn btn-info mt-2 mb-3 w-20 font-weight-bold text-white '><h3>Crear Nueva Bebida</h3></button>
      </Link> 
       {actuaciones.length > 0 ? actuaciones.map((actuacion) => {
         let precio = actuacion.priceBebida
         let stock = actuacion.stockBebida
         console.log(stock)
         let tipo = actuacion.typeBebida
         console.log(tipo)
         const precioTotal = precio*stock
         let colorStock;
         if(tipo === 'cerveza' || tipo === 'refresco'){
            if(stock >= 100){
              colorStock = 'bg-success'
            }
            else if(stock > 50 && stock < 100){
              colorStock = 'bg-warning'
            }
            else{
              colorStock = 'bg-danger'
            }
          }
          else{
            if(stock >= 10){
              colorStock = 'bg-success'
            }
            else if(stock > 5 && stock < 10){
              colorStock = 'bg-warning'
            }
            else{
              colorStock = 'bg-danger'
            }
          }
         
          // console.log(colorStock)

          if(actuacion.typeBebida){
         return(
            <article key={actuacion._id} className='mb-3'>
              <div className='d-flex'>
                <img src={actuacion.imageBebida} alt={actuacion.nameBebida} className='border h-50 col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'/>
                <div className='d-flex flex-column ml-3 mt-1 mr-3 col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                  <h2>{actuacion.nameBebida}</h2>
                  <h3>Tipo de Bebida: <mark>{actuacion.typeBebida}</mark></h3>
                  <h3>Precio Unidad: {actuacion.priceBebida} €  / Precio Total: {precioTotal} €</h3>
                  <h3>Stock en Almacén: <mark className={colorStock}>{actuacion.stockBebida}</mark> udads.</h3>
                  <button type='button' className='btn btn-danger mt-2 ml-5 mb-3 btn-small w-20 font-weight-bold text-white ' onClick={() => {
                    this.handleDeleteClick(actuacion._id)
                  }}>X Eliminar Bebida del Almacén</button>
                  <Link to= {`/almacen/updateBebida/${actuacion._id}`} className=''>
                      <button type='button' className='btn btn-warning mt-2 ml-3 mb-3 btn-small w-20 font-weight-bold text-white '>Modificar Datos Bebida</button>
                  </Link>
                </div>
              </div>             
            </article>
         )
        }
         }): <p>Loading ....</p>}
      { success ? <h4 className="bg-danger p-4 font-weight-bold text-white">{message}</h4> : '' }
     </div> 

    )
  }
}

export default Almacen
