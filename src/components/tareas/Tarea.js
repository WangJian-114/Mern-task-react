import React, {useContext} from 'react';
import TareaContext from '../../contenxt/tareas/tareaContext';
import ProyectoContext from '../../contenxt/proyectos/proyectoContext';


const Tarea = ({tarea}) => {


    const tareasContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    const proyectosContext =  useContext(ProyectoContext);
    const { proyecto } = proyectosContext;

    const [ proyectoActual ] = proyecto;

    // funcion que se ejecuta cuando el usuario eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);

    }

    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }


    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);

    } 

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                { tarea.estado 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={()=>cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    :   (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=>cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>seleccionarTarea(tarea)}
                
                >Editar</button>

                <button 
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;