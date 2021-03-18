import { Component, OnInit } from '@angular/core';
import { IngredientCRUDService,  Ingredient } from './ingredientCRUD.service'

@Component({
    selector: 'meat-ingredient-list',
    templateUrl: './meat-ingredient-list.component.html',
    styleUrls: ['./meat-ingredient-list.component.css']
})

export class MeatIngredientListComponent implements OnInit {

    ingredients: Ingredient[];

    constructor(
        private ingredientCRUD: IngredientCRUDService,
    ) {}

    ngOnInit() {
        this.getAllMeatIngredients();
    }

    getAllMeatIngredients() {
        this.ingredientCRUD.getMeat()
            .subscribe(data => { this.ingredients = data});
    }
}