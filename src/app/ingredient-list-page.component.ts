import { Component, OnInit } from '@angular/core';
import { IngredientCRUDService, Ingredient } from './ingredientCRUD.service';

@Component({
    selector: 'ingredient-list-page',
    templateUrl: './ingredient-list-page.component.html',
    styleUrls: ['./ingredient-list-page.component.css']
})

export class IngredientListPageComponent implements OnInit {

    ingredients: Ingredient[];
    Ingredient_Name: any;
    Ingredient_ID: number;
    term: string;

    constructor(
        private ingredientCRUD: IngredientCRUDService
    ) {}

    ngOnInit(): void {
        this.getIngredients();
    }

    getIngredients() {
        this.ingredientCRUD.getAllIngredients()
            .subscribe(data => { this.ingredients = data });
    }

    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } 
}