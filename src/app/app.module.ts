import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PollComponent } from './components/poll/poll.component'
import { PollListComponent } from './components/poll-list/poll-list.component'
import { PollEditComponent } from './components/poll-edit/poll-edit.component'
import { UserLoginComponent } from './components/user-login/user-login.component';
import { PollConfirmationModalComponent } from './modals/poll-confirmation-modal/poll-confirmation-modal.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
 
  declarations: [
    AppComponent,
    PollComponent,
    PollListComponent,
    PollEditComponent,
    UserLoginComponent,
    PollConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
