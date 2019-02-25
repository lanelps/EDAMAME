import request from 'superagent'
import {setToken} from '../utils/tokens'

export const registerPending = _ => {
  return {
    type: 'REGISTER_PENDING'
  }
}

export const registerSuccess = _ => {
  return {
    type: 'REGISTER_SUCCESS'
  }
}

export const registerError = error => {
  return {
    type: 'REGISTER_ERROR',
    error
  }
}

export const register = (name, surname, password) => dispatch => {
  dispatch(registerPending())
  return request
    .get('/api/v1/auth/register')
    .send({name, surname, password})
    .then(res => {
      setToken(res.body.token)
      dispatch(registerSuccess())
    })
    .catch(err => dispatch(registerError(err.response.body.error)))
}

export const logout = _ => {
  return {
    type: 'LOGOUT'
  }
}
