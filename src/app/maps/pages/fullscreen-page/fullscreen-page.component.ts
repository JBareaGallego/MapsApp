import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector:'maps-fullscreen-page',
  standalone: false,
  templateUrl: './fullscreen-page.component.html',
  styleUrl: './fullscreen-page.component.css'
})
export class FullscreenPageComponent implements AfterViewInit {


  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'HTML Element was not found';

    const map = new Map({
      container: this.divMap.nativeElement || 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });
  }
}
