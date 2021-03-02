import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeCRUDService } from './recipeCRUD.service';
import { IngredientCRUDService, Ingredient } from './ingredientCRUD.service';
import { MeasurementCRUDService, Measurement } from './MeasurementCRUD.service';


@Component({
    selector: 'add-recipe-item-page',
    templateUrl: './add-recipe-item-page.component.html',
    styleUrls: ['./add-recipe-item-page.component.css']
})

export class AddRecipeItemPageComponent implements OnInit {
    
    form: FormGroup;
    ingredients: Ingredient[];
    measurements: Measurement[];
    isShown: boolean = false;

    constructor(
        private recipeCRUD: RecipeCRUDService,
        private ingredientCRUD: IngredientCRUDService,
        private measurementCRUD: MeasurementCRUDService,
    ) {}

    ngOnInit() {
        
        this.getIngredients();
        this.getMeasurements();

        this.form = new FormGroup({
            Recipe_Name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[\\w\\-\\s\\/]+')
            ])),
            Servings: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$')),
            Cooking_Instructions: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')
            ),
            Description: new FormControl('', 
                Validators.pattern('[\\w\\-\\s\\/]+')
            ),
            Measurement_ID1: new FormControl(''),
            Ingredient_ID1: new FormControl(''),

            Measurement_ID2: new FormControl(''),
            Ingredient_ID2: new FormControl(''), 

        });
    }

    getIngredients() {
        this.ingredientCRUD.getAllIngredients()
            .subscribe(ingredients => { this.ingredients = ingredients });
    }

    getMeasurements() {
        this.measurementCRUD.getAllMeasurements()
            .subscribe(measurements => { this.measurements = measurements });
    }

    onSubmit(newRecipe) {
        this.recipeCRUD.createRecipe(newRecipe)
            .subscribe(); 
        this.showMessage();
        this.clearForm();
    }

    showMessage() {
        this.isShown = !this.isShown;
    }

    clearForm() {
        this.form.reset();
    }

}