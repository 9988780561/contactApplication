import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    private baseUrl:string = `http://localhost:4000`;
  constructor( private http:HttpClient) { }
public getAllContacts(): Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts`;


    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
}
public getContacts(contactId:string): Observable<MyContact>{
let dataUrl: string =`${this.baseUrl}/contacts/${contactId}`
return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));

}
public createContact(contact:MyContact): Observable<MyContact>{
    let dataUrl: string =`${this.baseUrl}/contacts`
    debugger;
    return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError));

    }
    public updateContact(contact:MyContact,contactId:string): Observable<MyContact>{
        let dataUrl: string =`${this.baseUrl}/contacts/${contactId}`
        return this.http.put<MyContact>(dataUrl,contact).pipe(catchError(this.handleError));

        }
        public deleteContact(contactId:string): Observable<MyContact>{
            let dataUrl: string =`${this.baseUrl}/contacts/${contactId}`
            return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError));

            }


            public getAllGroups(): Observable<MyGroup>{
                let dataUrl:string = `${this.baseUrl}/groups`;
                return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
            }

            public getGroup(contact:MyContact): Observable<MyGroup>{
                let dataUrl: string =`${this.baseUrl}/groups/${contact.groupId}`;
                return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));

                }

public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';

    if(error.error instanceof ErrorEvent){
        errorMessage=`Error:${error.error.message}`

    }
else{
    errorMessage=`Status:${error.status} \n  Message: ${error.message}`;

}
return throwError(errorMessage);

}

}
