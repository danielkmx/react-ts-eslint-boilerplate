export type AccountModel = {
  body: {
    data: {
      email: string
      uid: string
    }
  }
  headers: {
    'access-token': string
    client: string
  }

}
