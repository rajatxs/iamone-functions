import { AppMiddleware } from '@rxpm/vsfm'
import { Connect } from '../utils/mongo'

/**
 * Middleware for using mongo connection
 */
export const useMongoConnection: AppMiddleware = async (request, response, next) => {
   try {
      await Connect()
   } catch (error) {
      return response
         .status(500)
         .json({
            message: "Couldn't get data"
         })
   }

   next()
}


export function useMethod(method: string): AppMiddleware {
   return function(request, response, next) {
      if (request.method !== method) {
         return response
            .status(400)
            .send({
               message: "Invalid method"
            })
      }

      next()
   }
}
