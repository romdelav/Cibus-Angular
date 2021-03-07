import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Recipe {
    Recipe_ID: number,
    User_ID: number,
    Recipe_Name: string,
    Servings: number,
    Cooking_Instructions: string,
    Description: string,
    Image_URL: string,
    MeasurementIngredient: [],
    Categories: []
}

@Injectable({
    providedIn: 'root'
})

export class RecipeCRUDService {

    constructor(private http: HttpClient) {}
    
    getAllRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>('http://localhost:3000/recipes')
            .pipe(
                catchError(this.handleError)
            );
    }
  
    getRecipe(recipe_ID: number): Observable<Recipe> {
        return this.http.get<Recipe>(`http://localhost:3000/recipes/${recipe_ID}`)
            .pipe(
                map((response: Recipe) => {
                    console.log(response)
                    return response
                }),
                catchError(this.handleError)
            );
    }

    createRecipe(newRecipe: Recipe) {
        return this.http.post(`http://localhost:3000/add-recipe`, newRecipe)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateRecipe(recipe_ID: number, recipe: Recipe) {
        return this.http.put(`http://localhost:3000/update-recipe/${recipe_ID}`, recipe)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteRecipe(recipe_ID: number) {
        return this.http.delete(`http://localhost:3000/recipes/${recipe_ID}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message);
        return throwError('A data error occurred, please try again.');
    }

}