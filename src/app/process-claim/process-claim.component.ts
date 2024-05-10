import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClaimResponses } from '../models/claim-responses';
import { ClaimTypes } from '../models/claim-types';
import { Claims } from '../models/claims';
import { ClaimTypesService } from '../services/claim-types.service';
import { ClaimsService } from '../services/claims.service';


@Component({
  selector: 'app-process-claim',
  templateUrl: './process-claim.component.html',
  styleUrl: './process-claim.component.css'
})
export class ProcessClaimComponent implements OnInit {

  claimId: number;
  claim: Claims;
  response: string;
  claimResponse: ClaimResponses;
  processForm: FormGroup;
  claimTypes: ClaimTypes[];
  claimType: string;
  update:string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private claimsService: ClaimsService,
    private claimTypesService: ClaimTypesService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.claimId = +this.route.snapshot.paramMap.get('claimId');

    this.claimsService.getClaimById(this.claimId).subscribe(resposneData => {
      this.claim = resposneData

      this.claimTypesService.getAllClaimTypes().subscribe(resposeData => {
        this.claimTypes = resposeData;
        for (const iterator of this.claimTypes) {
          if (iterator.claimTypesId == this.claim.claimTypeId) {
            this.claimType = iterator.type;
          }
        }
      });

    },error=>alert(error.message));

    this.processForm = new FormGroup({
      'responseDetails': new FormControl(null, [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
      'claimStatus': new FormControl(null)
    });
  }

  approveClaim() {
    this.update = "Approved";
    this.processForm.value.claimStatus = "Approved";
    this.claimsService.processClaimRequest(this.claimId, this.processForm.value).subscribe(responseData => {
      this.claimResponse = responseData;
      setTimeout(()=>{
        this.router.navigate(['/claims'])
      } ,6000)
    });
  }

  rejectClaim() {
    this.update = "Rejected";
    this.processForm.value.claimStatus = "Rejected";
    this.claimsService.processClaimRequest(this.claimId, this.processForm.value).subscribe(responseData => {
      this.claimResponse = responseData;
      setTimeout(()=>{
        this.router.navigate(['/claims'])
      } ,6000)
    });
  }
}
