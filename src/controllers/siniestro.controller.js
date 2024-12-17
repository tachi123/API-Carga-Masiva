import { SiniestroRepository } from '../repository/siniestro.repository.js';
import fs from 'fs/promises';
import __dirname from '../utils.js';
import path from 'path';
import { ejecutarScripts } from './script.controller.js';

const siniestroRepository = new SiniestroRepository();

const cargarSiniestros = async (newSiniestros) => {
  // Iterar sobre el array de siniestros y procesar cada uno individualmente
  for (const siniestro of newSiniestros) {
      try {
        const newSiniestroAgregado = await siniestroRepository.crearOActualizar(siniestro);
        //console.log("Siniestro cargado exitosamente:", newSiniestroAgregado);
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

export const getSiniestros = async (req, res) => {
    try{
        const siniestros = await siniestroRepository.obtenerTodos();
        //transformaciones o modificaciones que quiera hacer sobre los datos
        //res.json(siniestros);
        //console.log(siniestros);
        res.render('siniestros', { siniestros });
    }catch(error){
      console.log(error);
        res.status(500).json( {error: error.message}); //Manejo de errores
    }  
}


export const getSiniestroById = async (req, res) => {
  try {
    const siniestro = await siniestroRepository.obtenerPorId(req.params.id);
    if (!siniestro) {
      return res.status(404).send('Siniestro no encontrado');
    }
    res.render('siniestro', { siniestro });
  } catch (error) {
    console.error('Error fetching siniestro:', error);
    res.status(500).send('Error fetching siniestro');
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const siniestros = await siniestroRepository.obtenerTodos();
    const totalSiniestros = siniestros.length;
    const reportesExitosos = siniestros.filter(siniestro => siniestro.reporte && siniestro.reporte.length === 1 && siniestro.reporte[0].includes('exitosa')).length;
    const reportesFallidos = siniestros.filter(siniestro => !(siniestro.reporte && siniestro.reporte.length === 1 && siniestro.reporte[0].includes('exitosa'))).length;

    res.render('index', {
      totalSiniestros,
      reportesExitosos,
      reportesFallidos
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).send('Error fetching dashboard stats');
  }
};


export const ejecutarScriptsNuevamente = async (req, res) => {
  try {
    const siniestros = await siniestroRepository.obtenerTodos();

    for (const siniestro of siniestros) {
      const resultados = await ejecutarScripts(siniestro);
      //const reporteJSON = JSON.stringify(resultados);
      await siniestroRepository.actualizarReporte(siniestro.id, resultados);
    }

    res.status(200).send('Scripts ejecutados exitosamente');
  } catch (error) {
    console.error('Error executing scripts:', error);
    res.status(500).send('Error executing scripts');
  }
};