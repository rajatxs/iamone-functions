import { AppMiddleware } from '@rxpm/vsfm'
import { Schema, ValidationError } from 'joi'

/**
 * Request body validator middleware
 * @param schema Joi Schema
 */
export const useSchema = (schema: Schema): AppMiddleware => {
   return (request, response, next) => {
      let error: ValidationError, value: any

      try {
         const result = schema.validate(request.body, {
            convert: true,
            allowUnknown: false,
            debug: false,
         })

         error = result.error
         value = result.value
      } catch (error) {
         return response
            .status(500)
            .json({
               message: "Couldn't verify your request"
            })
      }

      if (error) {
         return response
            .status(400)
            .json({
               message: error.message || 'Invalid request data'
            })
      }

      request.body = value
      next()
   }
}
