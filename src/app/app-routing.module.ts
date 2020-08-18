import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PollComponent} from './components/poll/poll.component'
import {PollListComponent} from './components/poll-list/poll-list.component'
import {PollEditComponent} from './components/poll-edit/poll-edit.component'
import {UserLoginComponent} from './components/user-login/user-login.component'
import { PollConfirmationModalComponent } from './modals/poll-confirmation-modal/poll-confirmation-modal.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-login' },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'poll/:action/:id', component: PollComponent },
  { path: 'poll-list', component: PollListComponent },
  { path: 'poll-edit/:id', component: PollEditComponent },
  { path: 'poll-confirmation-module', component: PollConfirmationModalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
