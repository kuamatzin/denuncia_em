import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

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
  data;
  videos;
  images;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geolocation: Geolocation) {
    this.videos = navParams.data.videos;
    this.images = navParams.data.images;
    this.data = [];
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.setLocation();
  }

  setLocation() {
    // create LatLng object
    this.geolocation.getCurrentPosition().then((resp) => {

      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;

      this.loadMap(latitude, longitude);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap(latitude, longitude) {

    let location: LatLng = new LatLng(latitude, longitude);

    this.map = new GoogleMap('map', {
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
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });

  }
}
