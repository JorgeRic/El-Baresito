import axios from 'axios';

class BarBackendService {
  constructor(){
    this.BarBackendService = axios.create({
      baseURL: 'http://localhost:4000/index'
    })
  }

    getAllActuaciones(){
      return this.BarBackendService.get('/actuaciones')
      .then(response => response)
    }

    getOneActuacion(id){
      return this.BarBackendService.get(`/actuaciones/${id}/details`)
      .then(response => response)
    }
    addOneActuacion(newActuacion){
      return this.BarBackendService.post('/actuaciones/new', newActuacion)
      .then(response => response)
    }
    updateOneActuacion(id, updatedActuacion){
      return this.BarBackendService.put(`/actuaciones/${id}/update`, updatedActuacion)
      .then(response => response)
    }
    deleteOneActuacion(id){
      return this.BarBackendService.delete(`/actuaciones/${id}/delete`)
      .then(response => response)
    }
  }
const barBackendService = new BarBackendService();
export default barBackendService;
