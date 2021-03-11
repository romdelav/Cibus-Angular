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
    ingredient: any;
    isShown: boolean = false;

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

    deleteThisIngredient() {
        this.ingredientCRUD.deleteIngredient(this.ingredient_ID)
            .subscribe(data => {this.ingredient = data});
        this.showMessage()
    }

    showMessage() {
        this.isShown = !this.isShown;
    }
}