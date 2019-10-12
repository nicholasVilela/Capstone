import { UserModel, StateModel } from '../Models/app.model'

export interface State {
    userStore: UserModel
    stateStore: StateModel
} 