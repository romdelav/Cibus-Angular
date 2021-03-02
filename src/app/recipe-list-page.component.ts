import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService, Recipe } from './recipeCRUD.service';
import { Router } from '@angular/router';


@Component({
    selector: 'recipe-list-page',
    templateUrl: './recipe-list-page.component.html',
    styleUrls: ['./recipe-list-page.component.css']
})

export class RecipeListPageComponent implements OnInit {

    public recipes: Recipe[];
    recipe_ID: number;
    selectedRecipe: string = '';

    constructor(
        private recipeCRUD: RecipeCRUDService,
        private router: Router

    ) {}

    ngOnInit(): void {
        this.getRecipes();
    }

    getRecipes() {
        this.recipeCRUD.getAllRecipes()
            .subscribe(recipes => { this.recipes = recipes });
    }

    selectRecipeHandler (event: any) {
        this.selectedRecipe = event.target.value;
        this.router.navigateByUrl('/recipes/' + this.selectedRecipe);
        }
}