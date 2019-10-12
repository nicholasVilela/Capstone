import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../State/app.state';
import { UserModel, StateModel, ChannelModel } from '../Models/app.model';
import { ChangeChannelAction, AddMessageAction, UpdateChannelsAction, SetUserAction } from '../Actions/app.action';

@Injectable()
export class StateService {
    constructor(public store: Store<State>) { }

    public getUser(item: UserModel) {
        this.store
            .select(x => x.userStore)
            .subscribe(x => item = x)
        return item
    }

    public getState(item: StateModel) {
        this.store
            .select(x => x.stateStore)
            .subscribe(x => item = x)
        return item
    }

    public updateCurrentChannel(channel: string) {
        this.store.dispatch(new ChangeChannelAction(channel))
    }

    public updateMessages(user: string, message: string) {
        this.store.dispatch(new AddMessageAction({
            user: user,
            message: message
        }))
    }

    public updateChannelSet(channel: ChannelModel) {
        this.store.dispatch(new UpdateChannelsAction({
            name: channel.name,
            description: channel.description,
            messages: channel.messages,
            adminUID: channel.adminUID,
            adminName: channel.adminName
        }))
    }

    public updateUser(user: UserModel) {
        this.store.dispatch(new SetUserAction({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
        }))
    }
}