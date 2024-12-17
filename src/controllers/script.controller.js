import Script from '../models/script.model.js';

export const obtenerScripts = async (req, res) => {
  try {
    const scripts = await Script.findAll();
    const scriptsPlain = scripts.map(script => script.toJSON())
    console.log(scripts);
    res.render('carga-scripts', { scripts: scriptsPlain });
  } catch (error) {
    console.error('Error fetching scripts:', error);
    res.status(500).send('Error fetching scripts');
  }
};

export const crearScript = async (req, res) => {
  try {
    const { nombre, codigo, mensaje } = req.body;
    const nuevoScript = await Script.create({ nombre, codigo, mensaje });
    res.redirect('/script');
  } catch (error) {
    console.error('Error creating script:', error);
    res.status(500).send('Error creating script');
  }
};

export const ejecutarScripts = async (siniestro) => {
  try {
    const scripts = await Script.findAll();
    const resultados = [];

    for (const script of scripts) {
      try {
        const funcion = new Function('siniestro',  `
          return (function() {
            return ${script.codigo}
          })();
        `);
        const resultado = funcion(siniestro);
        console.log(script.nombre + resultado + script.codigo);
        if (resultado) {
          resultados.push( script.mensaje );
        }
      } catch (error) {
        resultados.push({ script: script.nombre, resultado: false, error: error.message });
      }
    }
    // Si no hay errores, agregar un mensaje de éxito
    if (resultados.length === 0) {
      resultados.push('Validación exitosa');
    }
    console.log(resultados);
    return resultados;
  } catch (error) {
    console.error('Error executing scripts:', error);
    throw new Error('Error executing scripts');
  }
};