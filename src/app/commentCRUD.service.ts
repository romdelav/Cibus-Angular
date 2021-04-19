import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Comment {
    Comment_ID: number,
    Username: string,
    Text: string,
    Created_At: any,
}

@Injectable({
    providedIn: 'root'
})

export class CommentCRUDService {

    constructor(private http: HttpClient) {}

    addComment(article_ID: number, newComment: Comment) {
        return this.http.post(`http://localhost:3000/blog-articles/${article_ID}`, newComment)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message);
        return throwError('A data error occurred, please try again.');
    }

}
