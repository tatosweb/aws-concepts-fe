import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SecurityService } from '../../services/security.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { PollConfirmationModalComponent } from '../../modals/poll-confirmation-modal/poll-confirmation-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

enum CheckBoxType { C, JAVA, NONE };

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  action = this.actRoute.snapshot.params['action'];
  id = this.actRoute.snapshot.params['id'];
  

  @Input() userDetails = { }
  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType;
  submitted = false;
  checked = false;
  pollForm: FormGroup;
  closeResult: string;
  modalOptions:NgbModalOptions;
  preferredLanguageSelected:string;
  invalidAgeValue:boolean;
  isVisible = true;

  constructor(
    public securityService: SecurityService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit() {
    this.isVisible = true;

    this.pollForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.min(18), Validators.max(100),  Validators.required]],
      workPlace: ['', Validators.required],
      profession: ['', Validators.required],
      preferredLanguage: ['', Validators.required]
    });

    if (this.action === 'update'){
      this.isVisible = false;

      console.log ("s");
      this.userService.getUser(this.id).subscribe((data) => {
        this.pollForm.setValue({
          name: data.name,
          lastName: data.lastName,
          age: data.age,
          workPlace: data.workPlace,
          profession:data.profession,
          preferredLanguage : data.preferredLanguage  
       });
      })
    }
  }

  get f() { return this.pollForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.pollForm.invalid) {
      return;
    }

  }

  poll() {
    this.submitted = true;
    // stop here if form is invalid

    

    if (this.pollForm.invalid || this.pollForm.controls.age.value === "") {
      this.invalidAgeValue = true;
      return;
    }

    if (this.action === 'vote'){
      this.pollForm.controls.preferredLanguage.setValue(this.preferredLanguageSelected);
      this.userDetails = this.pollForm.getRawValue();
      this.userService.createUser(this.userDetails).subscribe((data: {}) => {
        const modalRef = this.modalService.open(PollConfirmationModalComponent);
        modalRef.componentInstance.my_modal_title = 'Congratulations!';
        modalRef.componentInstance.my_modal_content = 'You have done the poll sucessfully!';
        this.pollForm.reset();
        this.submitted = false;
        this.checked = false;
        this.securityService.cerrarSesion();
      })
    } else {
      if(window.confirm('Are you sure, you want to update?')){
        this.userService.updateUser(this.id, this.pollForm.getRawValue()).subscribe(data => {
          this.router.navigate(['/poll-list'])
        })
      }
    }
  }
  selectCheckBox(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      this.preferredLanguageSelected = "";
      this.checked = false;
      return;
    }

    
    if (targetType == CheckBoxType.JAVA) {
      this.preferredLanguageSelected = "Java";
    } else {
      this.preferredLanguageSelected = "C#";
    }

    if (this.preferredLanguageSelected !== "") {
      this.checked = true;
    }

    this.currentlyChecked = targetType;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^\d*(?:[.,]\d18|100)?$/;

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

}



