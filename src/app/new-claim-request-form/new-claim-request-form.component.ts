import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core'
import { ClaimTypes } from '../models/claim-types';
import { Claims } from '../models/claims';
import { ClaimTypesService } from '../services/claim-types.service';
import { ClaimsService } from '../services/claims.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-new-claim-request-form',
  templateUrl: './new-claim-request-form.component.html',
  styleUrl: './new-claim-request-form.component.css'
})
export class NewClaimRequestFormComponent implements OnInit {

  claimTypes: ClaimTypes[] = [];
  types: ClaimTypes[] = [];
  claimForm: FormGroup;
  result: string;
  errorMessage: string;
  eighteenYearsAgo: Date;

  constructor(private http: HttpClient, private claimTypesService: ClaimTypesService, private claimsService: ClaimsService) {
  }

  ngOnInit() {
    this.eighteenYearsAgo = new Date();
    this.eighteenYearsAgo.setFullYear(this.eighteenYearsAgo.getFullYear() - 18);
    this.fetchClaimTypes();
    this.claimForm = new FormGroup({
      'policyId': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(9999)]),
      'userName': new FormControl(null, [Validators.required]),
      'subscriptionId': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(9999)]),
      'claimTypeId': new FormControl(null, [Validators.required]),
      'claimSummary': new FormControl(null, [Validators.required]),
      'claimDetails': new FormControl(null, [Validators.required]),
      'claimantFullName': new FormControl(null,[Validators.pattern("^[a-zA-Z ]*$")]),
      'claimantDateOfBirth': new FormControl(null),
      'claimantAddress': new FormControl(null),
      'claimantIDProofType': new FormControl(null),
      'claimantIDProofNumber': new FormControl(null),
      'raisedByPolicyHolder': new FormControl(null),
    });

    this.claimForm.get('claimTypeId').valueChanges.subscribe(value => {
      if (value == 2) {
        this.claimForm.get('raisedByPolicyHolder').setValue(false);
        this.claimForm.get('raisedByPolicyHolder').disable();
        this.claimForm.get('claimantFullName').setValidators([Validators.required,Validators.pattern("^[a-zA-Z ]*$")]);
        this.claimForm.get('claimantDateOfBirth').setValidators([Validators.required]);
        this.claimForm.get('claimantAddress').setValidators([Validators.required]);
        this.claimForm.get('claimantIDProofType').setValidators([Validators.required]);
        this.claimForm.get('claimantIDProofNumber').setValidators([Validators.required]);
      } else {
        this.claimForm.get('raisedByPolicyHolder').enable();
        this.claimForm.get('claimantFullName').clearValidators();
        this.claimForm.get('claimantDateOfBirth').clearValidators();
        this.claimForm.get('claimantAddress').clearValidators();
        this.claimForm.get('claimantIDProofType').clearValidators();
        this.claimForm.get('claimantIDProofNumber').clearValidators();
      }
      this.claimForm.get('claimantFullName').updateValueAndValidity();
      this.claimForm.get('claimantDateOfBirth').updateValueAndValidity();
      this.claimForm.get('claimantAddress').updateValueAndValidity();
      this.claimForm.get('claimantIDProofType').updateValueAndValidity();
      this.claimForm.get('claimantIDProofNumber').updateValueAndValidity();
    });

  }

  fetchClaimTypes() {
    this.claimTypesService.getAllClaimTypes().subscribe(responseData => {
      this.types = responseData;
    });
  }

  onSubmit() {
    this.claimsService.createNewClaim(this.claimForm.value).subscribe({
      next: responseData => {
        this.result = responseData;
        setTimeout(() => {
          this.result = null;
        }, 4000);
      }, error: err => {
        this.errorMessage = err.error;
        setTimeout(() => {
          this.errorMessage = null;
        }, 4000);
      }
    });
    this.claimForm.reset();
  }

}
