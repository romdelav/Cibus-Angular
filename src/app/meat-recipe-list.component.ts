import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService,  Recipe } from './recipeCRUD.service'

@Component({
    selector: 'meat-recipe-list',
    templateUrl: './meat-recipe-list.component.html',
    styleUrls: ['./meat-recipe-list.component.css']
})

export class MeatRecipeListComponent implements OnInit {

    recipes: Recipe[];

    constructor(
        private recipeCRUD: RecipeCRUDService,
    ) {}

    ngOnInit() {
        this.getAllMeatRecipes();
    }

    getAllMeatRecipes() {
        this.recipeCRUD.getMeatRecipes()
            .subscribe(data => { this.recipes = data});
    }
}