import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { FullscreenPageComponent } from './pages/fullscreen-page/fullscreen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';


@NgModule({
  declarations: [
    ZoomRangePageComponent,
    PropertiesPageComponent,
    MarkersPageComponent,
    FullscreenPageComponent,
    MapsLayoutComponent,
    SideMenuComponent,
    MiniMapComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
