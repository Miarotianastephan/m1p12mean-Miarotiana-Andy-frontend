import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
@Component({
  selector: 'app-clientremorquage',
  imports: [InputTextModule, FloatLabelModule, ButtonModule, CommonModule],
  templateUrl: './clientremorquage.component.html',
  styleUrl: './clientremorquage.component.css',
})
export class ClientremorquageComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  dorequest: boolean = false;
  yourposition: boolean = false;
  markers: L.Marker[] = [L.marker([-18.8792, 47.5079])];
  private currentMarker: L.Marker | null = null; // Pour stocker le marqueur de la position actuelle
  private destinationMarker: L.Marker | null = null; // Pour stocker le marqueur de la destination
  private isCurrentPositionSet: boolean = false; // État pour savoir si la position actuelle est définie
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }

  private initMap() {
    const iconDefault = L.icon({
      iconUrl:
        'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41"%3E%3Cpath fill="%23000" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.3 12.5 28.5 12.5 28.5S25 20.8 25 12.5C25 5.6 19.4 0 12.5 0zm0 19.5c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/%3E%3C/svg%3E',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      if (this.dorequest === true) {
        const latLng = event.latlng;
        if (!this.isCurrentPositionSet) {
          this.currentMarker = L.marker([latLng.lat, latLng.lng], {
            icon: iconDefault,
          })
            .addTo(this.map)
            .bindPopup('<b>Position actuelle</b>')
            .openPopup();

          this.isCurrentPositionSet = true;
        } else {
          if (this.destinationMarker) {
            this.map.removeLayer(this.destinationMarker);
          }
          this.destinationMarker = L.marker([latLng.lat, latLng.lng], {
            icon: iconDefault,
          })
            .addTo(this.map)
            .bindPopup('<b>Destination finale</b>')
            .openPopup();
          this.isCurrentPositionSet = false;
        }
      }
    });
  }

  private centerMap() {
    const bounds = L.latLngBounds(
      this.markers.map((marker) => marker.getLatLng())
    );
    this.map.fitBounds(bounds);
  }
}
