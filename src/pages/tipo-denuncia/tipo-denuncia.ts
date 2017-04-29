import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ExitoPage } from '../exito/exito';
import { Page1 } from '../page1/page1';

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
  numero_imagenes: number;
  numero_videos: number;
  denuncia_id = 'new';
  latitud;
  longitud;
  http;
  fileTransfer: TransferObject;
  loader;
  continuar: boolean = false;
  fecha;
  direccion1: string;
  direccion2: string;
  codigo_postal: string;
  estado: string;
  municipio: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, http: Http, private transfer: Transfer, public modalCtrl: ModalController, public viewCtrl: ViewController, private backgroundMode: BackgroundMode, public loadingCtrl: LoadingController) {
    this.http = http;
    this.denunciaAnonima = false;
    this.videos = navParams.data.videos;
    this.images = navParams.data.images;
    this.numero_imagenes = this.images.length - 1;
    this.numero_videos = this.videos.length - 1;
    this.nombre_denuncia = navParams.data.nombre_denuncia;
    this.descripcion = navParams.data.descripcion;
    this.fecha = navParams.data.fecha,
      this.direccion1 = navParams.data.direccion1,
      this.direccion2 = navParams.data.direccion2,
      this.codigo_postal = navParams.data.codigo_postal,
      this.estado = navParams.data.codigo_postal,
      this.municipio = navParams.data.municipio,
      this.nombre = '';
    this.apellidos = '';
    this.email = '';
    this.latitud = navParams.data.latitud;
    this.longitud = navParams.data.longitud;
    this.fileTransfer = this.transfer.create();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Denunciando..."
    });
    this.loader.present();
  }

  canSubmit() {
    if (this.denunciaAnonima) {
      this.continuar = true;
    }
    else {
      this.continuar = false;
    }
  }

  checkForm() {
    if (this.nombre != '' && this.apellidos != '' && this.email != '') {
      this.continuar = true;
    }
  }

  upload(tipoArchivo, nombreArchivo, indexArchivo, files) {
    this.presentLoading();
    let data = {
      denuncia_id: this.denuncia_id,
      denunciaAnonima: this.denunciaAnonima,
      nombre_denuncia: this.nombre_denuncia,
      descripcion: this.descripcion,
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      latitud: this.latitud,
      longitud: this.longitud,
      fecha: this.fecha,
      direccion1: this.direccion1,
      direccion2: this.direccion2,
      codigo_postal: this.codigo_postal,
      estado: this.codigo_postal,
      municipio: this.municipio,
    }

    let imageOptions: FileUploadOptions = {
      chunkedMode: false, //No funciona en Android sin este parametro
      fileKey: tipoArchivo,
      fileName: nombreArchivo,
      headers: {},
      params: data
    }

    this.fileTransfer.upload(files[indexArchivo], 'http://www.denuncias.inovuz.com/api/denuncias/image', imageOptions)
      .then((data) => {
        this.backgroundMode.enable();
        this.denuncia_id = data.response;
        indexArchivo = indexArchivo - 1;
        if (indexArchivo >= 0) {
          this.upload(tipoArchivo, nombreArchivo, indexArchivo, files);
        }
        if (indexArchivo == -1 && tipoArchivo == 'image') {
          if (this.videos.length) {
            this.upload('video', 'video.mp4', this.numero_videos, this.videos);
          }
          else {
            this.loader.dismiss();
            this.showModal();
          }

        }
        if (indexArchivo == -1 && tipoArchivo == 'video') {
          this.backgroundMode.disable();
          this.loader.dismiss();
          this.showModal();
        }
      }, (err) => {
        this.backgroundMode.disable();
      })
  }

  capturarDatos() {
    //this.showModal();
    if (this.images.length) {
      this.upload('image', 'name.jpg', this.numero_imagenes, this.images);
    } else {
      this.upload('video', 'video.mp4', this.numero_videos, this.videos);
    }
  }

  showModal() {
    let modal = this.modalCtrl.create(ExitoPage);
    
    modal.present();

    modal.onDidDismiss(data => {
      this.loader.dismiss();
      if(data.toRoot) {
        this.navCtrl.setRoot(Page1)
      }
    });
  }
}
