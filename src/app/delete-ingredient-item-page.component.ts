import { Component, OnInit } from '@angular/core';
import { IngredientCRUDService, Ingredient } from './ingredientCRUD.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'delete-ingredient-item-page',
    templateUrl: './delete-ingredient-item-page.component.html',
    styleUrls: ['./delete-ingredient-item-page.component.css']
})

export class DeleteIngredientItemPageComponent implements OnInit {

    ingredient_ID: number;
    ingredient: Ingredient;

    constructor(
        private ingredientCRUD: IngredientCRUDService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.ingredient_ID = this.route.snapshot.params['ingredient_ID']
        this.getIngredientByID();
    }

    getIngredientByID() {
       this.ingredientCRUD.getIngredient(this.ingredient_ID)
            .subscribe(data => { this.ingredient = data });  
    }
}