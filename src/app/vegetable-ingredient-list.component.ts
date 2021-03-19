import { Component, OnInit } from '@angular/core';
import { IngredientCRUDService,  Ingredient } from './ingredientCRUD.service'

@Component({
    selector: 'vegetable-ingredient-list',
    templateUrl: './vegetable-ingredient-list.component.html',
    styleUrls: ['./vegetable-ingredient-list.component.css']
})

export class VegetableIngredientListComponent implements OnInit {

    ingredients: Ingredient[];

    constructor(
        private ingredientCRUD: IngredientCRUDService,
    ) {}

    ngOnInit() {
        this.getAllVegetableIngredients();
    }

    getAllVegetableIngredients() {
        this.ingredientCRUD.getVegetables()
            .subscribe(data => { this.ingredients = data});
    }
}