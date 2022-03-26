import { object } from 'joi'
import { username, email, password } from '../utils/regex'

export const requestAuthTokenSchema = object({
   username: username.optional(),
   email: email.optional(),
   password: password.required()
})
