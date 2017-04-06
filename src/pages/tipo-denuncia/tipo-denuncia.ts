import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';


/*
  Generated class for the TipoDenuncia page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tipo-denuncia',
  templateUrl: 'tipo-denuncia.html'
})
export class TipoDenunciaPage {
  denunciaAnonima: boolean;
  videos;
  images;
  nombre_denuncia: string;
  descripcion: string;
  nombre: string;
  apellidos: string;
  email: string;
  latitud;
  longitud;
  http;
  fileTransfer: TransferObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, http: Http, private transfer: Transfer) {
    this.http = http;
    this.denunciaAnonima = false;
    this.videos = navParams.data.videos;
    this.images = navParams.data.images;
    this.nombre_denuncia = navParams.data.nombre_denuncia;
    this.descripcion = navParams.data.descripcion;
    this.nombre = 'Carlos';
    this.apellidos = 'Cuamatzin';
    this.email = 'kuamatzin@gmail.com';
    this.latitud = navParams.data.latitud;
    this.longitud = navParams.data.longitud;
    this.fileTransfer = this.transfer.create();
  }

  


  // full example
  upload() {

    let imageOptions: FileUploadOptions = {
      chunkedMode: false, //No funciona en Android sin este parametro
      fileKey: 'image',
      fileName: 'name.jpg',
      headers: {}
  }

    this.fileTransfer.upload( this.images[1], 'http://www.denuncias.inovuz.com/api/denuncias/image', imageOptions)
      .then((data) => {
        alert("YEI")
      }, (err) => {
        alert("ERROR")
      })
  }

  capturarDatos() {
    let data = {
      denunciaAnonima: this.denunciaAnonima,
      nombre_denuncia: this.nombre_denuncia,
      descripcion: this.descripcion,
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      latitud: this.latitud,
      longitud: this.longitud,
      imagenes: this.images,
      videos: this.videos
    }

    this.upload();

    /*
    this.http.post("http://localhost:8100/api/api/denuncias", data)
      .subscribe(data => {
        console.log(data)
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
      */

    this.http.post("http://www.denuncias.inovuz.com/api/denuncias", data)
      .subscribe(data => {
        console.log(data)
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }
}
