import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Category {
    Category_ID: number,
    Category_Name: string,
}

@Injectable({
    providedIn: 'root'
})

export class CategoryCRUDService {

    constructor(private http: HttpClient) {}
    
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('http://localhost:3000/categories')
            .pipe(
                catchError(this.handleError)
            );
    }
  
    getCategory(category_ID: number): Observable<Category> {
        return this.http.get<Category>(`http://localhost:3000/categories/${category_ID}`)
            .pipe(
                map((response: Category) => {
                    console.log(response)
                    return response
                }),
                catchError(this.handleError)
            );
    }

    createCategory(newCategory: Category) {
        return this.http.post(`http://localhost:3000/add-category`, newCategory)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message);
        return throwError('A data error occurred, please try again.');
    }

}
