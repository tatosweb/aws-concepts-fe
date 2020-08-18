import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-poll-confirmation-modal',
  templateUrl: './poll-confirmation-modal.component.html',
  styleUrls: ['./poll-confirmation-modal.component.css']
})
export class PollConfirmationModalComponent  implements OnInit{

  @Input() my_modal_title;
  @Input() my_modal_content;  

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
