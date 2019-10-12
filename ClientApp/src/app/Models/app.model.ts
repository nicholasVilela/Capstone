export interface MessageModel {
    message: string
    user: string
}

export interface UserModel {
    uid: string
    displayName: string
    email: string
} 

export interface ChannelModel {
    name: string
    description: string
    messages: []
    adminUID: string
    adminName: string
}

export interface StateModel {
    currentChannel: string
    channelSet: ChannelModel[]
    messages: MessageModel[]
}