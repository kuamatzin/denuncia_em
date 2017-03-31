import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
//import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

import { CaptureDataPage } from '../capture-data/capture-data';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 {

  videos;
  images;
  base64Image;

  constructor(private camera: Camera, public navCtrl: NavController, private mediaCapture: MediaCapture, public alertCtrl: AlertController) {
    this.videos = [];
    this.images = ['hola'];
  }

  /*
  selectMediaFromLibrary() {
     let options: ImagePickerOptions = {
       maximumImagesCount: 10
     }

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }
  */

  
   selectMediaFromLibrary() {
     let options: CameraOptions = {
       quality: 50,
       destinationType: this.camera.DestinationType.FILE_URI,
       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
       mediaType: 2
     }
 
     this.camera.getPicture(options).then((imageData) => {
       let typeFile = imageData.substr(imageData.length - 3)
       if (typeFile == 'mp4') {
         this.videos.push(imageData);
       } else {
         this.images.push(imageData);
       }
     }, (err) => {
       // Handle error
     });
   }

  capturarMultimedia() {
    let confirm = this.alertCtrl.create({
      title: 'Abrir Cámara',
      buttons: [
        {
          text: 'Capturar Video',
          handler: () => {
            this.capturarVideo();
          }
        },
        {
          text: 'Capturar Imagen',
          handler: () => {
            this.capturarImagen();
          }
        }
      ]
    });
    confirm.present();
  }

  capturarVideo() {
    let options: CaptureImageOptions = { limit: 10 };

    this.mediaCapture.captureVideo(options)
      .then(
      (data: MediaFile[]) => {
        let i, len;
        for (i = 0, len = data.length; i < len; i += 1) {
          this.videos.push(data[i].fullPath);
        }
      },
      (err: CaptureError) => alert("Error: " + err.code)
      );
  }

  capturarImagen() {
    let options: CaptureImageOptions = { limit: 10 };

    this.mediaCapture.captureImage(options)
      .then(
      (data: MediaFile[]) => {
        let i, len;
        for (i = 0, len = data.length; i < len; i += 1) {
          this.images.push(data[i].fullPath);
        }
      },
      (err: CaptureError) => alert("Error: " + err.code)
      );
  }

  capturarDatos() {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CaptureDataPage, {
      images: this.images,
      videos: this.videos
    });
  }

}
