import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  loaded = true;
  tags: any;
  jobs: any;
  job = {
    id: '',
    title: '',
    details: '',
    status: '',
    tags: '',
    time: '',
    company: '',
    company_email: '',
    company_website: '',
    company_phone: '',
    contact_person: '',
    contact_person_number: '',
  };
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const catagories = this.db.collection('categories').valueChanges();
    const jobdatas = this.db.collection('jobs').valueChanges();
    catagories.subscribe(datas => {
      this.tags = datas;
    });
    jobdatas.subscribe(datas => {
      this.jobs = datas;
      this.loaded = false;
    });
  }

  reset() {
    this.job = {
      id: '',
      title: '',
      details: '',
      status: '',
      tags: '',
      time: '',
      company: '',
      company_email: '',
      company_website: '',
      company_phone: '',
      contact_person: '',
      contact_person_number: '',
    };
  }

  save(form) {
    const data = form.value;
    console.log(data);

    if (form.value.id === '') {
      data.id = 'job' + Date.now();
    } else {
      data.id = form.value.id;
    }
    data.time = Date.now();

    this.db.collection('jobs').doc(data.id).set(data);
    this.reset();
    this.snackBar.open('Data Saved into the server');
  }

  edit(data) {
    this.job = data;
  }

  delete(data) {
    this.db.collection('jobs').doc(data.id).delete();
    this.snackBar.open('Data delete from server.');
  }

}
