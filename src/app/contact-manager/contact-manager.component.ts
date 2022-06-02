import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
    public loading =false;
    contacts:any;
    public errorMessage:string | null=null;


  constructor(private cantservice:ContactService) { }

  ngOnInit(): void {
this.getAllContactData();
  }
  getAllContactData(){
    this.loading= true;
    this.cantservice.getAllContacts().subscribe((data: MyContact)=>{

this.contacts=data;
this.loading=false;
    },(error)=>{
        this.errorMessage=error;
        this.loading=false;
    })
  }
deleteContact(contactId:string | undefined){
    if(contactId){
        this.cantservice.deleteContact(contactId).subscribe((data:{})=>{
            this.getAllContactData();

    },(error)=>{

        this.errorMessage=error;
        this.loading=false;
    }
    )
}
}
}
