import { Persistence } from '@hookstate/persistence'
import { createState, useState } from '@hookstate/core'
import axios from '../axios'

const initialState = {
  isAuthenticated: false,
  user: {
    id: null,
    email: null,
    fullName: null,
    mobile: null,
    mobileCountryCode: null,
  }
}

const authState = createState(initialState)

/**
 * @TODO  action to request to login endpoint and set global state for user
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */
export const login = async ({ email, password }) => {
  const payload = {
    userId: email,
    password: password,
  }

  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/login', payload)
      const dataUser = {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        mobile: data.mobile,
        mobileCountryCode: data.mobile_country_code,
      }
      authState.merge({
        isAuthenticated: true,
        user: dataUser
      })
      resolve(data)
    } catch (e) {
      debugger
      reject(e)
    }
  })
}

export const logout = () => {
  // set authState to initial state
  authState.set(initialState)
}

export const useAuthState = () => {
  const state = useState(authState)
  state.attach(Persistence('authUser'))
  return state
}