import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeCRUDService, Recipe } from './recipeCRUD.service';

@Component({
    selector: 'show-recipe-item-page',
    templateUrl: './show-recipe-item-page.component.html',
    styleUrls: ['./show-recipe-item-page.component.css']
})

export class ShowRecipeItemPageComponent implements OnInit {
    
    recipe_ID: number;
    recipe: Recipe;

    constructor(
        private recipeCRUD: RecipeCRUDService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.recipe_ID = this.route.snapshot.params['recipe_ID']
        this.getRecipeByID();
        this.deleteThisRecipe();
    }

    getRecipeByID() {
       this.recipeCRUD.getRecipe(this.recipe_ID)
       .subscribe(data => { this.recipe = data });  
    }

    deleteThisRecipe() {
        this.recipeCRUD.deleteRecipe(this.recipe_ID)
        .subscribe(data => console.log(data));
    }

}
