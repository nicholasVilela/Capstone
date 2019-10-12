import {Action} from '@ngrx/store'
import {UserModel, MessageModel, ChannelModel, StateModel} from '../Models/app.model'


export class AddMessageAction implements Action {
    type = 'ADD_MESSAGE'
    constructor(public payload: MessageModel) {}
}

export class ClearMessagesAction implements Action {
    type = 'CLEAR_MESSAGES'
    constructor(public payload: []) {}
}

export class ChangeChannelAction implements Action {
    type = 'CHANGE_CHANNEL'
    constructor(public payload: string) {}
}

export class UpdateChannelsAction implements Action {
    type = 'GET_CHANNELS'
    constructor(public payload: ChannelModel) {}
}

export class SetUserAction implements Action {
    type = 'SET_USER'
    constructor(public payload: UserModel) {}
}

export type StateAction = ChangeChannelAction | UpdateChannelsAction | AddMessageAction | ClearMessagesAction