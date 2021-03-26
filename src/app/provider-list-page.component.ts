import { Component, OnInit } from '@angular/core';
import { ProviderCRUDService,  Provider } from './providerCRUD.service'

@Component({
    selector: 'provider-list-page',
    templateUrl: './provider-list-page.component.html',
    styleUrls: ['./provider-list-page.component.css']
})

export class ProviderListPageComponent implements OnInit {

    providers: Provider[];

    constructor(
        private providerCRUD: ProviderCRUDService,
    ) {}

    ngOnInit() {
        this.getAllProviders();
    }

    getAllProviders() {
        this.providerCRUD.getProviders()
            .subscribe(data => { this.providers = data});
    }
}