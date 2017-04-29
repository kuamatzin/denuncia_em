import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
//import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
//Adjunta videos e imágenes como evidencia en tu denuncia

import { CaptureDataPage } from '../capture-data/capture-data';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 {

  media: string = "images";
  videos: any[];
  images: any[];
  base64Image;
  refresh= false;

  constructor(public viewCtrl: ViewController, private camera: Camera, public navCtrl: NavController, private mediaCapture: MediaCapture, public alertCtrl: AlertController, public navParams: NavParams) {
    this.videos = [];
    this.images = [];
    this.refresh = navParams.data.refresh;
  }

  ionViewDidEnter() {
    let nameLastView = this.navCtrl.last().name
    if(nameLastView == 'TipoDenunciaPage'){
      this.viewCtrl.showBackButton(false);
      this.images = [];
      this.videos = [];
    }
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

  seleccionarTipoMedia() {
    let confirm = this.alertCtrl.create({
      title: 'Selecciona',
      buttons: [
        {
          text: 'Abrir Cámara',
          handler: () => {
            this.capturarMultimedia();
          }
        },
        {
          text: 'Abrir Biblioteca',
          handler: () => {
            this.selectMediaFromLibrary();
          }
        }
      ]
    });
    confirm.present();
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
      (err: CaptureError) => console.log("Error: " + err.code)
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
      (err: CaptureError) => console.log("Error: " + err.code)
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
