import React, {useCallback, useContext, useEffect} from 'react';
import { Router, Redirect, Route} from 'react-router-dom';

import AuthContext from '../../contenxt/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {
    
    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props =>!autenticado && !cargando
            ? (
                <Redirect to="/" />
                )

            : (
                <Component { ...props} />
            )} />
    );
}
 
export default RutaPrivada;
