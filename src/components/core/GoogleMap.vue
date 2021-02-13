<template>
  <div id="zindex2">
    <!-- <div class="emoji-font">
      &#x1f9c1; Search and add a pin👨‍💻
      <BR />
      <label>
        <gmap-autocomplete @place_changed="setPlace"> </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br />
    </div>
    <br /> -->
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      // default to Montreal
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },

  mounted() {
    this.geolocate()
    this.addMarker()
  },

  methods: {
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
      })
    }
  }
}
</script>

<style>
.map {
  height: 400px;
  /* width: 100%; */
}
#g-map {
  width: 100%;
}
#zindex2 {
  /* position: absolute; */
  z-index: 1;
  /* pointer-events: none; */
}
</style>
