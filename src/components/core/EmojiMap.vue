<template>
  <div>
    <div id="tdCursor">World Coordinates</div>
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
      emojiIndexReference: [
        {
          0: '1F004',
          1: '1F329',
          2: '1F34D',
          3: '1F371',
          4: '1F3A2',
          5: '1F3C7',
          6: '1F409',
          7: '1F42C',
          8: '1F447',
          9: '1F44D',
          a: '1F45F',
          b: '1F469',
          c: '1F470',
          d: '1F492',
          e: '1F4C1',
          f: '1F517',
          g: '1F596',
          h: '1F60D',
          i: '1F631',
          j: '1F64F',
          k: '1F69E',
          l: '1F6E4',
          m: '1F916',
          n: '1F91E',
          o: '1F935',
          p: '1F956',
          q: '1F97C',
          r: '1F9A1',
          s: '1F9BE',
          t: '1F9D1',
          u: '1F9EC',
          v: '1FA97',
          w: '23F0',
          x: '2695',
          y: '270B',
          z: 'E009'
        },
        {
          0: '1F0CF',
          1: '1F32A',
          2: '1F34E',
          3: '1F372',
          4: '1F3A3',
          5: '1F3C8',
          6: '1F40A',
          7: '1F42D',
          8: '1F447',
          9: '1F44D',
          a: '1F460',
          b: '1F469',
          c: '1F471',
          d: '1F493',
          e: '1F4C4',
          f: '1F525',
          g: '1F596',
          h: '1F60E',
          i: '1F632',
          j: '1F64F',
          k: '1F69F',
          l: '1F6E5',
          m: '1F917',
          n: '1F91E',
          o: '1F935',
          p: '1F957',
          q: '1F97D',
          r: '1F9A2',
          s: '1F9BF',
          t: '1F9D1',
          u: '1F9ED',
          v: '1FA98',
          w: '23F1',
          x: '2696',
          y: '270B',
          z: 'E010'
        },
        {
          0: '1F301',
          1: '1F32B',
          2: '1F34F',
          3: '1F373',
          4: '1F3A4',
          5: '1F3CA',
          6: '1F40B',
          7: '1F42E',
          8: '1F447',
          9: '1F44D',
          a: '1F461',
          b: '1F469',
          c: '1F472',
          d: '1F494',
          e: '1F4CA',
          f: '1F526',
          g: '1F596',
          h: '1F60F',
          i: '1F633',
          j: '1F64F',
          k: '1F6A0',
          l: '1F6E9',
          m: '1F918',
          n: '1F91E',
          o: '1F935',
          p: '1F958',
          q: '1F97E',
          r: '1F9A3',
          s: '1F9C0',
          t: '1F9D1',
          u: '1F9EE',
          v: '1FA9A',
          w: '23F3',
          x: '2697',
          y: '270B',
          z: 'E09B'
        },
        {
          0: '1F302',
          1: '1F32C',
          2: '1F350',
          3: '1F374',
          4: '1F3A6',
          5: '1F3CB',
          6: '1F40C',
          7: '1F42F',
          8: '1F447',
          9: '1F44D',
          a: '1F462',
          b: '1F469',
          c: '1F473',
          d: '1F495',
          e: '1F4CB',
          f: '1F527',
          g: '1F596',
          h: '1F610',
          i: '1F634',
          j: '1F64F',
          k: '1F6A1',
          l: '1F6EB',
          m: '1F918',
          n: '1F91F',
          o: '1F936',
          p: '1F959',
          q: '1F97F',
          r: '1F9A4',
          s: '1F9C1',
          t: '1F9D1',
          u: '1F9EF',
          v: '1FA9B',
          w: '2600',
          x: '2699',
          y: '270B',
          z: 'E09C'
        },
        {
          0: '1F303',
          1: '1F32D',
          2: '1F351',
          3: '1F375',
          4: '1F3A7',
          5: '1F3CC',
          6: '1F40D',
          7: '1F430',
          8: '1F448',
          9: '1F44E',
          a: '1F463',
          b: '1F469',
          c: '1F474',
          d: '1F496',
          e: '1F4CC',
          f: '1F528',
          g: '1F596',
          h: '1F611',
          i: '1F635',
          j: '1F64F',
          k: '1F6A3',
          l: '1F6EC',
          m: '1F918',
          n: '1F91F',
          o: '1F937',
          p: '1F95A',
          q: '1F980',
          r: '1F9A5',
          s: '1F9C2',
          t: '1F9D1',
          u: '1F9F0',
          v: '1FA9C',
          w: '2601',
          x: '269B',
          y: '270B',
          z: 'E0A1'
        },
        {
          0: '1F304',
          1: '1F32E',
          2: '1F352',
          3: '1F377',
          4: '1F3A8',
          5: '1F3CD',
          6: '1F40E',
          7: '1F431',
          8: '1F448',
          9: '1F44E',
          a: '1F466',
          b: '1F469',
          c: '1F475',
          d: '1F497',
          e: '1F4CE',
          f: '1F529',
          g: '1F596',
          h: '1F612',
          i: '1F636',
          j: '1F64F',
          k: '1F6A4',
          l: '1F6F0',
          m: '1F918',
          n: '1F91F',
          o: '1F937',
          p: '1F95B',
          q: '1F981',
          r: '1F9A6',
          s: '1F9C3',
          t: '1F9D1',
          u: '1F9F1',
          v: '1FA9D',
          w: '2602',
          x: '269C',
          y: '270B',
          z: 'E0A8'
        },
        {
          0: '1F305',
          1: '1F32F',
          2: '1F353',
          3: '1F378',
          4: '1F3A9',
          5: '1F3CE',
          6: '1F40F',
          7: '1F431',
          8: '1F448',
          9: '1F44E',
          a: '1F467',
          b: '1F469',
          c: '1F476',
          d: '1F498',
          e: '1F4CF',
          f: '1F52A',
          g: '1F5A4',
          h: '1F613',
          i: '1F637',
          j: '1F680',
          k: '1F6A6',
          l: '1F6F3',
          m: '1F918',
          n: '1F91F',
          o: '1F938',
          p: '1F95C',
          q: '1F982',
          r: '1F9A7',
          s: '1F9C4',
          t: '1F9D7',
          u: '1F9F2',
          v: '1FA9E',
          w: '2603',
          x: '26A0',
          y: '270C',
          z: 'E0AA'
        },
        {
          0: '1F306',
          1: '1F330',
          2: '1F354',
          3: '1F379',
          4: '1F3AA',
          5: '1F3CF',
          6: '1F410',
          7: '1F432',
          8: '1F448',
          9: '1F44E',
          a: '1F468',
          b: '1F469',
          c: '1F477',
          d: '1F499',
          e: '1F4D4',
          f: '1F52C',
          g: '1F5A5',
          h: '1F614',
          i: '1F638',
          j: '1F681',
          k: '1F6A8',
          l: '1F6F4',
          m: '1F918',
          n: '1F91F',
          o: '1F938',
          p: '1F95D',
          q: '1F983',
          r: '1F9A8',
          s: '1F9C5',
          t: '1F9D8',
          u: '1F9F3',
          v: '1FA9F',
          w: '2604',
          x: '26A1',
          y: '270C',
          z: 'E0AB'
        },
        {
          0: '1F307',
          1: '1F331',
          2: '1F355',
          3: '1F37A',
          4: '1F3AB',
          5: '1F3D0',
          6: '1F411',
          7: '1F433',
          8: '1F448',
          9: '1F44E',
          a: '1F468',
          b: '1F469',
          c: '1F477',
          d: '1F49A',
          e: '1F4D5',
          f: '1F52D',
          g: '1F5B1',
          h: '1F615',
          i: '1F639',
          j: '1F682',
          k: '1F6A9',
          l: '1F6F5',
          m: '1F919',
          n: '1F91F',
          o: '1F939',
          p: '1F95E',
          q: '1F984',
          r: '1F9A9',
          s: '1F9C6',
          t: '1F9D9',
          u: '1F9F4',
          v: '1FAA0',
          w: '2605',
          x: '26A7',
          y: '270C',
          z: 'E0AC'
        },
        {
          0: '1F308',
          1: '1F332',
          2: '1F356',
          3: '1F37B',
          4: '1F3AC',
          5: '1F3D1',
          6: '1F412',
          7: '1F434',
          8: '1F448',
          9: '1F44E',
          a: '1F468',
          b: '1F469',
          c: '1F478',
          d: '1F49B',
          e: '1F4DA',
          f: '1F530',
          g: '1F5BC',
          h: '1F616',
          i: '1F63A',
          j: '1F683',
          k: '1F6AA',
          l: '1F6F6',
          m: '1F919',
          n: '1F920',
          o: '1F939',
          p: '1F95F',
          q: '1F985',
          r: '1F9AA',
          s: '1F9C7',
          t: '1F9D9',
          u: '1F9F5',
          v: '1FAA1',
          w: '260E',
          x: '26B0',
          y: '270C',
          z: 'E0AC'
        },
        {
          0: '1F309',
          1: '1F333',
          2: '1F357',
          3: '1F37C',
          4: '1F3AD',
          5: '1F3D2',
          6: '1F413',
          7: '1F435',
          8: '1F449',
          9: '1F44F',
          a: '1F468',
          b: '1F469',
          c: '1F47A',
          d: '1F49C',
          e: '1F4DB',
          f: '1F531',
          g: '1F5C2',
          h: '1F617',
          i: '1F63B',
          j: '1F684',
          k: '1F6AB',
          l: '1F6F7',
          m: '1F919',
          n: '1F921',
          o: '1F93A',
          p: '1F960',
          q: '1F986',
          r: '1F9AB',
          s: '1F9C8',
          t: '1F9DA',
          u: '1F9F6',
          v: '1FAA2',
          w: '2614',
          x: '26BD',
          y: '270C',
          z: 'E0AD'
        },
        {
          0: '1F30A',
          1: '1F334',
          2: '1F358',
          3: '1F37D',
          4: '1F3AE',
          5: '1F3D3',
          6: '1F414',
          7: '1F436',
          8: '1F449',
          9: '1F44F',
          a: '1F468',
          b: '1F469',
          c: '1F47B',
          d: '1F49D',
          e: '1F4DC',
          f: '1F534',
          g: '1F5C3',
          h: '1F618',
          i: '1F63C',
          j: '1F685',
          k: '1F6AC',
          l: '1F6F8',
          m: '1F919',
          n: '1F922',
          o: '1F93C',
          p: '1F961',
          q: '1F987',
          r: '1F9AC',
          s: '1F9C9',
          t: '1F9DA',
          u: '1F9F7',
          v: '1FAA3',
          w: '2615',
          x: '26BE',
          y: '270C',
          z: 'E0AD'
        },
        {
          0: '1F30B',
          1: '1F335',
          2: '1F359',
          3: '1F37E',
          4: '1F3AF',
          5: '1F3D4',
          6: '1F415',
          7: '1F437',
          8: '1F449',
          9: '1F44F',
          a: '1F468',
          b: '1F469',
          c: '1F47C',
          d: '1F49E',
          e: '1F4DD',
          f: '1F536',
          g: '1F5C4',
          h: '1F619',
          i: '1F63D',
          j: '1F686',
          k: '1F6AE',
          l: '1F6F9',
          m: '1F919',
          n: '1F923',
          o: '1F93D',
          p: '1F962',
          q: '1F988',
          r: '1F9AD',
          s: '1F9CA',
          t: '1F9DB',
          u: '1F9F8',
          v: '1FAA4',
          w: '2618',
          x: '26C4',
          y: '270D',
          z: 'E0B1'
        },
        {
          0: '1F30C',
          1: '1F336',
          2: '1F35A',
          3: '1F37F',
          4: '1F3B0',
          5: '1F3D5',
          6: '1F415',
          7: '1F438',
          8: '1F449',
          9: '1F44F',
          a: '1F468',
          b: '1F469',
          c: '1F47D',
          d: '1F49F',
          e: '1F4E1',
          f: '1F53A',
          g: '1F5D1',
          h: '1F61A',
          i: '1F63E',
          j: '1F687',
          k: '1F6B0',
          l: '1F6FA',
          m: '1F919',
          n: '1F924',
          o: '1F93E',
          p: '1F963',
          q: '1F989',
          r: '1F9AE',
          s: '1F9CB',
          t: '1F9DB',
          u: '1F9F9',
          v: '1FAA5',
          w: '261D',
          x: '26C5',
          y: '270D',
          z: 'E0B2'
        },
        {
          0: '1F311',
          1: '1F337',
          2: '1F35B',
          3: '1F380',
          4: '1F3B1',
          5: '1F3D6',
          6: '1F416',
          7: '1F439',
          8: '1F449',
          9: '1F44F',
          a: '1F468',
          b: '1F469',
          c: '1F47E',
          d: '1F4A0',
          e: '1F4EB',
          f: '1F54A',
          g: '1F5D3',
          h: '1F61B',
          i: '1F63F',
          j: '1F688',
          k: '1F6B2',
          l: '1F6FB',
          m: '1F91A',
          n: '1F925',
          o: '1F93F',
          p: '1F964',
          q: '1F98A',
          r: '1F9B4',
          s: '1F9CD',
          t: '1F9DC',
          u: '1F9FA',
          v: '1FAA6',
          w: '261D',
          x: '26C8',
          y: '270D',
          z: 'E0C0'
        },
        {
          0: '1F312',
          1: '1F338',
          2: '1F35C',
          3: '1F381',
          4: '1F3B2',
          5: '1F3D7',
          6: '1F417',
          7: '1F43A',
          8: '1F449',
          9: '1F44F',
          a: '1F468',
          b: '1F469',
          c: '1F47F',
          d: '1F4A1',
          e: '1F4EE',
          f: '1F56F',
          g: '1F5DC',
          h: '1F61C',
          i: '1F640',
          j: '1F689',
          k: '1F6B4',
          l: '1F6FC',
          m: '1F91A',
          n: '1F926',
          o: '1F940',
          p: '1F965',
          q: '1F98B',
          r: '1F9B5',
          s: '1F9D0',
          t: '1F9DC',
          u: '1F9FB',
          v: '1FAA7',
          w: '261D',
          x: '26CF',
          y: '270D',
          z: 'E0C2'
        },
        {
          0: '1F313',
          1: '1F339',
          2: '1F35D',
          3: '1F382',
          4: '1F3B3',
          5: '1F3DB',
          6: '1F418',
          7: '1F43B',
          8: '1F44A',
          9: '1F450',
          a: '1F468',
          b: '1F469',
          c: '1F481',
          d: '1F4A2',
          e: '1F4EF',
          f: '1F570',
          g: '1F5DD',
          h: '1F61D',
          i: '1F641',
          j: '1F68A',
          k: '1F6B8',
          l: '1F90C',
          m: '1F91A',
          n: '1F926',
          o: '1F941',
          p: '1F966',
          q: '1F98C',
          r: '1F9B5',
          s: '1F9D1',
          t: '1F9DD',
          u: '1F9FC',
          v: '1FAA8',
          w: '261D',
          x: '26E9',
          y: '270D',
          z: 'E0C3'
        },
        {
          0: '1F314',
          1: '1F33A',
          2: '1F35E',
          3: '1F383',
          4: '1F3B4',
          5: '1F3DC',
          6: '1F419',
          7: '1F43B',
          8: '1F44A',
          9: '1F450',
          a: '1F468',
          b: '1F469',
          c: '1F481',
          d: '1F4A4',
          e: '1F4F0',
          f: '1F573',
          g: '1F5DE',
          h: '1F61E',
          i: '1F642',
          j: '1F68B',
          k: '1F6BC',
          l: '1F90C',
          m: '1F91A',
          n: '1F927',
          o: '1F942',
          p: '1F967',
          q: '1F98D',
          r: '1F9B5',
          s: '1F9D1',
          t: '1F9DD',
          u: '1F9FD',
          v: '1FAB0',
          w: '261D',
          x: '26EA',
          y: '270D',
          z: 'E0C4'
        },
        {
          0: '1F315',
          1: '1F33B',
          2: '1F35F',
          3: '1F384',
          4: '1F3B5',
          5: '1F3DD',
          6: '1F41A',
          7: '1F43C',
          8: '1F44A',
          9: '1F450',
          a: '1F468',
          b: '1F469',
          c: '1F482',
          d: '1F4A5',
          e: '1F4F6',
          f: '1F574',
          g: '1F5F3',
          h: '1F61F',
          i: '1F643',
          j: '1F68C',
          k: '1F6BD',
          l: '1F90C',
          m: '1F91A',
          n: '1F928',
          o: '1F943',
          p: '1F968',
          q: '1F98E',
          r: '1F9B5',
          s: '1F9D1',
          t: '1F9DE',
          u: '1F9FE',
          v: '1FAB1',
          w: '261D',
          x: '26F0',
          y: '270F',
          z: 'E0C5'
        },
        {
          0: '1F316',
          1: '1F33C',
          2: '1F360',
          3: '1F385',
          4: '1F3B6',
          5: '1F3EE',
          6: '1F41B',
          7: '1F43D',
          8: '1F44A',
          9: '1F450',
          a: '1F468',
          b: '1F469',
          c: '1F482',
          d: '1F4A6',
          e: '1F4F7',
          f: '1F575',
          g: '1F5FB',
          h: '1F620',
          i: '1F644',
          j: '1F68D',
          k: '1F6BF',
          l: '1F90C',
          m: '1F91A',
          n: '1F929',
          o: '1F944',
          p: '1F969',
          q: '1F98F',
          r: '1F9B5',
          s: '1F9D1',
          t: '1F9DE',
          u: '1FA70',
          v: '1FAB2',
          w: '262E',
          x: '26F1',
          y: '2712',
          z: 'E0C6'
        },
        {
          0: '1F317',
          1: '1F33D',
          2: '1F361',
          3: '1F387',
          4: '1F3B7',
          5: '1F3F4',
          6: '1F41C',
          7: '1F43E',
          8: '1F44A',
          9: '1F450',
          a: '1F468',
          b: '1F469',
          c: '1F483',
          d: '1F4A7',
          e: '1F4F8',
          f: '1F575',
          g: '1F5FC',
          h: '1F621',
          i: '1F645',
          j: '1F68E',
          k: '1F6C0',
          l: '1F90C',
          m: '1F91B',
          n: '1F92A',
          o: '1F945',
          p: '1F96A',
          q: '1F990',
          r: '1F9B5',
          s: '1F9D1',
          t: '1F9DE',
          u: '1FA71',
          v: '1FAB3',
          w: '262F',
          x: '26F2',
          y: '2728',
          z: 'E1C4'
        },
        {
          0: '1F318',
          1: '1F33E',
          2: '1F362',
          3: '1F388',
          4: '1F3B8',
          5: '1F3F5',
          6: '1F41D',
          7: '1F43F',
          8: '1F44A',
          9: '1F450',
          a: '1F468',
          b: '1F469',
          c: '1F484',
          d: '1F4A8',
          e: '1F4F9',
          f: '1F576',
          g: '1F5FD',
          h: '1F622',
          i: '1F645',
          j: '1F68F',
          k: '1F6C1',
          l: '1F90C',
          m: '1F91B',
          n: '1F92B',
          o: '1F947',
          p: '1F96B',
          q: '1F991',
          r: '1F9B6',
          s: '1F9D1',
          t: '1F9DF',
          u: '1FA7A',
          v: '1FAB4',
          w: '2639',
          x: '26F3',
          y: '2744',
          z: 'E1C7'
        },
        {
          0: '1F319',
          1: '1F33F',
          2: '1F363',
          3: '1F389',
          4: '1F3B9',
          5: '1F3F7',
          6: '1F41E',
          7: '1F440',
          8: '1F44B',
          9: '1F451',
          a: '1F468',
          b: '1F469',
          c: '1F485',
          d: '1F4A9',
          e: '1F4FA',
          f: '1F577',
          g: '1F5FF',
          h: '1F623',
          i: '1F646',
          j: '1F690',
          k: '1F6C2',
          l: '1F90D',
          m: '1F91B',
          n: '1F92C',
          o: '1F948',
          p: '1F96C',
          q: '1F992',
          r: '1F9B6',
          s: '1F9D1',
          t: '1F9DF',
          u: '1FA80',
          v: '1FAB5',
          w: '263A',
          x: '26F5',
          y: '274C',
          z: 'E1CA'
        },
        {
          0: '1F31A',
          1: '1F340',
          2: '1F364',
          3: '1F38A',
          4: '1F3BA',
          5: '1F3F8',
          6: '1F41F',
          7: '1F441',
          8: '1F44B',
          9: '1F452',
          a: '1F468',
          b: '1F469',
          c: '1F486',
          d: '1F4AA',
          e: '1F4FB',
          f: '1F578',
          g: '1F600',
          h: '1F624',
          i: '1F646',
          j: '1F691',
          k: '1F6C3',
          l: '1F90E',
          m: '1F91B',
          n: '1F92D',
          o: '1F949',
          p: '1F96D',
          q: '1F993',
          r: '1F9B6',
          s: '1F9D1',
          t: '1F9DF',
          u: '1FA81',
          v: '1FAB6',
          w: '2640',
          x: '26F7',
          y: '27B0',
          z: 'E20B'
        },
        {
          0: '1F31B',
          1: '1F341',
          2: '1F365',
          3: '1F38B',
          4: '1F3BB',
          5: '1F3F9',
          6: '1F420',
          7: '1F442',
          8: '1F44B',
          9: '1F453',
          a: '1F468',
          b: '1F469',
          c: '1F486',
          d: '1F4AA',
          e: '1F4FC',
          f: '1F579',
          g: '1F601',
          h: '1F625',
          i: '1F647',
          j: '1F692',
          k: '1F6CD',
          l: '1F90F',
          m: '1F91B',
          n: '1F92E',
          o: '1F94A',
          p: '1F96E',
          q: '1F994',
          r: '1F9B6',
          s: '1F9D1',
          t: '1F9E0',
          u: '1FA82',
          v: '1FAC0',
          w: '2642',
          x: '26F9',
          y: '27BF',
          z: 'E20D'
        },
        {
          0: '1F31C',
          1: '1F342',
          2: '1F366',
          3: '1F38D',
          4: '1F3BC',
          5: '1F3FA',
          6: '1F421',
          7: '1F443',
          8: '1F44B',
          9: '1F454',
          a: '1F468',
          b: '1F469',
          c: '1F487',
          d: '1F4AA',
          e: '1F4FD',
          f: '1F57A',
          g: '1F602',
          h: '1F626',
          i: '1F647',
          j: '1F693',
          k: '1F6CE',
          l: '1F90F',
          m: '1F91B',
          n: '1F92F',
          o: '1F94B',
          p: '1F96F',
          q: '1F995',
          r: '1F9B6',
          s: '1F9D1',
          t: '1F9E1',
          u: '1FA83',
          v: '1FAC1',
          w: '265F',
          x: '26FA',
          y: '2B50',
          z: 'E24C'
        },
        {
          0: '1F31D',
          1: '1F343',
          2: '1F367',
          3: '1F38E',
          4: '1F3BD',
          5: '1F400',
          6: '1F422',
          7: '1F444',
          8: '1F44B',
          9: '1F455',
          a: '1F468',
          b: '1F469',
          c: '1F487',
          d: '1F4AA',
          e: '1F506',
          f: '1F58A',
          g: '1F603',
          h: '1F627',
          i: '1F649',
          j: '1F694',
          k: '1F6CF',
          l: '1F90F',
          m: '1F91C',
          n: '1F930',
          o: '1F94C',
          p: '1F970',
          q: '1F996',
          r: '1F9B6',
          s: '1F9D1',
          t: '1F9E2',
          u: '1FA84',
          v: '1FAC2',
          w: '2660',
          x: '26FD',
          y: '2B55',
          z: 'E2C8'
        },
        {
          0: '1F31E',
          1: '1F344',
          2: '1F368',
          3: '1F38F',
          4: '1F3BE',
          5: '1F401',
          6: '1F423',
          7: '1F445',
          8: '1F44B',
          9: '1F456',
          a: '1F468',
          b: '1F469',
          c: '1F488',
          d: '1F4AA',
          e: '1F50A',
          f: '1F58C',
          g: '1F604',
          h: '1F628',
          i: '1F64A',
          j: '1F695',
          k: '1F6D0',
          l: '1F90F',
          m: '1F91C',
          n: '1F931',
          o: '1F94D',
          p: '1F971',
          q: '1F997',
          r: '1F9B7',
          s: '1F9D1',
          t: '1F9E3',
          u: '1FA85',
          v: '1FAD0',
          w: '2663',
          x: '2702',
          y: '2BEA',
          z: 'E2CB'
        },
        {
          0: '1F31F',
          1: '1F345',
          2: '1F369',
          3: '1F393',
          4: '1F3BF',
          5: '1F402',
          6: '1F424',
          7: '1F446',
          8: '1F44C',
          9: '1F457',
          a: '1F468',
          b: '1F469',
          c: '1F489',
          d: '1F4AB',
          e: '1F50B',
          f: '1F58D',
          g: '1F605',
          h: '1F629',
          i: '1F64B',
          j: '1F696',
          k: '1F6D1',
          l: '1F90F',
          m: '1F91C',
          n: '1F932',
          o: '1F94E',
          p: '1F972',
          q: '1F998',
          r: '1F9B8',
          s: '1F9D1',
          t: '1F9E4',
          u: '1FA86',
          v: '1FAD1',
          w: '2665',
          x: '2708',
          y: 'E000',
          z: 'E2CD'
        },
        {
          0: '1F320',
          1: '1F346',
          2: '1F36A',
          3: '1F396',
          4: '1F3C0',
          5: '1F403',
          6: '1F425',
          7: '1F446',
          8: '1F44C',
          9: '1F458',
          a: '1F468',
          b: '1F469',
          c: '1F48A',
          d: '1F4AC',
          e: '1F50C',
          f: '1F590',
          g: '1F606',
          h: '1F62A',
          i: '1F64B',
          j: '1F697',
          k: '1F6D2',
          l: '1F90F',
          m: '1F91C',
          n: '1F932',
          o: '1F94F',
          p: '1F973',
          q: '1F999',
          r: '1F9B8',
          s: '1F9D1',
          t: '1F9E5',
          u: '1FA90',
          v: '1FAD2',
          w: '2666',
          x: '2709',
          y: 'E001',
          z: 'E2CE'
        },
        {
          0: '1F321',
          1: '1F347',
          2: '1F36B',
          3: '1F397',
          4: '1F3C1',
          5: '1F404',
          6: '1F426',
          7: '1F446',
          8: '1F44C',
          9: '1F459',
          a: '1F468',
          b: '1F469',
          c: '1F48B',
          d: '1F4AE',
          e: '1F50E',
          f: '1F590',
          g: '1F607',
          h: '1F62B',
          i: '1F64C',
          j: '1F698',
          k: '1F6D6',
          l: '1F910',
          m: '1F91C',
          n: '1F932',
          o: '1F950',
          p: '1F974',
          q: '1F99A',
          r: '1F9B9',
          s: '1F9D1',
          t: '1F9E6',
          u: '1FA91',
          v: '1FAD3',
          w: '2668',
          x: '270A',
          y: 'E003',
          z: 'E2CF'
        },
        {
          0: '1F324',
          1: '1F348',
          2: '1F36C',
          3: '1F399',
          4: '1F3C2',
          5: '1F405',
          6: '1F427',
          7: '1F446',
          8: '1F44C',
          9: '1F45A',
          a: '1F468',
          b: '1F46A',
          c: '1F48C',
          d: '1F4AF',
          e: '1F511',
          f: '1F590',
          g: '1F608',
          h: '1F62C',
          i: '1F64C',
          j: '1F699',
          k: '1F6D7',
          l: '1F911',
          m: '1F91C',
          n: '1F932',
          o: '1F951',
          p: '1F975',
          q: '1F99B',
          r: '1F9B9',
          s: '1F9D1',
          t: '1F9E7',
          u: '1FA92',
          v: '1FAD4',
          w: '267B',
          x: '270A',
          y: 'E004',
          z: 'E2D4'
        },
        {
          0: '1F325',
          1: '1F349',
          2: '1F36D',
          3: '1F39E',
          4: '1F3C3',
          5: '1F406',
          6: '1F428',
          7: '1F446',
          8: '1F44C',
          9: '1F45B',
          a: '1F468',
          b: '1F46E',
          c: '1F48E',
          d: '1F4BB',
          e: '1F512',
          f: '1F590',
          g: '1F609',
          h: '1F62D',
          i: '1F64C',
          j: '1F69A',
          k: '1F6E0',
          l: '1F912',
          m: '1F91D',
          n: '1F932',
          o: '1F952',
          p: '1F976',
          q: '1F99C',
          r: '1F9BA',
          s: '1F9D1',
          t: '1F9E8',
          u: '1FA93',
          v: '1FAD5',
          w: '267E',
          x: '270A',
          y: 'E005',
          z: 'E342'
        },
        {
          0: '1F326',
          1: '1F34A',
          2: '1F36E',
          3: '1F39F',
          4: '1F3C4',
          5: '1F407',
          6: '1F429',
          7: '1F446',
          8: '1F44C',
          9: '1F45C',
          a: '1F468',
          b: '1F46E',
          c: '1F48F',
          d: '1F4BC',
          e: '1F513',
          f: '1F590',
          g: '1F60A',
          h: '1F62E',
          i: '1F64C',
          j: '1F69B',
          k: '1F6E1',
          l: '1F913',
          m: '1F91E',
          n: '1F932',
          o: '1F953',
          p: '1F977',
          q: '1F99D',
          r: '1F9BB',
          s: '1F9D1',
          t: '1F9E9',
          u: '1FA94',
          v: '231A',
          w: '267F',
          x: '270A',
          y: 'E006',
          z: 'E343'
        },
        {
          0: '1F327',
          1: '1F34B',
          2: '1F36F',
          3: '1F3A0',
          4: '1F3C5',
          5: '1F408',
          6: '1F42A',
          7: '1F447',
          8: '1F44D',
          9: '1F45D',
          a: '1F469',
          b: '1F470',
          c: '1F490',
          d: '1F4BE',
          e: '1F514',
          f: '1F590',
          g: '1F60B',
          h: '1F62F',
          i: '1F64C',
          j: '1F69C',
          k: '1F6E2',
          l: '1F914',
          m: '1F91E',
          n: '1F933',
          o: '1F954',
          p: '1F978',
          q: '1F99E',
          r: '1F9BC',
          s: '1F9D1',
          t: '1F9EA',
          u: '1FA95',
          v: '231B',
          w: '2692',
          x: '270A',
          y: 'E007',
          z: 'E344'
        },
        {
          0: '1F328',
          1: '1F34C',
          2: '1F370',
          3: '1F3A1',
          4: '1F3C6',
          5: '1F408',
          6: '1F42B',
          7: '1F447',
          8: '1F44D',
          9: '1F45E',
          a: '1F469',
          b: '1F470',
          c: '1F491',
          d: '1F4BF',
          e: '1F516',
          f: '1F595',
          g: '1F60C',
          h: '1F630',
          i: '1F64C',
          j: '1F69D',
          k: '1F6E3',
          l: '1F915',
          m: '1F91E',
          n: '1F934',
          o: '1F955',
          p: '1F97A',
          q: '1F99F',
          r: '1F9BD',
          s: '1F9D1',
          t: '1F9EB',
          u: '1FA96',
          v: '2328',
          w: '2693',
          x: '270A',
          y: 'E008',
          z: 'E345'
        }
      ],
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
          coordsLabel.innerHTML = `X: ${x}  Y: ${y}\n sqID.x: ${this.findSqIDByWorldCoords(
            x
          )} sqID.y: ${this.findSqIDByWorldCoords(y).toString(36)}`
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
              // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAH!!!')
            }
          }
        })
      })
      this.canvas.width = this.gmap.offsetWidth
    },
    findSqIDByWorldCoords(wCoords) {
      return Math.floor(wCoords / this.scale[this.currentScale]) % 36
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
      console.log(`nextLineDist: ${nextLineDist}`)
      const pxPerCoord = this.canvas.width / this.mapCoordSize.width
      const sqID = {
        x: this.findSqIDByWorldCoords(this.bounds.sw.x),
        // (this.bounds.sw.x + this.firstLatLineInPx() / pxPerCoord) /
        // this.scale[this.currentScale],
        y: this.findSqIDByWorldCoords(this.bounds.ne.y)
        //     (this.bounds.ne.y + this.firstLngLineInPx() / pxPerCoord) /
        //     this.scale[this.currentScale]
      }
      // sqID.x = Math.floor(sqID.x) + 1
      // sqID.y = Math.floor(sqID.y) + 1
      // if (sqID.x === 37) {
      //   sqID.x = 1
      // }
      // if (sqID.y === 37) {
      //   sqID.y = 1
      // }
      // console.log(sqID)
      this.ctx.font = '12px OpenMojiColor'
      for (let i = 0; i < this.canvas.width; i += nextLineDist) {
        this.ctx.fillText(
          String.fromCodePoint(
            `0x${this.emojiIndexReference[sqID.x][sqID.y.toString(36)]}`
          ),
          this.firstLatLineInPx() - nextLineDist + i,
          this.firstLngLineInPx() - nextLineDist + 12
        )
        if (sqID.x < 35) {
          sqID.x++
        } else {
          sqID.x = 0
        }
        sqID.y = this.findSqIDByWorldCoords(this.bounds.ne.y)
        // console.log(sqID.y.toString(36))
        for (let j = nextLineDist; j < this.canvas.height; j += nextLineDist) {
          this.ctx.fillText(
            String.fromCodePoint(
              `0x${this.emojiIndexReference[sqID.x][sqID.y.toString(36)]}`
            ),
            this.firstLatLineInPx() - nextLineDist + i,
            this.firstLngLineInPx() - nextLineDist + j + 12
          )
          // console.log(sqID.y.toString(36))
          sqID.y++
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
