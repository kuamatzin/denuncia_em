import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { TipoDenunciaPage } from '../tipo-denuncia/tipo-denuncia';

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
  loading: boolean;
  latitude;
  longitude;
  nombre_denuncia: string;
  descripcion: string;
  videos;
  images;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geolocation: Geolocation) {
    this.loading = true;
    this.videos = navParams.data.videos;
    this.images = navParams.data.images;
    this.nombre_denuncia = 'PRI';
    this.descripcion = 'Pinche PRI';
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.setLocation();
  }

  setLocation() {
    // create LatLng object
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.loadMap();

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
      this.loading = false;
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
      latitud: this.latitude,
      longitud: this.longitude
    });
  }

}
