import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { CaptureDataPage } from '../pages/capture-data/capture-data';
import { TipoDenunciaPage } from '../pages/tipo-denuncia/tipo-denuncia';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { ImagePicker } from '@ionic-native/image-picker';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Transfer } from '@ionic-native/transfer';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    CaptureDataPage,
    TipoDenunciaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    CaptureDataPage,
    TipoDenunciaPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Camera, MediaCapture, ImagePicker, GoogleMaps, Geolocation, Transfer]
})
export class AppModule {}
