import {UserModel, StateModel} from '../Models/app.model'
import { SetUserAction, StateAction} from '../Actions/app.action'

const initialState: StateModel = {
    currentChannel: null,
    channelSet: null,
    messages: null
}

export const stateReducer = (state, action: StateAction) => {
    switch(action.type) {
        case 'CHANGE_CHANNEL':
            return {
                ...state,
                currentChannel: action.payload
            }

        case 'GET_CHANNELS':
            return {
                ...state,
                channelSet: [...state.channelSet, action.payload]
            }

        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }

        case 'CLEAR_MESSAGES':
            return {
                ...state,
                messages: action.payload
            }

        default:
            return state
    }
}

export const userReducer = (state: UserModel, action: SetUserAction) => {
    switch(action.type) {
        case 'SET_USER':
            return action.payload

        default:
            return state
    }
}