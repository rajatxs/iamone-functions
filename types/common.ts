import type { AppMiddleware } from '@rxpm/vsfm'

export interface RouteRecord {
   method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
   path: string,
   handler: AppMiddleware
}

export interface UserAuthTokenPayload {
   id: string,
   email_verified: boolean,
   admin?: boolean,
   name: string,
   email: string
}

export interface UserAuthTokenResponse {
   accessToken: string,
   refreshToken: string
}
