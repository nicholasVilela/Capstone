import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './Components/Main/Chat/chat.component'
import { SignalRService } from './Services/signalR.service';
import { StateService } from './Services/state.service';
import { FirebaseService } from './Services/firebase.service';
import { firebaseConfig } from './Config/firebase.config';

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { StoreModule } from '@ngrx/store';
import { userReducer, stateReducer } from './Reducers/app.reducers';
import { SidebarComponent } from './Components/Main/Sidebar/sidebar.component';
import { MainComponent } from './Components/Main/main.component';
import { LoginComponent } from './Components/Login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChatComponent,
    LoginComponent,
    SidebarComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    AngularFireAuthModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full'},
      { path: 'chat', component: MainComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full'}
    ]),
    StoreModule.forRoot({
      userStore: userReducer,
      stateStore: stateReducer
    })
  ],
  providers: [SignalRService, StateService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
