import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTOS,
         PROYECTO_ERROR,
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO
         } from '../../types';

import clienteAxios from '../../config/axio';


const ProyectoState = props => {



    const inicialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null, // proyecto seleccionado
        mensaje: null
    }

    // Dispatch para ejecutar las acciones
    // inicialState esta guardado en el state
    // por eso cuando accedemos el valor de formulario usamos state.formulario
    const [state, dispatch] = useReducer(proyectoReducer, inicialState);

    // Serie de funciones para el CRUD 

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos
    const obtenerProyectos =async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }

    const agregarProyecto = async proyecto => {
        
        try {   
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }

    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO,
        })
    }


    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })

    }


    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos:state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                // Funciones
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto

            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )



}

export default ProyectoState;