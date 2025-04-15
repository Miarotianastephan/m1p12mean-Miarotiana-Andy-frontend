import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import instanceAxios from '../../api/axios-config';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clientremorquage',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './clientremorquage.component.html',
  styleUrl: './clientremorquage.component.css',
})
export class ClientremorquageComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  currentMarker: L.Marker | null = null;
  destinationMarker: L.Marker | null = null;
  isCurrentPositionSet: boolean = false;
  dorequest: boolean = false;
  yourposition: boolean = false;
  markers: L.Marker[] = [L.marker([-18.8792, 47.5079])];
  value_position_actuel: string | null = null;
  value_destination: string | null = null;
  plaque_voiture: string | null = null;
  constructor(private queryClient: QueryClient, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }
  initValeur() {
    this.value_destination = null;
    this.value_position_actuel = null;
    this.plaque_voiture = null;
    this.isCurrentPositionSet = false;
    this.currentMarker = null;
    this.destinationMarker = null;
    this.dorequest = false;
    this.yourposition = false;
  }
  onErrorgetRemorqueClient() {
    const error = this.usegetRemorqueClient.isError();
    return error;
  }
  onLoadinggetRemorqueClient() {
    return this.usegetRemorqueClient.isPending();
  }
  async getRemorqueClient() {
    try {
      const reponse = await instanceAxios.get('/client/get_remorque', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return reponse.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetRemorqueClient = injectQuery(() => ({
    queryKey: ['remorque', localStorage.getItem('token')],
    queryFn: this.getRemorqueClient,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }));

  async RequestRemorque(body: any) {
    try {
      const reponse = await instanceAxios.post(
        '/client/request_remorque',
        body,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return reponse.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  useRequestRemorque = injectMutation(() => ({
    mutationFn: (body: any) => this.RequestRemorque(body),
    onError() {},
    onSuccess() {},
    onSettled: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['remorque', localStorage.getItem('token')],
      });
    },
  }));
  async OnUseReqeustRemorque() {
    const reponse = await this.useRequestRemorque.mutateAsync({
      point_current: this.value_position_actuel,
      point_final: this.value_destination,
    });
    if (reponse.succes === true) {
      this.initValeur();
    } else {
      alert(reponse.error);
    }
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
    const interval = setInterval(() => {
      if (
        !this.onLoadinggetRemorqueClient() &&
        !this.onErrorgetRemorqueClient() &&
        this.usegetRemorqueClient.data()
      ) {
        clearInterval(interval);
        const data = this.usegetRemorqueClient.data().data;
        console.log('ato ooo', data);
        data.forEach((element: any) => {
          const split_current_place = element.point_current.split(',');
          const split_final_place = element.point_final.split(',');
          L.marker([split_current_place[0], split_current_place[1]], {
            icon: iconDefault,
          })
            .addTo(this.map)
            .bindPopup('<b>Position actuelle</b>')
            .openPopup();
          L.marker([split_final_place[0], split_final_place[1]], {
            icon: iconDefault,
          })
            .addTo(this.map)
            .bindPopup('<b>Destination finale</b>')
            .openPopup();
          L.polyline(
            [
              [split_current_place[0], split_current_place[1]],
              [split_final_place[0], split_final_place[1]],
            ],
            {
              color: 'blue',
              weight: 4,
              opacity: 0.7,
            }
          ).addTo(this.map);
        });
      }
    }, 200);
    L.tileLayer(baseMapURl).addTo(this.map);
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      if (this.dorequest === true && this.destinationMarker === null) {
        const latLng = event.latlng;
        if (!this.isCurrentPositionSet) {
          this.currentMarker = L.marker([latLng.lat, latLng.lng], {
            icon: iconDefault,
          })
            .addTo(this.map)
            .bindPopup('<b>Position actuelle</b>')
            .openPopup();

          this.isCurrentPositionSet = true;
          this.value_position_actuel =
            latLng.lat.toFixed(3) + ',' + latLng.lng.toFixed(3);
        } else {
          this.destinationMarker = L.marker([latLng.lat, latLng.lng], {
            icon: iconDefault,
          })
            .addTo(this.map)
            .bindPopup('<b>Destination finale</b>')
            .openPopup();

          this.value_destination =
            latLng.lat.toFixed(3) + ',' + latLng.lng.toFixed(3);
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

  calculateDistance() {
    const from = turf.point([
      this.currentMarker!.getLatLng().lng,
      this.currentMarker!.getLatLng().lat,
    ]);
    const to = turf.point([
      this.destinationMarker!.getLatLng().lng,
      this.destinationMarker!.getLatLng().lat,
    ]);
    const distance = {
      km: turf.distance(from, to, { units: 'kilometers' }).toFixed(2),
      price:
        Number(turf.distance(from, to, { units: 'kilometers' }).toFixed(2)) *
        15000,
    };
    return distance;
  }
}
