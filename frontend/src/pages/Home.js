import React, { Component } from 'react'
import barBackendService from '../services/bar-service';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    actuaciones: [],
    message: 'Evento Eliminado',
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
    const {actuaciones, success, message} = this.state;
    return (
      <div>
        
        <div className='text-center'>
        <h1>LISTA DE CONCIERTOS</h1>
          <Link to= '/createActuaciones' className=''>
            <button type='button' className='btn btn-info mt-2 mb-3 w-20 font-weight-bold text-white '><h3>Crear Nuevo Evento</h3></button>
          </Link>
        </div>
        { success ? <h4 className="bg-danger p-4 font-weight-bold text-white">{message}</h4> : '' }
        
        {actuaciones.length > 0 ? actuaciones.map((actuacion) => {
          console.log(actuacion)
          // let ordenar = actuacion.date;
          // ordenar.sort((a,b)=>a.getTime()-b.getTime());
          // ordenar.sort(function(a,b){return a.getTime() - b.getTime()});
          
          //   function sortFunction(a,b){  
            //     var dateA = new Date(a.date).getTime();
            //     var dateB = new Date(b.date).getTime();
            //     return dateA > dateB ? 1 : -1;  
            // }; 
            //   var array = [actuacion.date]
            //   var nuevoArray = nuevoArray.concat(array)
            
            // console.log(nuevoArray)
            
            
            let gratis, euros, fecha, day, month;
            if(actuacion.priceActuacion === 0){
              gratis = 'Evento Gratuito!!!!!'
            }
            else{
              gratis = actuacion.priceActuacion
              euros = '€'
            }
            if(actuacion.dateActuacion){
             fecha = actuacion.dateActuacion.split('-')
                 if(fecha[1] === '01'){
                   month = 'enero'
                 }
                 else if(fecha[1] === '02'){
                   month = 'febrero'
                 }
                 else if(fecha[1] === '03'){
                   month = 'marzo'
                 }
                 else if(fecha[1] === '04'){
                   month = 'abril'
                 }
                 else if(fecha[1] === '05'){
                   month = 'mayo'
                 }
                 else if(fecha[1] === '06'){
                   month = 'junio'
                 }
                 else if(fecha[1] === '07'){
                   month = 'julio'
                 }
                 else if(fecha[1] === '08'){
                   month = 'agosto'
                 }
                 else if(fecha[1] === '09'){
                   month = 'septiembre'
                 }
                 else if(fecha[1] === '10'){
                   month = 'octubre'
                 }
                 else if(fecha[1] === '11'){
                   month = 'noviembre'
                 }
                 else {
                   month = 'diciembre'
                 }
            day = fecha[2].substring(0,2)
            }
          if(actuacion.descriptionActuacion){
            return (
                <article key={actuacion._id}>
                  <div className='d-flex'>
                    <img src={actuacion.imageActuacion} alt={actuacion.nameActuacion} className='border cartel col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'/>
                    <div className='d-flex flex-column ml-3 mt-5 mr-3'>
                      <h2>{actuacion.nameActuacion}</h2>
                      <h3>Price: {gratis} {euros}</h3>
                      <h3>Fecha: {day} de {month} de {fecha[0]}</h3>
                      <p className='mr-3'>{actuacion.descriptionActuacion}</p>
                    </div>
                  </div>             
                <button className='btn btn-danger mt-2 ml-5 mb-3 btn-small w-20 font-weight-bold text-white ' onClick={() => {
                  this.handleDeleteClick(actuacion._id)
                }}>X Eliminar Evento</button>
                <Link to= {`/actuaciones/updateActuacion/${actuacion._id}`} className=''>
                  <button type='button' className='btn btn-warning mt-2 ml-3 mb-3 btn-small w-20 font-weight-bold text-white '>Modificar Datos Evento</button>
                </Link>
              </article>
            )
          }
           
          }): <p>loading...</p>}
           { success ? <h4 className="bg-danger p-4 font-weight-bold text-white">{message}</h4> : '' }
      </div>
    )
  }
}

export default Home
