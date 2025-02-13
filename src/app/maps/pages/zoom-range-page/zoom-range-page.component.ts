import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector:'maps-zoom-range-page',
  standalone: false,
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {


  public zoom :number = 3;
  public map?: Map;
  public lngLat: LngLat = new LngLat(14.5,41)

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'HTML Element was not found';

    this.map = new Map({
      container: this.divMap.nativeElement || 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom // starting zoom
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener(){
    if( !this.map )throw 'Map not initialised'

    this.map.on('style.load', () => {
      this.map!.setProjection({
          type: 'globe', // Set projection to globe
      });
  });
    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() > 10){
        this.map!.zoomTo(10);
      }
      if(this.map!.getZoom() < 0){
        this.map!.zoomTo(0);
      }
    });

    this.map.on('moveend', ()=>{
      this.lngLat = this.map!.getCenter();
    });
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value:string ){
    this.zoom = Number(value)
    this.map?.zoomTo(this.zoom);
  }

}
