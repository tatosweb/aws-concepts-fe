import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollConfirmationModalComponent } from './poll-confirmation-modal.component';

describe('PollConfirmationModalComponent', () => {
  let component: PollConfirmationModalComponent;
  let fixture: ComponentFixture<PollConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
