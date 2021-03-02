import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Measurement {
    Measurement_ID: number, 
    Measurement_Type: string,  
    Amount: number, 
}

@Injectable({
    providedIn: 'root'
})

export class MeasurementCRUDService {

    constructor(private http: HttpClient) {}
    
    getAllMeasurements(): Observable<Measurement[]> {
        return this.http.get<Measurement[]>('http://localhost:3000/measurements')
            .pipe(
                catchError(this.handleError)
            );
    }

    getMeasurement(Measurement_ID): Observable<Measurement> {
        return this.http.get<Measurement>(`http://localhost:3000/measurements/${Measurement_ID}`)
        .pipe(
            catchError(this.handleError)
        );
    }
  
    private handleError(error: HttpErrorResponse) {
        console.error(error.message);
        return throwError('A data error occurred, please try again.');
    }

}