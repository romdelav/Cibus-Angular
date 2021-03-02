import { Component, OnInit } from '@angular/core';
import { IngredientCRUDService, Ingredient } from './ingredientCRUD.service';

@Component({
    selector: 'ingredient-list-page',
    templateUrl: './ingredient-list-page.component.html',
    styleUrls: ['./ingredient-list-page.component.css']
})

export class IngredientListPageComponent implements OnInit {

    public ingredients: Ingredient[];

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
   
}