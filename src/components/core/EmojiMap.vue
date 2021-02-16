<template>
  <div>
    <div id="zindex1">
      <canvas class="map" id="emoji-map" width="300" height="400">
        Canvas isnt loading in your browser!
      </canvas>
    </div>
    <gmap-map
      ref="mapRef"
      class="map"
      id="g-map"
      :center="center"
      :zoom="zoom"
      :styles="mapStyleList.blueGray"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

export default {
  computed: {
    google: gmapApi
  },
  data() {
    return {
      // default to Montreal
      // change this to whatever makes sense
      center: { lat: 45, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      canvas: null,
      ctx: null,
      gmap: null,
      zoom: 1,
      mapStyleList: {
        retro: [
          {
            featureType: 'administrative',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'poi',
            stylers: [
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            featureType: 'water',
            stylers: [
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            featureType: 'transit',
            stylers: [
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            featureType: 'landscape',
            stylers: [
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            featureType: 'road.highway',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road.local',
            stylers: [
              {
                visibility: 'on'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'on'
              }
            ]
          },
          {
            featureType: 'water',
            stylers: [
              {
                color: '#84afa3'
              },
              {
                lightness: 52
              }
            ]
          },
          {
            stylers: [
              {
                saturation: -17
              },
              {
                gamma: 0.36
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                color: '#3f518c'
              }
            ]
          }
        ],
        blueGray: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
              {
                saturation: 36
              },
              {
                color: '#000000'
              },
              {
                lightness: 40
              }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#000000'
              },
              {
                lightness: 16
              }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 17
              },
              {
                weight: 1.2
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'landscape.natural.landcover',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'landscape.natural.terrain',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 21
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#bc0a0a'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#181818'
              },
              {
                lightness: 17
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 29
              },
              {
                weight: 0.2
              },
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#3e3e3e'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 18
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#3e3e3e'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#fb0000'
              },
              {
                visibility: 'on'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 16
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#3e3e3e'
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 19
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#ff0000'
              },
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 17
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#287a74'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.geolocate()
    this.initCanvas()
    this.addMarker()
    this.setPlace(this.center)
  },
  methods: {
    initCanvas() {
      this.canvas = document.getElementById('emoji-map')
      this.gmap = document.getElementById('g-map')
      console.log('AAAAAAAAAAAAAAAH')
      this.$refs.mapRef.$mapPromise.then((map) => {
        // map.panTo({lat: 1.38, lng: 103.80})
        this.zoom = map.getZoom()
        this.google.maps.event.addListener(map, 'zoom_changed', () => {
          this.zoom = map.getZoom()
          console.log(`gmap: ${this.zoom}`)
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.drawGrid()
        })
      })

      this.canvas.width = this.gmap.offsetWidth

      if (this.canvas.getContext) {
        this.drawGrid()
      } else {
        // canvas unsupported
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAH!!!')
      }
    },
    drawGrid() {
      this.ctx = this.canvas.getContext('2d')

      this.ctx.beginPath()
      // metersPerPx = 156543.03392 * Math.cos(latLng.lat() * Math.PI / 180) / Math.pow(2, zoom)
      // pxsPerMeter = Math.pow(2, this.zoom) / (156543.03392 * Math.cos(latLng.lat() * Math.PI / 180))
      // 1113174.304 mEL @ zoom = 1 */
      this.ctx.strokeStyle = 'rgb(255, 255, 255)'
      const pxPerEmoji =
        1113174.304 /
        ((156543.03392 * Math.cos((this.center.lat * Math.PI) / 180)) /
          Math.pow(2, this.zoom))

      this.drawLat(pxPerEmoji)
      this.drawLng(pxPerEmoji)
      this.ctx.closePath()
      this.ctx.stroke()
    },
    drawLat(ppe) {
      for (let i = 0 + this.canvas.width / 2; i < this.canvas.width; i += ppe) {
        // console.log(pxPerEmoji)
        // 14.222669) {
        // Lat lines
        this.ctx.moveTo(i, 0)
        this.ctx.lineTo(i, 400)
        this.ctx.moveTo(this.canvas.width - i, 0)
        this.ctx.lineTo(this.canvas.width - i, 400)
      }
    },
    drawLng(ppe) {
      for (
        let i = 0 + this.canvas.height / 2;
        i < this.canvas.height;
        i += ppe
      ) {
        // Lng lines
        this.ctx.moveTo(0, i)
        this.ctx.lineTo(this.canvas.width, i)
        this.ctx.moveTo(0, this.canvas.height - i)
        this.ctx.lineTo(this.canvas.width, this.canvas.height - i)
      }
    },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(this.center)
      })
    }
  }
}
</script>

<style scoped>
#emoji-map {
  width: calc(100vw - 60px);
  border: 2px dashed orange;
  color: white;
  pointer-events: none;
}
#zindex1 {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}
.map {
  height: 400px;
}
#g-map {
  width: 100%;
}
</style>
