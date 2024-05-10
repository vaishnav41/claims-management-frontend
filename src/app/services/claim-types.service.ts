import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClaimTypes } from '../models/claim-types';

@Injectable({
  providedIn: 'root'
})
export class ClaimTypesService {
  constructor(private http: HttpClient) {
  }

  private retrieveAllClaimTypesUrl = 'http://localhost:9090/api/claims/types';

  public getAllClaimTypes() {
    return this.http.get<ClaimTypes[]>(this.retrieveAllClaimTypesUrl);
  }
}