import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface PlainMarker {
  color:string,
  lngLat: [number,number]
}

@Component({
  selector:'maps-markers-page',
  standalone: false,
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3,37)
  public markerList: Marker[] = [];

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'HTML Element was not found';

    this.map = new Map({
      container: this.divMap.nativeElement || 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });

    this.readFromLocalStorage();

    // const marker = new Marker().setLngLat(this.currentLngLat).addTo(this.map)
  }

  ngOnDestroy(): void {
    this.markerList.forEach( marker => {
      marker.remove();
    })
  }

  createMarker(){
    if(!this.map) return

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    this.addMarker(this.map!.getCenter(),color)
  }

  addMarker( lngLat : LngLat, color:string = 'red'){
    if(!this.map) return

    const marker = new Marker({
      color:color,
      draggable:true,
    })
    .setLngLat(lngLat)
    .addTo(this.map);

    marker.on('dragend', ()=> {
      this.saveToLocalStorage();
    })

    this.markerList.push( marker );

    this.saveToLocalStorage();


  }

  deleteMarker(i:number){
    this.markerList[i].remove()
    this.markerList.splice(i,1)
    this.saveToLocalStorage();
  }

  flyTo( marker : Marker ){
    if(!this.map) return

    this.map.flyTo({
      zoom: 5,
      center: marker.getLngLat(),
    })
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markerList.map( (marker) => {
      return {
        color: marker._color,
        lngLat: marker.getLngLat().toArray(),
      }
    });

    localStorage.setItem('plainMarkers',JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers:PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach( ({color,lngLat}) => {
      const [lng,lat] = lngLat;
      const coords = new LngLat(lng,lat);
      this.addMarker(coords,color);
    })

  }

}
