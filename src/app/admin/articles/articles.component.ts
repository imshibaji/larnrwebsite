import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  loaded = true;
  tags: any;
  articles: any;
  article = {
    id: '',
    title: '',
    details: '',
    url: '',
    tags: [''],
    time: ''
  };
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const catagories = this.db.collection('categories').valueChanges();
    const articles = this.db.collection('learnings', ref => ref.orderBy('time', 'desc')).valueChanges();
    catagories.subscribe(datas => {
      this.tags = datas;
    });
    articles.subscribe(datas => {
      this.articles = datas;
      this.loaded = false;
    });
  }

  reset() {
    this.article = {
      id: '',
      title: '',
      details: '',
      url: '',
      tags: [''],
      time: ''
    };
  }

  capitalizeFirstLetter(data) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

  camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) {
        return '';
      } // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  save(form) {
    const data = form.value;
    if (form.value.id === '') {
      data.id = 'art' + Date.now();
    } else {
      data.id = form.value.id;
    }
    data.time = Date.now();
    data.type = this.capitalizeFirstLetter(form.value.tags.replace('-', ' '));

    this.db.collection('learnings').doc(data.id).set(data);
    this.snackBar.open('Data saved in the server');
    this.reset();
  }

  edit(data) {
    this.article = data;
  }

  delete(data) {
    this.db.collection('learnings').doc(data.id).delete();
    this.snackBar.open('Data deleted from server');
  }

}
