import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService, Recipe } from './recipeCRUD.service';

@Component({
    selector: 'recipe-list-page',
    templateUrl: './recipe-list-page.component.html',
    styleUrls: ['./recipe-list-page.component.css']
})

export class RecipeListPageComponent implements OnInit {

    recipes: Recipe[];
    term: string;

    constructor(
        private recipeCRUD: RecipeCRUDService,

    ) {}

    ngOnInit(): void {
        this.getRecipes();
    }

    getRecipes() {
        this.recipeCRUD.getAllRecipes()
            .subscribe(data => { this.recipes = data });
    }

}