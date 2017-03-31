import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 15; i++) {
      this.items.push({
        title: 'Item: ' + i,
        note: 'Este es el  item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }

  slides = [
    {
      title: "¿Qué puedes denunciar en la app?",
      description: "Todo, denuncia todo",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "¿Mi denuncia puede ser anónima?",
      description: "Por su puesto que no, necesitamos tu identidad, te vigilamos",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "¿Los vamos a meter a la carcel?",
      description: "Todos a la carcel",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];
}
