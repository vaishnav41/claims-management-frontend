import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClaimResponses } from '../models/claim-responses';
import { Claims } from '../models/claims';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(private http: HttpClient) {

  }

  private retrieveNewClaimRequestsUrl = 'http://localhost:9090/api/claims';
  private retrieveClaimByIdUrl = 'http://localhost:9090/api/claims';
  private processClaimUrl = 'http://localhost:9090/api/claims';
  private addNewClaimUrl = 'http://localhost:9090/api/claims';

  public getAllNewClaims() {
    return this.http.get<Claims[]>(this.retrieveNewClaimRequestsUrl);
  }

  public getClaimById(claimId: number) {
    return this.http.get<Claims>(this.retrieveClaimByIdUrl + '/' + claimId);
  }

  public createNewClaim(form: FormGroup) {
    return this.http.post<string>(this.addNewClaimUrl, form, { responseType: 'text' as 'json' });
  }

  public processClaimRequest(claimId: number, form: FormGroup) {
    return this.http.put<ClaimResponses>(this.processClaimUrl + '/' + claimId + '/process', form);
  }
}