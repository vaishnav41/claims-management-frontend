import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClaimTypes } from '../models/claim-types';
import { Claims } from '../models/claims';
import { ClaimTypesService } from '../services/claim-types.service';
import { ClaimsService } from '../services/claims.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrl: './claim-list.component.css'
})
export class ClaimListComponent implements OnInit {
  claims: Claims[];
  claim: Claims;
  claimTypes: ClaimTypes[];

  constructor(private claimsService: ClaimsService, private router: Router, private claimTypesService: ClaimTypesService) {

  }

  ngOnInit() {
    this.fetchClaimTypes();
    this.fetchNewClaims();
  }

  fetchNewClaims() {
    this.claimsService.getAllNewClaims().subscribe(responseData => {
      this.claims = responseData;
    })
  }

  viewClaimById(claimId: number) {
    this.router.navigate(['claims/' + claimId])
  }

  fetchClaimTypes() {
    this.claimTypesService.getAllClaimTypes().subscribe(responseData => {
      this.claimTypes = responseData;
    })
  }

  getType(claimTypeId: number) {
    return this.claimTypes.find(type => claimTypeId === type.claimTypesId);
  }
}