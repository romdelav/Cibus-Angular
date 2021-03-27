import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Provider {
    First_Name: string,
    Last_Name: string,
    Job_Description: string,
    Organization_Name: string,
    Address: string,
    City: string,
    State: string, 
    PostCode: string,
    Phone: string
}

@Injectable({
    providedIn: 'root'
})

export class ProviderCRUDService {

    constructor(private http: HttpClient) {}
    
    getProviders(): Observable<Provider[]> {
        return this.http.get<Provider[]>('http://localhost:3000/providers')
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message);
        return throwError('A data error occurred, please try again.');
    }
}