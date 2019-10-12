import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/Services/signalR.service';
import { StateService } from 'src/app/Services/state.service';
import { StateModel, UserModel } from 'src/app/Models/app.model';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['./chat.component.css'],
    providers: [SignalRService, StateService, FirebaseService]
})

export class ChatComponent implements OnInit {
    constructor(
        public signalRService: SignalRService,
        public stateService: StateService,
        public firebaseService: FirebaseService
    ) { }

    currentState: StateModel
    currentUser: UserModel
    message: string

    sendMessage() {
        console.log(this.currentState)
        console.log(this.currentUser)
        this.signalRService.sendChannelMessage(this.currentState.currentChannel, this.currentUser.displayName, this.message)
        this.firebaseService.addMessage(this.currentState.currentChannel, this.currentUser.displayName, this.message)
        this.message = ''
    }

    getState() {
        this.currentUser = this.stateService.getUser(this.currentUser)
        this.currentState = this.stateService.getState(this.currentState)
        // console.log(this.currentState)
    }

    ngOnInit() { 
        this.getState()
        this.firebaseService.readMessages(this.currentState.currentChannel)
    }
}