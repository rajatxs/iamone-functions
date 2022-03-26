import { Collection, FindOne } from '../utils/mongo'

/**
 * Returns user by either username or email
 */
export function findUserByUsernameOrEmail(username: string, email: string) {
   return FindOne(
      Collection('user_credentials'), 
      {
         $or: [{ username }, { email }]
      }
   )
}
