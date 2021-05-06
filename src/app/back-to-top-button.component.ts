import { Component } from '@angular/core';

@Component({
    selector: 'back-to-top',
    templateUrl: './back-to-top-button.component.html',
    styleUrls: ['./back-to-top-button.component.css']
})

export class BackToTopButton {
    
    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } 
}