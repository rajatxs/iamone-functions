import { VercelRequest, VercelResponse } from '@vercel/node'
import { compose } from '@rxpm/vsfm'
import { useMethod } from '../../middlewares/common'
import { generateUserAuthToken } from '../../utils/jwt'
import { comparePasswordHash } from '../../utils/crypto'
import { UserAuthTokenResponse } from '../../types/common'
import { Connect } from '../../utils/mongo'
import { findUserByUsernameOrEmail } from '../../services/userService'
import { useSchema } from '../../middlewares/validator'
import { requestAuthTokenSchema } from '../../schema/user.body'

export default compose(
   useMethod('POST'),
   useSchema(requestAuthTokenSchema),

   /**
    * Generates user auth token
    */
   async (request: VercelRequest, response: VercelResponse) => {
      const { email, username, password } = request.body
      let user: any, validPassword: boolean, authTokens: UserAuthTokenResponse

      try {
         await Connect()
         user = await findUserByUsernameOrEmail(username, email)
      } catch (error) {
         return response
            .status(500)
            .json({
               message: "Couldn't get account"
            })
      }

      if (!user) {
         return response
            .status(404)
            .json({
               message: "Account not found"
            })
      }

      validPassword = await comparePasswordHash(password, user.passwordHash)

      if (!validPassword) {
         return response
            .status(400)
            .json({
               message: "Incorrect password"
            })
      }

      authTokens = generateUserAuthToken({
         id: user._id.toString(),
         email: user.email,
         email_verified: user.emailVerified,
         name: user.username,
      }, user.username)
      response.send({
         message: "Token generated",
         result: authTokens
      })
   } 
) 
