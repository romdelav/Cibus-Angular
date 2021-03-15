import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService,  Recipe } from './recipeCRUD.service'

@Component({
    selector: 'salad-list',
    templateUrl: './salad-list.component.html',
    styleUrls: ['./salad-list.component.css']
})

export class SaladListComponent implements OnInit {

    recipes: Recipe[];

    constructor(
        private recipeCRUD: RecipeCRUDService,
    ) {}

    ngOnInit() {
        this.getAllSalads();
    }

    getAllSalads() {
        this.recipeCRUD.getSalads()
            .subscribe(data => { this.recipes = data});
    }
}