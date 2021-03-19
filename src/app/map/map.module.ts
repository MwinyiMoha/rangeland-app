import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { MapViewComponent } from './map-view/map-view.component';


@NgModule({
  declarations: [MapViewComponent, MapComponent],
  imports: [
    SharedModule,
    MapRoutingModule
  ]
})
export class MapModule { }
