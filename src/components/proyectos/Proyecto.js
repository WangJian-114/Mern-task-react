import React, {useContext} from 'react';
import ProyectoContext from '../../contenxt/proyectos/proyectoContext';
import TareaContext from '../../contenxt/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    const proyectosContext =  useContext(ProyectoContext);
    const { proyectoActual } = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    // Funcion para agregar el proyecto actual
    const seleccionarProyecto = id =>{
        proyectoActual(id);//Fijar un proyecto actual
        obtenerTareas(id);//Buscar tareas
    }



    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    );
}
 
export default Proyecto;