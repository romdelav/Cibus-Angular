import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IngredientCRUDService } from './ingredientCRUD.service';

@Component({
    selector: 'add-ingredient-item-page',
    templateUrl: './add-ingredient-item-page.component.html',
    styleUrls: ['./add-ingredient-item-page.component.css']
})

export class AddIngredientItemPageComponent implements OnInit {
    
    form: FormGroup;
    isShown: boolean = false;

    constructor(
        private IngredientCRUD: IngredientCRUDService,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            Ingredient_Name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[\\w\\-\\s\\/]+')
            ])),
            Protein: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$')),
            Carbohydrate: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$')),
            Sugar: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$')),
            Fat: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$')),
            Sodium: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$')),
            Calories: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$'))
        });
    }

    onSubmit(newIngredient) {
        this.IngredientCRUD.createIngredient(newIngredient)
          .subscribe() 
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