import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Ingredient, IngredientCRUDService } from './ingredientCRUD.service';

@Component({
    selector: 'update-ingredient-item-page',
    templateUrl: './update-ingredient-item-page.component.html',
    styleUrls: ['./update-ingredient-item-page.component.css']
})

export class UpdateIngredientItemPageComponent implements OnInit {
    
    form: FormGroup;
    ingredient_ID: number;
    ingredient: any;
    isShown: boolean = false;

    constructor(
        private ingredientCRUD: IngredientCRUDService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.ingredient_ID = this.route.snapshot.params['ingredient_ID']
        
        this.getIngredientByID()

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
            Calories: new FormControl('', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$')),
        });
    }

    onSubmit(ingredient: Ingredient) {
        this.ingredientCRUD.updateIngredient(this.ingredient_ID, ingredient)
            .subscribe(data => { this.ingredient = data });
        this.showMessage();
        this.clearForm();
    }

    getIngredientByID() {
        this.ingredientCRUD.getIngredient(this.ingredient_ID)
        .subscribe(data => { this.ingredient = data });  
    }

    showMessage() {
        this.isShown = !this.isShown;
    }

    clearForm() {
        this.form.reset();
    }

}
