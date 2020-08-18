import { Component, OnInit, Input } from '@angular/core';
import { UserService } from'../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.css']
})

export class PollEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  @Input() pollData: any = {};

  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
  }

  ngOnInit() { 
    this.userService.getUser(this.id).subscribe((data: {}) => {
      this.pollData = data;
    })
  }

  // Update poll data
  updatePoll() {
    if(window.confirm('Are you sure, you want to update?')){
      this.userService.updateUser(this.id, this.pollData).subscribe(data => {
        this.router.navigate(['/poll-list'])
      })
    }
  }

}