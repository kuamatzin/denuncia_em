import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { TipoDenunciaPage } from '../tipo-denuncia/tipo-denuncia';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {
  map: GoogleMap;
  loader;
  latitude;
  longitude;
  videos;
  images;
  nombre_denuncia;
  descripcion;
  fecha;
  location_count: number = 0;
  ubicacion: string = "mapa";
  alto_pantalla: number;
  ancho_pantalla: number;
  altura_mapa;
  estados: any[] = [
    { id: 'AG', name: 'AGUASCALIENTES' },
    { id: 'BN', name: 'BAJA CALIFORNIA NORTE' },
    { id: 'BS', name: 'BAJA CALIFORNIA SUR' },
    { id: 'CH', name: 'COAHUILA' },
    { id: 'CI', name: 'CHIHUAHUA' },
    { id: 'CL', name: 'COLIMA' },
    { id: 'CP', name: 'CAMPECHE' },
    { id: 'CS', name: 'CHIAPAS' },
    { id: 'CDMX', name: 'CIUDAD DE MÉXICO' },
    { id: 'DG', name: 'DURANGO' },
    { id: 'GE', name: 'GUERRERO' },
    { id: 'GJ', name: 'GUANAJUATO' },
    { id: 'HD', name: 'HIDALGO' },
    { id: 'JA', name: 'JALISCO' },
    { id: 'MC', name: 'MICHOACAN' },
    { id: 'MR', name: 'MORELOS' },
    { id: 'MX', name: 'MEXICO' },
    { id: 'NA', name: 'NAYARIT' },
    { id: 'NL', name: 'NUEVO LEON' },
    { id: 'OA', name: 'OAXACA' },
    { id: 'PU', name: 'PUEBLA' },
    { id: 'QE', name: 'QUERETARO' },
    { id: 'QI', name: 'QUINTANA ROO' },
    { id: 'SI', name: 'SINALOA' },
    { id: 'SL', name: 'SAN LUIS POTOSI' },
    { id: 'SO', name: 'SONORA' },
    { id: 'TA', name: 'TAMAULIPAS' },
    { id: 'TB', name: 'TABASCO' },
    { id: 'TL', name: 'TLAXCALA' },
    { id: 'VC', name: 'VERACRUZ' },
    { id: 'YU', name: 'YUCATAN' },
    { id: 'ZA', name: 'ZACATECAS' }
  ];
  direccion1: string = '';
  direccion2: string = '';
  codigo_postal: string = '';
  estado: string = '';
  municipio: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geolocation: Geolocation, public loadingCtrl: LoadingController, public platform: Platform) {
    this.videos = navParams.data.videos;
    this.images = navParams.data.images;
    this.nombre_denuncia = navParams.data.nombre_denuncia;
    this.descripcion = navParams.data.descripcion;
    this.fecha = navParams.data.fecha;

    platform.ready().then((readySource) => {
      this.altura_mapa = platform.height() - 300;
      document.getElementById('map').setAttribute("style", "height: " + this.altura_mapa + "px");
    });
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.setLocation();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo ubicación"
    });
    this.loader.present();
  }

  setLocation() {
    this.presentLoading();
    // create LatLng object
    this.geolocation.getCurrentPosition().then((resp) => {
      if (this.location_count == 0) {
        this.location_count = this.location_count + 1;
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        this.loadMap();
      }
      else {
        document.getElementById('map').setAttribute("style", "height: " + this.altura_mapa + "px");
        this.loadMap();
      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap() {
    let currentLocation: LatLng = new LatLng(this.latitude, this.longitude);

    let options = {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': currentLocation,
        'tilt': 30,
        'zoom': 17,
        'bearing': 50
      }
    }

    this.map = this.googleMaps.create('map', options);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.clear();
      this.loader.dismiss();
      this.cargarMarcador(currentLocation);
    });

  }

  cargarMarcador(currentLocation) {
    let markerOptions: MarkerOptions = {
      position: currentLocation,
      title: 'Denuncia'
    };

    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
        marker.setAnimation('DROP');
        marker.setDraggable(true);
        this.accionesMarcador(marker);
      });
  }

  accionesMarcador(marker) {
    marker.addEventListener(GoogleMapsEvent.MARKER_DRAG_END).subscribe((data) => {
      marker.getPosition().then(data => {
        this.latitude = data.lat;
        this.longitude = data.lng;
      });
    });
  }

  capturarDatos() {
    this.navCtrl.push(TipoDenunciaPage, {
      images: this.images,
      videos: this.videos,
      nombre_denuncia: this.nombre_denuncia,
      descripcion: this.descripcion,
      fecha: this.fecha,
      latitud: this.latitude,
      longitud: this.longitude,
      direccion1: this.direccion1,
      direccion2: this.direccion2,
      codigo_postal: this.codigo_postal,
      estado: this.codigo_postal,
      municipio: this.municipio
    });
  }

}
