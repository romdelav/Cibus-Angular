import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService,  Recipe } from './recipeCRUD.service'

@Component({
    selector: 'side-list',
    templateUrl: './side-list.component.html',
    styleUrls: ['./side-list.component.css']
})

export class SideListComponent implements OnInit {

    recipes: Recipe[];

    constructor(
        private recipeCRUD: RecipeCRUDService,
    ) {}

    ngOnInit() {
        this.getAllSides();
    }

    getAllSides() {
        this.recipeCRUD.getSides()
            .subscribe(data => { this.recipes = data});
    }
}