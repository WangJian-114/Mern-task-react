import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../contenxt/proyectos/proyectoContext';
import TareaContext from '../../contenxt/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const ListadoTareas = () => {

    const proyectosContext =  useContext(ProyectoContext);
    const { proyecto , eliminarProyecto} = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const { tareasproyecto } = tareasContext;

    // si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto para ver el progreso</h2>

    // Array destructuring para extraer el proyecto actual/ proyectoActual toma el posicion 0 del arreglo
    const [proyectoActual] = proyecto;
    

  

    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }


    return ( 
        <Fragment>

            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                
                    : 
                    <TransitionGroup>
                        {tareasproyecto.map( tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea 
                                   
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTareas;