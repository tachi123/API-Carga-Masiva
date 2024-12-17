import * as siniestroDAO from '../models/siniestro.models.js';

const validarSiniestro = (siniestro) => {
    const reporte = [];
    // Validar que el campo tipo_siniestro esté entre 1 y 10
    if (siniestro.tipo_siniestro < 1 || siniestro.tipo_siniestro > 11) {
      reporte.push('El campo tipo_siniestro debe estar entre 1 y 11.</br>');
    }
    // Validar que tenga al menos un involucrado
    if (!siniestro.involucrado || siniestro.involucrado.length === 0) {
      reporte.push('El siniestro debe tener al menos un involucrado.</br>');
    }
    // Agregar más validaciones según sea necesario
  
    // Si no hay errores, agregar un mensaje de éxito
    if (reporte.length === 0) {
      reporte.push('Validación exitosa');
    }
    return reporte;
};

export const obtenerSiniestros = async () => {
    return await siniestroDAO.obtenerSiniestros();
};
    
export const crearSiniestro = async (siniestro) => {
    const reporte = validarSiniestro(siniestro);
    siniestro.reporte = reporte;
    return await siniestroDAO.crearSiniestro(siniestro);
};

