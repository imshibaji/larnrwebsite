import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: any;
  tags: any;
  new = {
    id: '',
    title: '',
    details: '',
    link: '',
    tags: '',
    time: ''
  };

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    const newsdatas = this.db.collection('news', ref => ref.orderBy('time', 'desc')).valueChanges();
    const catagories = this.db.collection('categories').valueChanges();

    catagories.subscribe(res => {
      this.tags = res;
    });
    newsdatas.subscribe(res => {
      this.news = res;
    });
  }

  reset() {
    this.new = {
      id: '',
      title: '',
      details: '',
      link: '',
      tags: '',
      time: ''
    };
  }

  save(form) {
    const data = form.value;
    if (form.value.id === '') {
      data.id = 'new' + Date.now();
    } else {
      data.id = form.value.id;
    }
    data.time = Date.now();

    console.log(data);

    this.db.collection('news').doc(data.id).set(data);
    this.reset();
  }

  edit(data) {
    this.new = data;
  }

  delete(data) {
    this.db.collection('news').doc(data.id).delete();
  }
}
