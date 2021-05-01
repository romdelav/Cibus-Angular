import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService,  Recipe } from './recipeCRUD.service'

@Component({
    selector: 'vegetarian-recipe-list',
    templateUrl: './vegetarian-recipe-list.component.html',
    styleUrls: ['./vegetarian-recipe-list.component.css']
})

export class VegetarianRecipeListComponent implements OnInit {

    recipes: Recipe[];

    constructor(
        private recipeCRUD: RecipeCRUDService,
    ) {}

    ngOnInit() {
        this.getAllVegetarianRecipes();
    }

    getAllVegetarianRecipes() {
        this.recipeCRUD.getVegetarianRecipes()
            .subscribe(data => { this.recipes = data});
    }

    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } 
}