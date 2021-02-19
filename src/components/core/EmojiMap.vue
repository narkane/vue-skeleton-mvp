<template>
  <div>
    <div id="tdCursor">doge</div>
    <div id="zindex1">
      <canvas class="map" id="emoji-map" width="600" height="400">
        Canvas isnt loading in your browser!
      </canvas>
    </div>
    <gmap-map
      ref="mapRef"
      class="map"
      id="g-map"
      :center="center"
      :zoom="minZoomLevel"
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

// const what3words = require('@what3words/api')

// what3words.setOptions({ key: process.env.VUE_APP_W3W_API_KEY })

export default {
  data() {
    return {
      emojiIndexReference: {
        '00': '&x#1F004',
        '01': ''
      },
      currentScale: 2,
      scale: [256 / 36, 256 / 1296, 256 / 46656, 256 / 1679616],
      bounds: {
        ne: {
          lat: null,
          lng: null
        },
        sw: {
          lat: null,
          lng: null
        }
      },
      mapCoordSize: {
        width: null,
        height: null
      },
      mouse: {
        down: false,
        dir: -1,
        oldX: 0
      },
      // default to Montreal
      // change this to whatever makes sense
      center: { lat: 45, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      canvas: null,
      ctx: null,
      gmap: null,
      zoom: null,
      minZoomLevel: 3,
      rectOptions: null,
      tileSize: 256,
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
  computed: {
    google: gmapApi
  },
  mounted() {
    this.init()
    this.geolocate()
    // this.drawEmojis()
    // this.drawGrid()
    // this.addMarker()
  },
  methods: {
    noNegCoords(map) {
      this.bounds.ne.lat = 180 - (map.getBounds().getNorthEast().lat() + 90)
      this.bounds.sw.lat = 180 - (map.getBounds().getSouthWest().lat() + 90)
      this.bounds.ne.lng = map.getBounds().getNorthEast().lng() + 180
      this.bounds.sw.lng = map.getBounds().getSouthWest().lng() + 180
      // console.log(this.bounds)
    },
    mercCoords(map) {
      this.bounds.ne = this.mercatorProject(map.getBounds().getNorthEast())
      this.bounds.sw = this.mercatorProject(map.getBounds().getSouthWest())
      // this.bounds.ne.lng = map.getBounds().getNorthEast().lng() + 180
      // this.bounds.sw.lng = map.getBounds().getSouthWest().lng() + 180
      // console.log(this.bounds)
    },
    init() {
      this.gmap = document.getElementById('g-map')
      this.canvas = document.getElementById('emoji-map')
      this.ctx = this.canvas.getContext('2d')

      // this.mouseCheck()

      this.$refs.mapRef.$mapPromise.then((map) => {
        // map.panTo({lat: 1.38, lng: 103.80})
        // map.set('draggable', false)
        // map.addListener('mousedown', () => {
        //   map.setZoom(map.getZoom() + 1)
        // })
        map.addListener('mousemove', (event) => {
          // console.log('mercP: ' + this.mercatorProject(event.latLng))
          const coordsLabel = document.getElementById('tdCursor')
          let x = this.mercatorProject(event.latLng).x
          x = x.toFixed(4)
          let y = this.mercatorProject(event.latLng).y
          y = y.toFixed(4)
          coordsLabel.innerHTML = `X: ${x}  Y: ${y}`
        })

        map.addListener('bounds_changed', () => {
          // Limit the zoom level by gmaps zoom
          this.currentScale = this.breakLayer(map.getZoom())
          if (map.getZoom() < this.minZoomLevel) {
            map.setZoom(this.minZoomLevel)
          } else {
            this.zoom = map.getZoom()
            // set bounds
            // this.noNegCoords(map)
            this.mercCoords(map)
            this.mapCoordSize.width =
              Math.abs(
                (this.bounds.ne.x / 256 - this.bounds.sw.x / 256) * 256
              ) >=
              256 / 2
                ? 256 -
                  Math.abs(
                    (this.bounds.ne.x / 256 - this.bounds.sw.x / 256) * 256
                  )
                : Math.abs(
                    (this.bounds.ne.x / 256 - this.bounds.sw.x / 256) * 256
                  )
            this.mapCoordSize.height = Math.abs(
              this.bounds.sw.y - this.bounds.ne.y
            )
            // console.log(`mapCoordwidth: ${this.mapCoordSize.width}`)

            if (this.canvas.getContext) {
              this.drawGrid()
              this.drawEmojis(
                (this.scale[this.currentScale] * this.canvas.width) /
                  this.mapCoordSize.width
              )
            } else {
              // canvas unsupported
              console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAH!!!')
            }
          }
        })
      })
      this.canvas.width = this.gmap.offsetWidth
    },
    breakLayer(gZoom) {
      if (gZoom < 7) {
        return 0
      } else if (gZoom < 12) {
        return 1
      } else if (gZoom < 18) {
        return 2
      }
      return 3
    },
    drawEmojis(nextLineDist) {
      const pxPerCoord = this.canvas.width / this.mapCoordSize.width
      let sqID =
        (this.bounds.sw.x + this.firstLatLineInPx() / pxPerCoord) /
        this.scale[this.currentScale]
      sqID += 1
      if (sqID === 37) {
        sqID = 1
      }
      console.log(sqID)
      this.ctx.font = '12px OpenMojiColor'
      for (let i = 0; i < this.canvas.width; i += nextLineDist) {
        this.ctx.fillText(
          '\u{1f9c1}',
          this.firstLatLineInPx() + i,
          this.firstLngLineInPx() + 20
        )
        for (let j = nextLineDist; j < this.canvas.height; j += nextLineDist) {
          this.ctx.fillText(
            '\u{1f9c1}',
            this.firstLatLineInPx() + i,
            this.firstLngLineInPx() + j + 12
          )
        }
      }
    },
    drawGrid() {
      const level = this.scale[this.currentScale]

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.ctx.beginPath()
      // metersPerPx = 156543.03392 * Math.cos(latLng.lat() * Math.PI / 180) / Math.pow(2, zoom)
      // pxsPerMeter = Math.pow(2, this.zoom) / (156543.03392 * Math.cos(latLng.lat() * Math.PI / 180))
      // 1113174.304 mEL @ zoom = 1 */
      this.ctx.strokeStyle = `rgb(${255 / this.currentScale}, ${
        255 / this.currentScale
      }, 255)`
      const pxPerEmoji =
        1113174.304 /
        ((156543.03392 * Math.cos((this.center.lat * Math.PI) / 180)) /
          Math.pow(2, this.zoom))

      this.drawLat(level)
      this.drawLng(level)
      this.ctx.closePath()
      this.ctx.stroke()
      // console.log(this.eZoom())
    },
    drawLat(emojis) {
      const pxPerCoord = this.canvas.width / this.mapCoordSize.width
      // console.log(`ppC lat: ${pxPerCoord}`)
      for (
        let i = this.firstLatLineInPx();
        i < this.canvas.width;
        i += emojis * pxPerCoord
      ) {
        // console.log(`round: ${this.firstLatLineInPx()}`)
        this.ctx.moveTo(i, 0)
        this.ctx.lineTo(i, 400)
      }
    },
    drawLng(emojis) {
      const pxPerCoord = this.canvas.width / this.mapCoordSize.width
      // console.log(`ppC lng: ${pxPerCoord}`)
      for (
        let i = this.firstLngLineInPx();
        i < this.canvas.height;
        i += emojis * pxPerCoord
      ) {
        this.ctx.moveTo(this.canvas.width, i)
        this.ctx.lineTo(0, i)
      }
    },
    firstLatLineInPx() {
      const emojis = this.scale[this.currentScale]
      const pxPerCoord = this.canvas.width / this.mapCoordSize.width
      return (
        (Math.ceil(this.bounds.sw.x / emojis) * emojis - this.bounds.sw.x) *
        pxPerCoord
      )
    },
    firstLngLineInPx() {
      const emojis = this.scale[this.currentScale]
      const pxPerCoord = this.canvas.height / this.mapCoordSize.height
      return (
        (Math.ceil(this.bounds.ne.y / emojis) * emojis - this.bounds.ne.y) *
        pxPerCoord
      )
    },
    // The mapping between latitude, longitude and pixels is defined by the web
    // mercator projection.
    mercatorProject(latLng) {
      let siny = Math.sin((latLng.lat() * Math.PI) / 180)
      // Truncating to 0.9999 effectively limits latitude to 89.189. This is
      // about a third of a tile past the edge of the world tile.
      siny = Math.min(Math.max(siny, -0.9999), 0.9999)
      return new this.google.maps.Point(
        this.tileSize * (0.5 + latLng.lng() / 360),
        this.tileSize *
          (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
      )
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
        // console.log(`center: ${this.center}`)
      })
    },
    mouseCheck() {
      const that = this
      document.onmousedown = function () {
        that.mouse.down = true
      }
      document.onmouseup = function () {
        that.mouse.down = false
      }
      document.onmousemove = function (e) {
        if (that.mouse.down) {
          // that.mouse.dir = e.pageX - that.mouse.oldX
          // that.drawGrid()
          // that.mouse.dir = 0
        }
        // that.mouse.oldX = e.pageX
      }
    },
    addRemoteLibraries() {
      const plugin = document.createElement('script')
      plugin.setAttribute(
        'src',
        `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPS_API_KEY}&callback=init&libraries=&v=weekly`
      )
      plugin.async = true
      document.head.appendChild(plugin)
      // console.log(process.env.VUE_APP_GMAPS_API_KEY)
    }
  }
}
</script>

<style scoped>
#emoji-map {
  width: 600px; /* calc(100vw - 60px);*/
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
  position: relative;
  left: calc((100vw - 600px) / 2 - 30px);
  height: 400px;
}
#g-map {
  width: 600px;
}
</style>
