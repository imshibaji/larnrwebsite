import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  loaded = true;
  tags: any;
  videos: any[];
  video = {
    id: '',
    title: '',
    details: '',
    url: '',
    tags: [''],
  };
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const videosByTime = this.db.collection('videos', ref => ref.orderBy('time', 'desc')).valueChanges();
    const catagories = this.db.collection('categories').valueChanges();

    catagories.subscribe(datas => {
      this.tags = datas;
    });

    videosByTime.subscribe(datas => {
      console.log(datas);
      this.videos = datas;
      this.loaded = false;
    });
  }

  async saveData(form) {
    const data = form.value;
    try {
      if (form.value.id === '') {
        data.id = 'vid' + Date.now();
      } else {
        data.id = form.value.id;
      }

      data.time = Date.now();
      console.log(data);

      this.db.collection('videos').doc(data.id).set(data);

      this.snackBar.open('Video Data saved into the server');

      this.video = {
        id: '',
        title: '',
        details: '',
        url: '',
        tags: [''],
      };
    } catch (error) {
      console.log(error);
    }
  }

  editVideo(video) {
    this.video = video;
  }

  deleteVideo(video) {
    this.db.collection('videos').doc(video.id).delete();
  }

  getImage(url) {
    const id = this.getId(url);
    const imageData = 'https://img.youtube.com/vi/' + id + '/default.jpg';
    return imageData;
  }

  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'error';
    }
  }
}
