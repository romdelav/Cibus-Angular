import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService,  Recipe } from './recipeCRUD.service'

@Component({
    selector: 'grain-recipe-list',
    templateUrl: './grain-recipe-list.component.html',
    styleUrls: ['./grain-recipe-list.component.css']
})

export class GrainRecipeListComponent implements OnInit {

    recipes: Recipe[];

    constructor(
        private recipeCRUD: RecipeCRUDService,
    ) {}

    ngOnInit() {
        this.getAllGrainRecipes();
    }

    getAllGrainRecipes() {
        this.recipeCRUD.getGrainRecipes()
            .subscribe(data => { this.recipes = data});
    }
}