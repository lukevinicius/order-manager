export const authKey = 'commandAuthentication'

export interface IUser {
  id: string
  name: string
  username: string
  email: string
  role: string
}

export interface IAuth {
  token: string
  refreshToken: string
  user: IUser
}
