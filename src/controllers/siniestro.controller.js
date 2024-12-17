import * as siniestroService from '../services/siniestro.service.js'; 
import fs from 'fs/promises';
import __dirname from '../utils.js';
import path from 'path';

const cargarSiniestros = async (newSiniestros) => {
  // Iterar sobre el array de siniestros y procesar cada uno individualmente
  for (const siniestro of newSiniestros) {
      try {
        const newSiniestroAgregado = await siniestroService.crearSiniestro(siniestro);
      } catch (error) {
        console.error('Error al cargar siniestro:', error);
      }
  }
}

export const uploadSiniestros = async (req, res) => {
    try {
      const fileContent = await fs.readFile(req.file.path, 'utf-8');
      const newSiniestros = JSON.parse(fileContent);
      cargarSiniestros(newSiniestros);
      console.log("cargado exitosamente");
      res.redirect('/');
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing file');
    }
}

export const inicializarSiniestros = async () => {
  try {
    const filePath = path.join(__dirname, 'data', 'siniestros.json'); // Usa __dirname para obtener la ruta absoluta
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const siniestros = JSON.parse(fileContent);
    cargarSiniestros(siniestros);
  } catch (error) {
    console.error('Error al cargar siniestros:', error);
  }
};

export const obtenerSiniestros = async (req, res) => {
    try{
        const siniestros = await siniestroService.obtenerSiniestros();
        //transformaciones o modificaciones que quiera hacer sobre los datos
        //res.json(siniestros);
        console.log(siniestros);
        res.render('siniestros', { siniestros });
    }catch(error){
      console.log(error);
        res.status(500).json( {error: error.message}); //Manejo de errores
    }  
}





