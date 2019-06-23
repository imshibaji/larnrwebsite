import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.scss']
})
export class CatagoryComponent implements OnInit {
  catagories: any;
  loaded = true;
  catagory = {
    id: '',
    title: '',
    details: '',
  };

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const catdata = this.db.collection('categories', ref => ref.orderBy('time', 'desc')).valueChanges();

    catdata.subscribe(datas => {
      this.catagories = datas;
      this.loaded = false;
    });
  }

  saveData(form) {
    const data = form.value;
    if (form.value.id === '') {
      data.id = 'cat' + Date.now();
    } else {
      data.id = form.value.id;
    }
    data.slag = form.value.title.toLowerCase();
    data.slag = data.slag.replace(' ', '-');
    data.time = Date.now();

    this.db.collection('categories').doc(data.id).set(data);

    this.reset();
    this.snackBar.open('Catagory Data is saved in server.');
  }

  reset() {
    this.catagory = {
      id: '',
      title: '',
      details: ''
    };
  }

  editCat(data) {
    this.catagory = data;
  }

  deleteCat(data) {
    this.db.collection('categories').doc(data.id).delete();
  }

}
