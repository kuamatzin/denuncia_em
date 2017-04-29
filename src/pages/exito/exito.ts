import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-exito',
  templateUrl: 'exito.html'
})
export class ExitoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  dismiss() {
    let data = { toRoot: true };
    this.viewCtrl.dismiss(data);
  }




}
