import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService, Recipe } from './recipeCRUD.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'delete-recipe-item-page',
    templateUrl: './delete-recipe-item-page.component.html',
    styleUrls: ['./delete-recipe-item-page.component.css']
})

export class DeleteRecipeItemPageComponent implements OnInit {

    recipe_ID: number;
    recipe: any;
    isShown: boolean = false;

    constructor(
        private recipeCRUD: RecipeCRUDService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.recipe_ID = this.route.snapshot.params['recipe_ID']
        this.getRecipeByID();
    }

    getRecipeByID() {
       this.recipeCRUD.getRecipe(this.recipe_ID)
            .subscribe(data => { this.recipe = data });  
    }

    deleteThisRecipe() {
        this.recipeCRUD.deleteRecipe(this.recipe_ID)
            .subscribe(data => {this.recipe = data});
        this.showMessage()
    }

    showMessage() {
        this.isShown = !this.isShown;
    }
}