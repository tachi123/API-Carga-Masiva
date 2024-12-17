import { SiniestroDAO } from './dao/siniestro.dao.js';
import { SiniestroDTO } from './dto/siniestro.dto.js';
import { validarSiniestro } from '../services/siniestro.service.js';
import { ejecutarScripts } from '../controllers/script.controller.js';

export class SiniestroRepository {
  constructor() {
    this.siniestroDAO = new SiniestroDAO();
  }

  async obtenerTodos() {
    const siniestros = await this.siniestroDAO.obtenerTodos();
    return siniestros.map(siniestro => new SiniestroDTO(siniestro));
  }

  async obtenerPorId(id) {
    const siniestro = await this.siniestroDAO.obtenerPorId(id);
    return new SiniestroDTO(siniestro);
  }

  async crearOActualizar(siniestroData) {
    // Separar los atributos específicos y el resto en el campo `data`
    const { id, numero_formulario, tipo_siniestro, ...rest } = siniestroData;
    const data = rest;
    const reporte = await ejecutarScripts(siniestroData);
    console.log(reporte);
    const siniestroDTO = new SiniestroDTO({
      id,
      numero_formulario,
      hora_carga: new Date(),
      tipo_siniestro,
      reporte: reporte,
      data
    });
    const siniestro = await this.siniestroDAO.crearOActualizar(siniestroDTO);
    return new SiniestroDTO(siniestro);
  }

  async actualizarReporte(id, reporte) {
    const siniestro = await this.siniestroDAO.obtenerPorId(id);
    if (!siniestro) {
      throw new Error('Siniestro no encontrado');
    }
    siniestro.reporte = reporte;
    await siniestro.save();
  }

  async eliminar(id) {
    return await this.siniestroDAO.eliminar(id);
  }
  
}