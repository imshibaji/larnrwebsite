import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  file: File;
  banners: any;
  isLoaded = false;
  isOnLoaded = true;
  banner = {
    id: '',
    title: '',
    status: '',
    path: '',
    imgsrc: '',
    time: 0,
    height: 0
  };

  constructor(
    private fs: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    const datas = this.db.collection('banners').valueChanges();
    datas.subscribe(res => {
      this.banners = res;
      this.isOnLoaded = false;
    });
  }

  onSubmit(form) {
    this.banner.id = 'bnr' + Date.now();
    this.banner.time = Date.now();
    const ext = this.fileExt(this.file.name);
    this.banner.path = 'banners/' + this.banner.id + '.' + ext;

    // File Upload Action
    this.upload();

    // console.log(form.value, this.banner, ext);
  }

  fileExt(filename) {
    return filename.split('.').pop();
  }
  onFileSelect(evt) {
    this.file = evt.target.files[0];
  }
  upload() {
    this.isLoaded = true;

    const file = this.file;
    const filePath = this.banner.path;
    const fileRef = this.fs.ref(filePath);
    const task = this.fs.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        fileRef.getDownloadURL().subscribe(res => {
          // this.banner.imgsrc = res;

          this.saveData(res);
          this.isLoaded = false;
          this.onClear();
        });
      })
    ).subscribe(data => {
      console.log(data);
    });
  }

  saveData(data) {
    this.banner.imgsrc = data;
    this.banner.height = 250;
    this.db.collection('banners')
      .doc(this.banner.id).set(this.banner);
  }

  delete(data) {
    const ref = this.fs.ref(data.path);
    ref.delete().subscribe(res => {
      this.db.collection('banners').doc(data.id).delete();
    });
  }

  onClear() {
    this.banner = {
      id: '',
      title: '',
      status: '',
      path: '',
      imgsrc: '',
      time: 0,
      height: 0
    };
  }
}
