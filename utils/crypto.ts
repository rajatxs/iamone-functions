import { genSalt as bcryptSalt, hash as bcryptHash, compare as bcryptCompare } from 'bcryptjs'

/**
 * Returns hash of given `password`
 * @param password - Password
 */
export async function passwordHash(password: string): Promise<string> {
   const salt = await bcryptSalt(10)
   const hash = await bcryptHash(password, salt)

   return hash
}

/**
 * Check whether `passwordHash` is correct or not
 * @param password Password
 * @param passwordHash Password hash
 */
export async function comparePasswordHash(password: string, passwordHash: string): Promise<boolean> {
   return bcryptCompare(password, passwordHash)
}
