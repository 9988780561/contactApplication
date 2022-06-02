import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
public loading=false;
contact:MyContact={} as MyContact;
groups:any;
public errorMessage:string | null=null;

  constructor(private cantservice:ContactService,   private router:Router) { }

  ngOnInit(): void {


      this.cantservice.getAllGroups().subscribe((data)=>{
          this.groups=  data;
      },(error)=>{this.errorMessage=error;
  })

}
addSubmit(){


    this.cantservice.createContact(this.contact).subscribe((data:MyContact)=>{

this.router.navigate(['/']).then();
    },(error)=>{
    this.errorMessage=error;
    this.router.navigate([`/contacts/add`]).then();

    })
}

}
