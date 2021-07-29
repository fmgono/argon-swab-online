import { createState } from '@hookstate/core'

const store = createState({
  user: {
    id: null,
    email: null,
    fullName: null,
    mobile: null,
    mobileCountryCode: null,
  }
})

export default store