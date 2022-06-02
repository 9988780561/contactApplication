import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
    public contactId: string | null = null;
    public loading = false;
    contact: any;
    group: any;
    public errorMessage: string | null = null;


    constructor(private activatedRoute: ActivatedRoute,  private cantService: ContactService,  private router:Router) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
        this.contactId = param.get('contactId')
    });
    if (this.contactId) {
        this.loading = true;

        this.cantService.getContacts(this.contactId).subscribe((data: MyContact) => {

            this.contact = data;
            this.loading = false;



        }, (error) => {
            this.errorMessage = error;
            this.loading = false;
        })
    }
}
submtUpdate(){
    if(this.contactId){
    this.cantService.updateContact(this.contact, this.contactId).subscribe((data:MyContact)=>{

this.router.navigate(['/']).then();
    },(error)=>{
    this.errorMessage=error;
    this.router.navigate([`/contacts/edit/$[this.contact]`]).then();

    })
}
}
}
