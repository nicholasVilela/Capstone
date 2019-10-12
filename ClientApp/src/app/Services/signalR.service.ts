import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { StateService } from './state.service';
import { StateModel, ChannelModel } from '../Models/app.model';
import { Store } from '@ngrx/store';
import { AddMessageAction } from '../Actions/app.action';
import { State } from '../State/app.state';

@Injectable()
export class SignalRService {

    constructor(
        public store: Store<State>,
        public stateService: StateService) {
            this.getState()
            this.createConnection()
            this.addMessageListener()
            this.startConnection()
         }

    public connection: signalR.HubConnection
    currentState: StateModel

    public createConnection() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('/chathub')
            .build()
    } 

    public startConnection() {
        this.connection
            .start()
            .then(() => console.log('Connection Started.'))
            .catch(err => console.log('Problem starting the connection... ' + err))
    }

    getState = () => {
        this.currentState = this.stateService.getState(this.currentState)
    }

    public addMessageListener() {
        this.connection
            .on('ReceiveMessage', (user: string, message: string) => {
                this.stateService.updateMessages(user, message)
            })
    }
    
    public sendChannelMessage(channel: string, user: string, message: string) {
        this.connection
            .invoke('SendChannelMessage', channel, user, message)
            .then(() => console.log('Sent Message'))
            .catch(err => console.log(err))
    }

    public joinChannel(channel: string) {
        this.connection
            .invoke('JoinChannel', channel)
            .then(() => console.log('Joined ' + channel))
            .catch(err => console.log('there was a problem joining the channel... ' + err))
    }

    public leaveChannel(channel: string) {
        this.connection
            .invoke('LeaveChannel', channel)
            .then(() => console.log('Left channel.'))
            .catch(err => console.log(err))
    }
}