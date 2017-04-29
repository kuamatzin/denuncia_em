import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { DatePicker } from '@ionic-native/date-picker';
/*
  Generated class for the CaptureData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-capture-data',
  templateUrl: 'capture-data.html'
})
export class CaptureDataPage {
  nombre_denuncia: string;
  descripcion: string;
  videos;
  images;
  loader;
  date: Date;
  meses: string[];

  constructor(private datePicker: DatePicker, public navCtrl: NavController, public navParams: NavParams, public alertIonic: AlertController) {
    this.videos = navParams.data.videos;
    this.images = navParams.data.images;
    this.nombre_denuncia = '';
    this.descripcion = '';
    this.date = new Date();
    this.meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Obtubre',
      'Noviembre',
      'Diciembre'
    ];
  }


  fecha() {
    this.datePicker.show({
      date: this.date,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        if (date > this.date) {
          let alert = this.alertIonic.create({
            title: 'Ups!',
            subTitle: 'Los viajeros del tiempo no pueden cambiar la fecha!',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          this.date = date
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  capturarDatos() {
    this.navCtrl.push(MapaPage, {
      images: this.images,
      videos: this.videos,
      nombre_denuncia: this.nombre_denuncia,
      descripcion: this.descripcion,
      fecha: this.date
    });
  }


}
