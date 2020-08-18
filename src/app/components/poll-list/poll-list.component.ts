import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  polls: any = [];

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.loadPolls()
  }

  // Get polls list
  loadPolls() {
    return this.userService.getUsers().subscribe((data: {}) => {
      this.polls = data;
    })
  }
}