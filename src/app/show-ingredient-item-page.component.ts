import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientCRUDService, Ingredient } from './ingredientCRUD.service';

@Component({
    selector: 'show-ingredient-item-page',
    templateUrl: './show-ingredient-item-page.component.html',
    styleUrls: ['./show-ingredient-item-page.component.css']
})

export class ShowIngredientItemPageComponent implements OnInit {
    
    ingredient_ID: number;
    ingredient: Ingredient;
    isShown: boolean = false;

    constructor(
        private ingredientCRUD: IngredientCRUDService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.ingredient_ID = this.route.snapshot.params['ingredient_ID']
        this.getIngredientByID();
        this.deleteThisIngredient();
    }

    getIngredientByID() {
       this.ingredientCRUD.getIngredient(this.ingredient_ID)
            .subscribe(data => { this.ingredient = data });  
    }

    deleteThisIngredient() {
        this.ingredientCRUD.deleteIngredient(this.ingredient_ID)
            .subscribe(data => console.log(data));
    }
}
