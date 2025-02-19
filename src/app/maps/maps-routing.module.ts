import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullscreenPageComponent } from './pages/fullscreen-page/fullscreen-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';

const routes: Routes = [
  {path: '', component:MapsLayoutComponent,
    children:[
      {path: 'fullscreen', component:FullscreenPageComponent },
      {path: 'markers', component:MarkersPageComponent },
      {path: 'properties', component:PropertiesPageComponent },
      {path: 'zoom-range', component:ZoomRangePageComponent },
      {path: '**', redirectTo: 'fullscreen' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
