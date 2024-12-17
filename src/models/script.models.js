let scripts = []; //Array para simular la base de datos

export const obtenerScripts = async() => {
    return scripts;
};

export const crearScript = async (script) => {
    const nuevoScript = { ...script, id: scripts.length + 1 }; // Asignar ID
    scripts.push(nuevoScript);
    return nuevoScript;
};
