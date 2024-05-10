import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClaimRequestFormComponent } from './new-claim-request-form.component';

describe('NewClaimRequestFormComponent', () => {
  let component: NewClaimRequestFormComponent;
  let fixture: ComponentFixture<NewClaimRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewClaimRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewClaimRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
