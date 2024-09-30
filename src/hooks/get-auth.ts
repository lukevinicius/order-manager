import { cookies } from 'next/headers'
import { authKey, IAuth, IUser } from '@/domain/interfaces/Auth'

interface IResponse {
  token?: string
  refreshToken?: string
  user?: IUser
}

export function getAuth(): IResponse {
  const authCookie = cookies().get(authKey)?.value || '{}'
  const auth: IAuth = JSON.parse(authCookie)

  return {
    token: auth.token,
    refreshToken: auth.refreshToken,
    user: auth.user,
  }
}
