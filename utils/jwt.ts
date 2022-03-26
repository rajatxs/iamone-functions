import { sign, verify } from 'jsonwebtoken'
import { UserAuthTokenPayload, UserAuthTokenResponse } from '../types/common'

/**
 * Register new auth token for user
 */
export const generateUserAuthToken = (payload: UserAuthTokenPayload, subject: string): UserAuthTokenResponse => {
   const issuer = 'iamone.link', audience = payload.id.toString()
   let accessToken: string, refreshToken: string

   payload.admin = false
   accessToken = sign(payload, process.env.USER_ACCESS_TOKEN_SECRET, {
      subject,
      issuer,
      expiresIn: '2d',
      audience,
   })

   refreshToken = sign({ id: payload.id }, process.env.USER_REFRESH_TOKEN_SECRET, {
      subject,
      issuer,
      expiresIn: '1w',
      audience,
   })

   return { accessToken, refreshToken }
}

/**
 * Verify user auth token
 */
export const verifyUserAccessToken = (accessToken: string): UserAuthTokenResponse => {
   return verify(accessToken, process.env.USER_ACCESS_TOKEN_SECRET) as UserAuthTokenResponse
}
