import * as scriptDAO from '../models/script.models.js';

export const obtenerScripts = async () => {
    return await scriptDAO.obtenerScripts();
};
    
export const crearScript = async (script) => {
    return await scriptDAO.crearScript(script);
};