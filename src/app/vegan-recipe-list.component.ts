import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService,  Recipe } from './recipeCRUD.service'

@Component({
    selector: 'vegan-recipe-list',
    templateUrl: './vegan-recipe-list.component.html',
    styleUrls: ['./vegan-recipe-list.component.css']
})

export class VeganRecipeListComponent implements OnInit {

    recipes: Recipe[];

    constructor(
        private recipeCRUD: RecipeCRUDService,
    ) {}

    ngOnInit() {
        this.getAllVeganRecipes();
    }

    getAllVeganRecipes() {
        this.recipeCRUD.getVeganRecipes()
            .subscribe(data => { this.recipes = data});
    }
}