import { Component, OnInit } from '@angular/core';
import { IngredientCRUDService,  Ingredient } from './ingredientCRUD.service'

@Component({
    selector: 'grain-ingredient-list',
    templateUrl: './grain-ingredient-list.component.html',
    styleUrls: ['./grain-ingredient-list.component.css']
})

export class GrainIngredientListComponent implements OnInit {

    ingredients: Ingredient[];

    constructor(
        private ingredientCRUD: IngredientCRUDService,
    ) {}

    ngOnInit() {
        this.getAllGrainIngredients();
    }

    getAllGrainIngredients() {
        this.ingredientCRUD.getGrains()
            .subscribe(data => { this.ingredients = data});
    }
}