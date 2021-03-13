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
        this.searchByName();
        this.deleteThisIngredient();
    }

    getIngredients() {
        this.ingredientCRUD.getAllIngredients()
            .subscribe(data => { this.ingredients = data });
    }

    deleteThisIngredient() {
        this.ingredientCRUD.deleteIngredient(this.Ingredient_ID)
            .subscribe(data => console.log(data));
    }

    searchByName() {
        if(this.Ingredient_Name != "") {
            this.ingredients = this.ingredients.filter(data => {
                return data.Ingredient_Name.toLocaleLowerCase().match(this.Ingredient_Name.toLocaleLowerCase());
            })
        }
        else if(this.Ingredient_Name == "") {
            this.ingredients = Object.assign([], this.ingredients)
            this.ngOnInit();
        }   
    }

  
}