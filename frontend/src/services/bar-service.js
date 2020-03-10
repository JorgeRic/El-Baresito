import axios from 'axios';

class BarBackendService {
  constructor(){
    this.barBackend = axios.create({
      baseURL: 'http://localhost:4000/index'
    })
  }

    getAllActuaciones(){
      return this.barBackend.get('/actuaciones')
      .then(response => response)
    }
    getOneActuacion(id){
      return this.barBackend.get(`/actuaciones/${id}/details`)
      .then(response => response)
    }
    addOneActuacion(newActuacion){
      return this.barBackend.post('/actuaciones/new', newActuacion)
      .then(response => response)
    }
    updateOneActuacion(id, updatedActuacion){
      return this.barBackend.put(`/actuaciones/${id}/update`, updatedActuacion)
      .then(response => response)
    }
    deleteOneActuacion(id){
      return this.barBackend.delete(`/actuaciones/${id}/delete`)
      .then(response => response)
    }
  }
const barBackendService = new BarBackendService();
export default barBackendService;
