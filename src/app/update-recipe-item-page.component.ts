import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Recipe, RecipeCRUDService } from './recipeCRUD.service';
import { Ingredient, IngredientCRUDService } from './ingredientCRUD.service';
import { Measurement, MeasurementCRUDService } from './MeasurementCRUD.service'; 

@Component({
    selector: 'update-recipe-item-page',
    templateUrl: './update-recipe-item-page.component.html',
    styleUrls: ['./update-recipe-item-page.component.css']
})

export class UpdateRecipeItemPageComponent implements OnInit {
    
    form: FormGroup;
    recipe_ID: number;
    recipe: any;
    ingredients : Ingredient[];
    measurements: Measurement[];
    isShown: boolean = false;

    constructor(
        private recipeCRUD: RecipeCRUDService,
        private ingredientCRUD: IngredientCRUDService,
        private measurementCRUD: MeasurementCRUDService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.recipe_ID = this.route.snapshot.params['recipe_ID']
        
        this.getRecipeByID();
        this.getIngredients();
        this.getMeasurements();

        this.form = new FormGroup({
            Recipe_Name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[\\w\\-\\s\\/]+')
            ])),
            Description: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')),
            Servings: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$')),
            Cooking_Instructions: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')),
            Ingredient_ID1: new FormControl(''),
            Measurement_ID1: new FormControl(''),
            Ingredient_ID2: new FormControl(''),
            Measurement_ID2: new FormControl(''),
        });
    }

    onSubmit(recipe: Recipe) {
        this.recipeCRUD.updateRecipe(this.recipe_ID, recipe)
            .subscribe(data => { this.recipe = data });
        this.showMessage();
        this.clearForm();
    }

    getRecipeByID() {
        this.recipeCRUD.getRecipe(this.recipe_ID)
        .subscribe(data => { this.recipe = data });  
    }

    getIngredients() {
        this.ingredientCRUD.getAllIngredients()
            .subscribe(data => { this.ingredients = data });
    }

    getMeasurements() {
        this.measurementCRUD.getAllMeasurements()
            .subscribe(data => { this.measurements = data});
    }

    showMessage() {
        this.isShown = !this.isShown;
    }

    clearForm() {
        this.form.reset();
    }

}
