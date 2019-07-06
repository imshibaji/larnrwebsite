import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  tags: any;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    const catagories = this.db.collection('categories').valueChanges();

    catagories.subscribe(res => {
      this.tags = res;
    });
  }

}
