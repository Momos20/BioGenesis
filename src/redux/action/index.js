// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

export function setUserID(userID) {
    return {
      type: 'SET_USER_ID',
      payload: userID
    };
  }

export const logout = () => {
    return dispatch => {
      // Cambiar el estado de isLoggedIn a false
      dispatch({ type: 'LOGOUT' });
  
      // Borrar la información del usuario de la sesión actual
      localStorage.removeItem('user');
  
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = '/login';
    }
  };