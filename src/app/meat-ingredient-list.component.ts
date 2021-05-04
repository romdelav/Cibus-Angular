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

    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } 
}