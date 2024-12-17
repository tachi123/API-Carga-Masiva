export class SiniestroDTO {
    constructor({ id, numero_formulario, hora_carga, tipo_siniestro, data, reporte }) {
      this.id = id;
      this.numero_formulario = numero_formulario;
      this.hora_carga = hora_carga;
      this.tipo_siniestro = tipo_siniestro;
      this.data = data;
      this.reporte = reporte;
    }
  }