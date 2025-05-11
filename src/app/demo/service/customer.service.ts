import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../api/customer';

@Injectable()
export class CustomerService {

    private apiUrl = 'https://localhost:7025/api';

    constructor(private http: HttpClient) { }

    getCustomersSmall() {
        return this.http.get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    createOrUpdateClient(clientData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.apiUrl}/Credirect/addTier`, clientData, { headers });
    }

    getClientTitles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/client-titles`);
    }
  
    getMaritalStatuses(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/marital-statuses`);
    }
  
    getClientRoles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/client-roles`);
    }
  
    getLegalForms(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/legal-forms`);
    }
  
    getBusinessActivities(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/business-activities`);
    }
  
    getClientOrigins(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/client-origins`);
    }

    getCountries(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/countries`);
    }

    getResidencyStatuses(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/residency-statuses`);
    }

    getIdentities(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/lookups/identities`);
    }

    getClientById(clientId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/Credirect/findClientById/${clientId}`);
    }

    getAllClients(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Credirect/getAllClient`);
    }

    deleteClient(clientId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/Credirect/deleteClient/${clientId}`);
    }
}
