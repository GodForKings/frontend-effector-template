import { api } from './api'
import { Api } from './generated/Api'

export const apiClient = new Api()
apiClient.instance = api

export { api } from './api'
export * from './generated/data-contracts'
