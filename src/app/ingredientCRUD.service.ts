import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Ingredient {
    Ingredient_ID: number,
    User_ID: number,
    Ingredient_Name: string,
    Protein: number,
    Carbohydrate: number, 
    Sugar: number,
    Fat: number,
    Sodium: number,
    Calories: number,
    Image_URL: string,
    Categories: []
}

@Injectable({
    providedIn: 'root'
})

export class IngredientCRUDService {
    
    constructor(private http: HttpClient) {}

    getAllIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>('http://localhost:3000/ingredients')
            .pipe(
                catchError(this.handleError)
            );
    }

    getIngredient(ingredient_ID: number): Observable<Ingredient> {
        return this.http.get<Ingredient>(`http://localhost:3000/ingredients/${ingredient_ID}`)
            .pipe(
                map((response: Ingredient) => {
                    console.log(response)
                    return response
                }),
                catchError(this.handleError)
            );
    }

    getVegetables(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>('http://localhost:3000/vegetables')
            .pipe(
                catchError(this.handleError)
            );
    }

    getFruits(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>('http://localhost:3000/fruits')
            .pipe(
                catchError(this.handleError)
            );
    }

    getGrains(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>('http://localhost:3000/grains')
            .pipe(
                catchError(this.handleError)
            );
    }

    getMeat(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>('http://localhost:3000/meat')
            .pipe(
                catchError(this.handleError)
            );
    }
    
    createIngredient(newIngredient: Ingredient) {
        return this.http.post(`http://localhost:3000/add-ingredient`, newIngredient)
        .pipe(
            catchError(this.handleError)
        );
    }

    updateIngredient(ingredient_ID: number, ingredient: Ingredient) {
        return this.http.put(`http://localhost:3000/update-ingredient/${ingredient_ID}`, ingredient)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteIngredient(ingredient_ID: number) {
        return this.http.delete(`http://localhost:3000/delete-ingredient/${ingredient_ID}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message);
        return throwError('A data error occurred, please try again.');
    }
}


