import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService, Recipe } from './recipeCRUD.service';
//import { Router } from '@angular/router';


@Component({
    selector: 'recipe-list-page',
    templateUrl: './recipe-list-page.component.html',
    styleUrls: ['./recipe-list-page.component.css']
})

export class RecipeListPageComponent implements OnInit {

    recipes: Recipe[];
    recipe_ID: number;
    Recipe_Name: any;
    term: string;
    //selectedRecipe: string = '';

    constructor(
        private recipeCRUD: RecipeCRUDService,
        //private router: Router

    ) {}

    ngOnInit(): void {
        this.getRecipes();
        this.searchByName();
    }

    getRecipes() {
        this.recipeCRUD.getAllRecipes()
            .subscribe(recipes => { this.recipes = recipes });
    }

    searchByName() {
        if(this.Recipe_Name != "") {
            this.recipes = this.recipes.filter(data => {
                return data.Recipe_Name.toLocaleLowerCase().match(this.Recipe_Name.toLocaleLowerCase());
            })
        }
        else if(this.Recipe_Name == "") {
            this.recipes = Object.assign([], this.recipes)
            this.ngOnInit();
        }   
    }
    /*
    selectRecipeHandler (event: any) {
        this.selectedRecipe = event.target.value;
        this.router.navigateByUrl('/recipes/' + this.selectedRecipe);
    }
    */
}