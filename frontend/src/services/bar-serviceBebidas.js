// import axios from 'axios';

// class BebidasBackendService {
//   constructor(){
//     this.bebidasBackend = axios.create({
//       baseURL: 'http://localhost:4000/indexBebidas'
//     })
//   }

//     getAllBebidas(){
//       return this.bebidasBackend.get('/bebidas')
//       .then(response => response)
//     }

//     // getOneActuacion(id){
//     //   return this.barBackend.get(`/actuaciones/${id}/details`)
//     //   .then(response => response)
//     // }
//     addOneBebida(newBebida){
//       return this.bebidasBackend.post('/bebidas/new', newBebida)
//       .then(response => response)
//     }
//     // updateOneActuacion(id, updatedActuacion){
//     //   return this.barBackend.put(`/actuaciones/${id}/update`, updatedActuacion)
//     //   .then(response => response)
//     // }
//     // deleteOneActuacion(id){
//     //   return this.barBackend.delete(`/actuaciones/${id}/delete`)
//     //   .then(response => response)
//     // }
//   }
// const bebidasBackendService = new BebidasBackendService();
// export default bebidasBackendService;