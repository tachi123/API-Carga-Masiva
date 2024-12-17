import Siniestro from '../../models/siniestro.model.js';

export class SiniestroDAO {
  async obtenerTodos() {
    return await Siniestro.findAll();
  }

  async obtenerPorId(id) {
    return await Siniestro.findByPk(id);
  }

  async crearOActualizar(siniestroDTO) {
    const [siniestro, created] = await Siniestro.upsert(siniestroDTO, {
      returning: true,
    });
    return siniestro;
  }

  async eliminar(id) {
    return await Siniestro.destroy({ where: { id } });
  }
}