import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'maps-mini-map',
  standalone: false,
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number,number];


  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3,37)
  public markerList: Marker[] = [];

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'HTML Element was not found';
    if(!this.lngLat) throw 'LngLat must not be null';

    this.map = new Map({
      container: this.divMap.nativeElement || 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 8, // starting zoom
      interactive:false,
    });

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const marker = new Marker({
      color:color,
    })
    .setLngLat(this.lngLat)
    .addTo(this.map);

    // const marker = new Marker().setLngLat(this.currentLngLat).addTo(this.map)
  }

}
