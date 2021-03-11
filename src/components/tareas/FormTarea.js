import React , { useContext, useState, useEffect } from 'react';
import ProyectoContext from '../../contenxt/proyectos/proyectoContext';
import TareaContext from '../../contenxt/tareas/tareaContext';


const FormTarea = () => {

    // Extraer  si un proyecto esta activo
    const proyectosContext =  useContext(ProyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea } = tareasContext;



    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {

        if(tareaseleccionada !== null){
            // guardamos en el state la tarea seleccionada
            guadarTarea(tareaseleccionada);
        } else {
            guadarTarea({
                nombre:''
            })
        }
      
    }, [tareaseleccionada])



    const [ tarea, guadarTarea] = useState({
        nombre:''
    })

    const { nombre } = tarea;

    // Leer los valores del formulario
    const handleChange = e =>{
        guadarTarea({
            ...tarea,
            [e.target.name]:e.target.value
        })
    }

    // si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual/ proyectoActual toma el posicion 0 del arreglo
    const [proyectoActual] = proyecto;

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }
        
        // Si es edicion o si es nueva tarea
        if(tareaseleccionada === null){
            // terea nueva
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);
        }

        

    
        obtenerTareas(proyectoActual.id);

        // reinicar el form
        guadarTarea({
            nombre:''
        })

    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : "Agregar Tarea"}
                    />
                </div>

            </form>

            {errortarea ? <p className="mensaje error"> El nombre de la tarea es obligatorio </p> :null}
        </div>
        
     );
}
 
export default FormTarea;