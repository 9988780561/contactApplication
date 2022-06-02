import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
    selector: 'app-view-contact',
    templateUrl: './view-contact.component.html',
    styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

    public contactId: string | null = null;
    public loading = false;
    contact: any;
    group: any;
    public errorMessage: string | null = null;

    constructor(private activatedRoute: ActivatedRoute, private cantService: ContactService) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((param) => {
            this.contactId = param.get('contactId')
        });
        if (this.contactId) {
            this.loading = true;

            this.cantService.getContacts(this.contactId).subscribe((data: MyContact) => {

                this.contact = data;
                this.loading = false;
                this.cantService.getGroup(data).subscribe((data: MyGroup) => {
                    this.group = data;

                })

            }, (error) => {
                this.errorMessage = error;
                this.loading = false;
            })
        }
    }


}



