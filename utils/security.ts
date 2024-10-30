import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function hashCompare(data:string, encripted: string) {
  return await bcrypt.compare(data, encripted)
}