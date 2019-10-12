import { Component, OnInit } from '@angular/core'
import { SignalRService } from 'src/app/Services/signalR.service'
import { StateService } from 'src/app/Services/state.service'
import { FirebaseService } from 'src/app/Services/firebase.service'
import { Store } from '@ngrx/store'
import { UserModel, ChannelModel, StateModel } from 'src/app/Models/app.model'
import { ChangeChannelAction } from 'src/app/Actions/app.action'
import { State } from 'src/app/State/app.state'

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [FirebaseService, SignalRService, StateService]
})

export class SidebarComponent implements OnInit {
    constructor(
        public store: Store<State>,
        public signalRService: SignalRService,
        public firebaseService: FirebaseService,
        public stateService: StateService
    ) { }

    currentState: StateModel
    test
    currentUser: UserModel
    showModal: boolean = false
    
    newChannelName: string
    newChannelDesc: string

    getState() {
        this.currentUser = this.stateService.getUser(this.currentUser)
        this.currentState = this.stateService.getState(this.currentState)
        this.test = this.currentState.channelSet
    }

    flipModal() {
        this.showModal = !this.showModal
    }

    createChannel() {
        const newChannel: ChannelModel = {
            name: this.newChannelName,
            description: this.newChannelDesc,
            messages: [],
            adminUID: this.currentUser.uid,
            adminName: this.currentUser.displayName
        }

        this.firebaseService.addChannel(newChannel)
        this.firebaseService.getAllChannels()
        this.flipModal()
    }

    changeChannel(channel: string) {
        this.signalRService.joinChannel(channel)
        this.store.dispatch(new ChangeChannelAction(channel))
        this.firebaseService.readMessages(channel)
    }

    ngOnInit() {
        this.getState()
        this.signalRService.joinChannel(this.currentState.currentChannel)
     }
}