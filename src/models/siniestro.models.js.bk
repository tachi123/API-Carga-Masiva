let siniestros = []; //Array para simular la base de datos

export const obtenerSiniestros = async() => {
    return siniestros;
};

export const crearSiniestro = async (siniestro) => {
    //id: siniestros.length + 1

    // Buscar si ya existe un siniestro con el mismo numero_formulario
    const index = siniestros.findIndex(s => s.numero_formulario === siniestro.numero_formulario);
    if (index !== -1) {
        // Si existe, actualizar el siniestro existente
        const nuevoSiniestro = { ...siniestro, id: index}; // Asignar ID   
        siniestros[index] = nuevoSiniestro;
        //console.log(`Siniestro con numero_formulario ${siniestro.numero_formulario} actualizado.`);
        return nuevoSiniestro;
    } else {
        // Si no existe, agregar un nuevo siniestro
        const nuevoSiniestro = { ...siniestro, id: siniestros.length + 1 }; // Asignar ID   
        siniestros.push(nuevoSiniestro);
        //console.log(`Siniestro con numero_formulario ${siniestro.numero_formulario} agregado.`);
        return nuevoSiniestro;
    }
};

// .. otras funciones DAO 