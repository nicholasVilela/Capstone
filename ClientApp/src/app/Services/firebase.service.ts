import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Store } from '@ngrx/store'
import { StateModel, UserModel, MessageModel, ChannelModel } from '../Models/app.model'
import { firebaseConfig } from '../Config/firebase.config'
import * as firebase from 'firebase'
import { ClearMessagesAction, AddMessageAction, SetUserAction, UpdateChannelsAction } from '../Actions/app.action'
import { State } from '../State/app.state'
import { StateService } from './state.service'

@Injectable()
export class FirebaseService {
    constructor(
        public afAuth: AngularFireAuth,
        public store: Store<State>,
        public stateService: StateService
    ) { 
        this.startFirebase()
        this.getAllChannels()
        this.readMessages('General')
    }

    database = firebase.database()

    public startFirebase() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        } 
    }

    public addUser(user: UserModel) {
        console.log('Trying to add User')
        const userKey = this.database
            .ref()
            .child('Users')
            .push()
            .key

        const updates = {}
        updates[`Users/${userKey}`] = user

        this.database.ref().update(updates)
        console.log('SUCCESS')
    }
    
    public addMessage(channel: string, user: string, message: string) {
        const messageData: MessageModel = {
            user: user,
            message: message
        }

        const messageKey  = this.database.ref().child(channel).push().key
        const updates = {}
        updates[`Channels/${channel}/messages/${messageKey}`] = messageData

        this.database.ref().update(updates)
    }

    public addChannel = (channel: ChannelModel) => {
        const channelData = {
            name: channel.name,
            description: channel.description,
            messages: [0],
            adminUID: channel.adminUID,
            adminName: channel.adminName
        }

        const updates = {}
        updates[`Channels/${channelData.name}`] = channelData

        this.database.ref().update(updates)
    }

    public getAllChannels = () => {
        this.database
            .ref('Channels')
            .once('value')
            .then(snap => {
                snap.forEach(x => {
                    this.stateService.updateChannelSet({
                        name: x.val().name,
                        description: x.val().description,
                        messages: x.val().messages,
                        adminUID: x.val().adminUID,
                        adminName: x.val().adminName
                    })
                })
            })
    }

    public readMessages = (channel: string) => {
        this.store.dispatch(new ClearMessagesAction([]))
        this.database
            .ref(`Channels/${channel}/messages`)
            .once('value')
            .then(snap => {
                snap.forEach(x => {
                    this.stateService.updateMessages(
                        x.val().user,
                        x.val().message
                    )
                })
            })
    }

    public googleLogin = () => {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider()
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    const userData = {
                        uid: res.user.uid,
                        displayName: res.user.displayName,
                        email: res.user.email
                    }
                    resolve(res)
                    this.stateService.updateUser(userData)
                    this.addUser(userData)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}