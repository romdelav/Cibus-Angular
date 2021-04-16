import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Article {
    Article_ID: number,
    Title: string,
    Summary: string,
    Image_URL1: string,
    Image_URL2: string,
    Image_URL3: string,
    Image_URL4: string,
    Image_URL5: string,
    Reading_Time: number,
    Paragraph1: string,
    Paragraph2: string,
    Paragraph3: string,
    Paragraph4: string,
    Paragraph5: string,
    Date: string,
    First_Name: string,
    Last_Name: string,
    Comments: []
}

@Injectable({
    providedIn: 'root'
})

export class ArticleCRUDService {
    
    constructor(private http: HttpClient) {}

    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>('http://localhost:3000/blog-articles')
            .pipe(
                catchError(this.handleError)
            );
    }

    getArticle(article_ID: number): Observable<Article> {
        return this.http.get<Article>(`http://localhost:3000/blog-articles/${article_ID}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message);
        return throwError('A data error occurred, please try again.');
    }
}


