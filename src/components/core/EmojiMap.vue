<template>
  <div>
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

    <div id="ui">
      <!-- <div id="vert"><div style="width: 36px" /></div> -->
      <div id="vert">
        <v-btn class="ui-component" id="emoji-button" @click="toggleEmojis"
          >&#x1F642;</v-btn
        >
      </div>
      <div id="vert">
        <div class="ui-component theme--dark v-btn" id="tdCursor">O E C</div>
        <textarea id="link-area" spellcheck="false">
          http://www.ourearth.care/
        </textarea>
      </div>
      <div id="vert">
        <v-btn
          class="ui-component zoom"
          @click="zoomIn"
          style="
            border-bottom: 1px solid #121212;
            border-radius: 3px 3px 0px 0px;
          "
          >+</v-btn
        >
        <v-btn
          class="ui-component zoom"
          @click="zoomOut"
          style="border-radius: 0px 0px 3px 3px"
          >-</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

// const what3words = require('@what3words/api')
// what3words.setOptions({ key: process.env.VUE_APP_W3W_API_KEY })

export default {
  props: ['reqEmojiLoc'],
  data() {
    return {
      canvas: null,
      ctx: null,
      map: null,
      // gmap: null,
      emojiLocation: '',
      emojiToggle: 'Off',
      emojiIndexReference: {
        0: {
          0: '🌰',
          1: '🔀',
          2: '🐥',
          3: '🌼',
          4: '👙',
          5: '📹',
          6: '🎁',
          7: '🥊',
          8: '🎆',
          9: '👱',
          a: '😁',
          b: '🤞',
          c: '😜',
          d: '🍖',
          e: '🐕',
          f: '🛌',
          g: '🐰',
          h: '😨',
          i: '💿',
          j: '😽',
          k: '🚹',
          l: '🙏',
          m: '🦓',
          n: '👒',
          o: '🌔',
          p: '🐏',
          q: '🍼',
          r: '🎿',
          s: '🤎'
        },
        1: {
          0: '👃',
          1: '🛬',
          2: '🚮',
          3: '💠',
          4: '📨',
          5: '🐘',
          6: '🗽',
          7: '📿',
          8: '🍻',
          9: '🎫',
          a: '🤩',
          b: '💫',
          c: '🐐',
          d: '👥',
          e: '🌲',
          f: '💨',
          g: '😼',
          h: '🎎',
          i: '🚡',
          j: '😫',
          k: '👝',
          l: '🏃',
          m: '🏂',
          n: '🥜',
          o: '🙇',
          p: '🎇',
          q: '😏',
          r: '🥥',
          s: '🏤'
        },
        2: {
          0: '🎺',
          1: '🥈',
          2: '🖖',
          3: '🏏',
          4: '😤',
          5: '📩',
          6: '🦩',
          7: '🩱',
          8: '⏰',
          9: '💉',
          a: '👾',
          b: '🐒',
          c: '🦸',
          d: '🚢',
          e: '🎳',
          f: '🚘',
          g: '🧈',
          h: '🔪',
          i: '👘',
          j: '🥤',
          k: '🔌',
          l: '🎻',
          m: '🔫',
          n: '🍩',
          o: '👢',
          p: '🥇',
          q: '🎱',
          r: '🤿',
          s: '🤧'
        },
        3: {
          0: '😄',
          1: '👐',
          2: '💚',
          3: '🌚',
          4: '🌓',
          5: '👳',
          6: '🙁',
          7: '🤥',
          8: '📟',
          9: '🚏',
          a: '🌕',
          b: '🧡',
          c: '😒',
          d: '🚖',
          e: '🔨',
          f: '🎷',
          g: '🍲',
          h: '📊',
          i: '🍕',
          j: '🚅',
          k: '🌖',
          l: '🥡',
          m: '💈',
          n: '🍑',
          o: '🤺',
          p: '🏦',
          q: '🐗',
          r: '📐',
          s: '🍡'
        },
        4: {
          0: '🩹',
          1: '🕌',
          2: '👹',
          3: '🌐',
          4: '🐻',
          5: '🥅',
          6: '💖',
          7: '📇',
          8: '💑',
          9: '✊',
          a: '👿',
          b: '🎸',
          c: '🤍',
          d: '😭',
          e: '🍭',
          f: '🌻',
          g: '🦶',
          h: '🤬',
          i: '📗',
          j: '🍂',
          k: '🏈',
          l: '🤡',
          m: '👽',
          n: '🙅',
          o: '👯',
          p: '🤫',
          q: '🍬',
          r: '🥞',
          s: '🦃'
        },
        5: {
          0: '🐬',
          1: '😿',
          2: '🦈',
          3: '📱',
          4: '🌹',
          5: '😖',
          6: '🦧',
          7: '😋',
          8: '🥣',
          9: '🏨',
          a: '🍌',
          b: '🚶',
          c: '😍',
          d: '🎒',
          e: '👫',
          f: '🍹',
          g: '🤴',
          h: '🧢',
          i: '🐣',
          j: '🍈',
          k: '🎂',
          l: '🍾',
          m: '🪓',
          n: '🧏',
          o: '🎵',
          p: '🐧',
          q: '😳',
          r: '🎡',
          s: '🐶'
        },
        6: {
          0: '🪁',
          1: '🍫',
          2: '🔮',
          3: '🦺',
          4: '👷',
          5: '🥝',
          6: '🧀',
          7: '🖤',
          8: '🏣',
          9: '😧',
          a: '🎉',
          b: '💣',
          c: '👛',
          d: '💛',
          e: '🤰',
          f: '🦐',
          g: '😶',
          h: '🚔',
          i: '📆',
          j: '🐟',
          k: '🍨',
          l: '👊',
          m: '🚗',
          n: '😟',
          o: '📡',
          p: '🤏',
          q: '💢',
          r: '🎃',
          s: '🚬'
        },
        7: {
          0: '👗',
          1: '😣',
          2: '🚧',
          3: '🚕',
          4: '🏑',
          5: '👈',
          6: '😵',
          7: '🤨',
          8: '🌸',
          9: '🔏',
          a: '🔁',
          b: '👮',
          c: '🤕',
          d: '👅',
          e: '🤪',
          f: '💌',
          g: '💊',
          h: '🥕',
          i: '🤐',
          j: '🚪',
          k: '💞',
          l: '🌮',
          m: '🌵',
          n: '😢',
          o: '🍝',
          p: '🐀',
          q: '🐍',
          r: '🦔',
          s: '🚙'
        },
        8: {
          0: '🎬',
          1: '🤝',
          2: '👡',
          3: '🍗',
          4: '😛',
          5: '🚳',
          6: '💂',
          7: '🎲',
          8: '📛',
          9: '💁',
          a: '💅',
          b: '💝',
          c: '🛕',
          d: '😊',
          e: '💏',
          f: '🐋',
          g: '😞',
          h: '🔋',
          i: '🏥',
          j: '🚆',
          k: '💇',
          l: '🍳',
          m: '📔',
          n: '🎟',
          o: '📼',
          p: '🏢',
          q: '🚫',
          r: '🌿',
          s: '🌟'
        },
        9: {
          0: '😂',
          1: '🔥',
          2: '🐇',
          3: '🥗',
          4: '📁',
          5: '🦦',
          6: '🌒',
          7: '🍄',
          8: '💳',
          9: '🖕',
          a: '📦',
          b: '🍃',
          c: '🏒',
          d: '📬',
          e: '🛐',
          f: '🥪',
          g: '🎠',
          h: '🤜',
          i: '🦀',
          j: '🐆',
          k: '📌',
          l: '⏭',
          m: '🐮',
          n: '🪒',
          o: '🏩',
          p: '💙',
          q: '🐖',
          r: '😎',
          s: '🍧'
        },
        a: {
          0: '🐯',
          1: '💺',
          2: '🐂',
          3: '🎰',
          4: '🎦',
          5: '🤒',
          6: '😃',
          7: '🐢',
          8: '🍒',
          9: '🏬',
          a: '🎄',
          b: '🥖',
          c: '🧤',
          d: '🦹',
          e: '🧑',
          f: '🏅',
          g: '💐',
          h: '🛑',
          i: '👣',
          j: '🍰',
          k: '👀',
          l: '🛵',
          m: '💀',
          n: '📖',
          o: '🐛',
          p: '🚈',
          q: '🍛',
          r: '💸',
          s: '🙀'
        },
        b: {
          0: '😬',
          1: '📈',
          2: '🚺',
          3: '🚚',
          4: '🍵',
          5: '👴',
          6: '🧅',
          7: '📎',
          8: '🍥',
          9: '🧓',
          a: '🎾',
          b: '🐔',
          c: '🧐',
          d: '🏰',
          e: '🗯',
          f: '✨',
          g: '🥻',
          h: '👺',
          i: '🍤',
          j: '🦾',
          k: '🚵',
          l: '🤺',
          m: '🚝',
          n: '🐝',
          o: '🎼',
          p: '👎',
          q: '🍉',
          r: '🚛',
          s: '🐺'
        },
        c: {
          0: '🤗',
          1: '🥀',
          2: '🙉',
          3: '🚷',
          4: '🎈',
          5: '🌃',
          6: '🏓',
          7: '🦖',
          8: '⏮',
          9: '😈',
          a: '🥩',
          b: '🥓',
          c: '📍',
          d: '🦯',
          e: '😉',
          f: '⏪',
          g: '🌋',
          h: '📯',
          i: '📙',
          j: '💬',
          k: '🎧',
          l: '📉',
          m: '🚇',
          n: '🎍',
          o: '🦉',
          p: '🐫',
          q: '😪',
          r: '🙊',
          s: '🙊'
        },
        d: {
          0: '📅',
          1: '😥',
          2: '🧎',
          3: '🥺',
          4: '💪',
          5: '🙍',
          6: '😴',
          7: '🐾',
          8: '💮',
          9: '😠',
          a: '🌠',
          b: '🍔',
          c: '🤛',
          d: '📓',
          e: '👼',
          f: '🥧',
          g: '👰',
          h: '🐁',
          i: '➰',
          j: '🌺',
          k: '📵',
          l: '🌝',
          m: '🥨',
          n: '🛸',
          o: '😗',
          p: '😀',
          q: '🚍',
          r: '🦑',
          s: '🃏'
        },
        e: {
          0: '👋',
          1: '🏆',
          2: '🐲',
          3: '🥰',
          4: '👇',
          5: '🚁',
          6: '💜',
          7: '🙆',
          8: '🌌',
          9: '🌜',
          a: '🎌',
          b: '🍷',
          c: '👍',
          d: '🥟',
          e: '🦿',
          f: '🥋',
          g: '🥱',
          h: '🛒',
          i: '🛺',
          j: '🤑',
          k: '🚰',
          l: '🚓',
          m: '📷',
          n: '👪',
          o: '🤳',
          p: '😇',
          q: '👻',
          r: '🦂',
          s: '🧄'
        },
        f: {
          0: '🥶',
          1: '😑',
          2: '📌',
          3: '🩳',
          4: '🧊',
          5: '💭',
          6: '📋',
          7: '📞',
          8: '🐊',
          9: '✋',
          a: '🤚',
          b: '🚭',
          c: '🎣',
          d: '🚋',
          e: '🙃',
          f: '🌉',
          g: '🤘',
          h: '🤯',
          i: '🦋',
          j: '🌅',
          k: '🦨',
          l: '📲',
          m: '🙎',
          n: '🎤',
          o: '🥐',
          p: '🤖',
          q: '😌',
          r: '🎭',
          s: '📒'
        },
        g: {
          0: '🍱',
          1: '🚨',
          2: '🚴',
          3: '🖖',
          4: '😺',
          5: '🌱',
          6: '⛓',
          7: '🍠',
          8: '💓',
          9: '⏩',
          a: '❎',
          b: '🚃',
          c: '📏',
          d: '🚻',
          e: '🥴',
          f: '🍯',
          g: '👓',
          h: '🎐',
          i: '😰',
          j: '🎽',
          k: '🦼',
          l: '⏹',
          m: '📕',
          n: '👭',
          o: '🕍',
          p: '😓',
          q: '🚵',
          r: '🌄',
          s: '😙'
        },
        h: {
          0: '🪑',
          1: '🐳',
          2: '🛫',
          3: '🥳',
          4: '🥂',
          5: '😯',
          6: '🚯',
          7: '📪',
          8: '📣',
          9: '🚌',
          a: '🧉',
          b: '🍜',
          c: '🪕',
          d: '👔',
          e: '🤭',
          f: '🐅',
          g: '🤮',
          h: '🤓',
          i: '📮',
          j: '🚐',
          k: '💒',
          l: '🐩',
          m: '🦅',
          n: '👸',
          o: '🎀',
          p: '🔱',
          q: '🌞',
          r: '🔖',
          s: '🥑'
        },
        i: {
          0: '👤',
          1: '🦊',
          2: '👲',
          3: '🎨',
          4: '🥵',
          5: '🔩',
          6: '🍸',
          7: '🔒',
          8: '🧍',
          9: '🍴',
          a: '👌',
          b: '🤱',
          c: '🌆',
          d: '😾',
          e: '🐵',
          f: '🦒',
          g: '😕',
          h: '😅',
          i: '🦕',
          j: '🚿',
          k: '😷',
          l: '🔄',
          m: '🧃',
          n: '😩',
          o: '🥠',
          p: '🚠',
          q: '🔧',
          r: '🎏',
          s: '📺'
        },
        j: {
          0: '🌯',
          1: '🧒',
          2: '🎑',
          3: '🐱',
          4: '⏺',
          5: '😐',
          6: '🚼',
          7: '🛀',
          8: '📜',
          9: '🦥',
          a: '🐷',
          b: '😔',
          c: '🍚',
          d: '🦏',
          e: '⏳',
          f: '📘',
          g: '🚣',
          h: '🍆',
          i: '🏄',
          j: '🏹',
          k: '🐡',
          l: '🐉',
          m: '💆',
          n: '🚱',
          o: '🍀',
          p: '🐄',
          q: '🥃',
          r: '👑',
          s: '🤣'
        },
        k: {
          0: '🏐',
          1: '🍢',
          2: '📚',
          3: '🏀',
          4: '🔎',
          5: '🍊',
          6: '🪀',
          7: '🦎',
          8: '👨',
          9: '🚥',
          a: '🗻',
          b: '😘',
          c: '🏮',
          d: '📥',
          e: '🙂',
          f: '🏁',
          g: '🎊',
          h: '🛷',
          i: '🚀',
          j: '🎶',
          k: '🚸',
          l: '🎅',
          m: '🩰',
          n: '💔',
          o: '🥙',
          p: '🐽',
          q: '📫',
          r: '🚟',
          s: '🐸'
        },
        l: {
          0: '🪐',
          1: '🍙',
          2: '⏸',
          3: '❌',
          4: '🧥',
          5: '🚽',
          6: '👦',
          7: '💩',
          8: '💘',
          9: '🏪',
          a: '🔦',
          b: '🦌',
          c: '🏴',
          d: '🍟',
          e: '🧦',
          f: '📠',
          g: '🎴',
          h: '🩸',
          i: '🌛',
          j: '🔗',
          k: '🎩',
          l: '💡',
          m: '🍋',
          n: '🥔',
          o: '🔓',
          p: '🗿',
          q: '🏊',
          r: '😡',
          s: '🎹'
        },
        m: {
          0: '🐜',
          1: '🙋',
          2: '👏',
          3: '⏯',
          4: '😲',
          5: '💃',
          6: '🐙',
          7: '🩲',
          8: '🪂',
          9: '🏯',
          a: '🌈',
          b: '🏇',
          c: '💋',
          d: '🥫',
          e: '🖐',
          f: '🐌',
          g: '🚊',
          h: '🛶',
          i: '🕴',
          j: '🍓',
          k: '👟',
          l: '🧣',
          m: '🐑',
          n: '🥄',
          o: '👆',
          p: '🚴',
          q: '🐓',
          r: '😻',
          s: '🦄'
        },
        n: {
          0: '🏉',
          1: '🍁',
          2: '🔬',
          3: '🧆',
          4: '🚄',
          5: '🚦',
          6: '🌗',
          7: '🐦',
          8: '👉',
          9: '🍐',
          a: '🌇',
          b: '😦',
          c: '🍶',
          d: '🐠',
          e: '🌳',
          f: '👚',
          g: '📄',
          h: '🐹',
          i: '👂',
          j: '🥚',
          k: '👶',
          l: '🤟',
          m: '🦗',
          n: '🌁',
          o: '🦍',
          p: '🤢',
          q: '🚉',
          r: '🦮',
          s: '🌙'
        },
        o: {
          0: '👠',
          1: '🚜',
          2: '🐈',
          3: '🩺',
          4: '🏺',
          5: '📸',
          6: '🔳',
          7: '🏊',
          8: '🦻',
          9: '🐤',
          a: '✅',
          b: '🔑',
          c: '👬',
          d: '🏠',
          e: '🚒',
          f: '💯',
          g: '🌀',
          h: '🏭',
          i: '🤤',
          j: '🌷',
          k: '🍍',
          l: '🚑',
          m: '💧',
          n: '🏡',
          o: '🎮',
          p: '📝',
          q: '💦',
          r: '🚎',
          s: '🦁'
        },
        p: {
          0: '🤔',
          1: '🌭',
          2: '💾',
          3: '📧',
          4: '🎯',
          5: '😆',
          6: '🌂',
          7: '🌑',
          8: '🔐',
          9: '🐨',
          a: '🤵',
          b: '💄',
          c: '🥉',
          d: '🍿',
          e: '😝',
          f: '👞',
          g: '🍇',
          h: '🏄',
          i: '🧕',
          j: '📭',
          k: '🍞',
          l: '🔲',
          m: '🙌',
          n: '🌴',
          o: '🍎',
          p: '💼',
          q: '🍏',
          r: '👄',
          s: '🍺'
        },
        q: {
          0: '💻',
          1: '🦪',
          2: '🔰',
          3: '🎋',
          4: '🛴',
          5: '🦆',
          6: '💎',
          7: '🌘',
          8: '🍅',
          9: '📂',
          a: '🎢',
          b: '💟',
          c: '🐎',
          d: '🕺',
          e: '📀',
          f: '💥',
          g: '👵',
          h: '🦽',
          i: '🥒',
          j: '🐪',
          k: '🏇',
          l: '🚂',
          m: '🤠',
          n: '🔭',
          o: '🏫',
          p: '🐞',
          q: '🎪',
          r: '🥁',
          s: '📢'
        },
        r: {
          0: '🏛',
          1: '🎥',
          2: '🚤',
          3: '🍣',
          4: '🐴',
          5: '🥛',
          6: '🔍',
          7: '🧔',
          8: '😱',
          9: '🍪',
          a: '🤙',
          b: '🕰',
          c: '📑',
          d: '🥌',
          e: '🤶',
          f: '🥢',
          g: '😸',
          h: '📻',
          i: '🙄',
          j: '📃',
          k: '🐃',
          l: '👩',
          m: '🐭',
          n: '👧',
          o: '💗',
          p: '🧇',
          q: '😚',
          r: '🐼',
          s: '🚞'
        },
        s: {
          0: '🍘',
          1: '🐚',
          2: '🌊',
          3: '👖',
          4: '👕',
          5: '🎓',
          6: '🪔',
          7: '📰',
          8: '🚲',
          9: '🍮',
          a: '🛁',
          b: '👜',
          c: '🍦',
          d: '🦇',
          e: '💕',
          f: '💵',
          g: '😹',
          h: '🤲',
          i: '🗼',
          j: '🏂',
          k: '🌾',
          l: '🦵',
          m: '🚣',
          n: '💽',
          o: '😮',
          p: '🌽',
          q: '🥘',
          r: '🏸',
          s: '📤'
        }
      },
      numberOfEmojis: null,
      disableZoom: true,
      minZoomLevel: 3,
      zoom: null,
      currentScale: 2,
      scale: [],
      center: { lat: 45, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      // rectOptions: null,
      tileSize: 256,
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
    this.vueInit()
    this.geolocate()
    // this.addMarker()
    this.init()
  },
  methods: {
    vueInit() {
      // manually run calculations
      this.numberOfEmojis = Object.keys(this.emojiIndexReference).length

      this.scale.splice(0, 1, 256 / this.numberOfEmojis)
      this.scale.splice(1, 1, 256 / Math.pow(this.numberOfEmojis, 2))
      this.scale.splice(2, 1, 256 / Math.pow(this.numberOfEmojis, 3))
      this.scale.splice(3, 1, 256 / Math.pow(this.numberOfEmojis, 4))
      console.log(this.scale)
    },
    init() {
      this.canvas = document.getElementById('emoji-map')
      this.ctx = this.canvas.getContext('2d')
      const googleMapElement = document.getElementById('g-map')

      // this.mouseCheck()

      this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map

        // console.log(map.getUiSettings)
        map.set('disableDefaultUI', true)

        map.addListener('mousemove', (event) => {
          const coordsLabel = document.getElementById('tdCursor')
          let x = this.mercatorProject(event.latLng).x
          // const xC = event.latLng.lng()
          x = x.toFixed(4)
          let y = this.mercatorProject(event.latLng).y
          // const yC = event.latLng.lat()
          y = y.toFixed(4)
          this.getEmojiLocation(x, y)
          coordsLabel.innerHTML =
            // `X: ${xC}  Y: ${yC}
            // <BR/> x: ${x}, y: ${y}` +
            // `sqID.x: ${(
            //   this.findSqIDByWorldCoords(x) / Math.pow(this.numberOfEmojis, this.currentScale)
            // ).toString(this.numberOfEmojis)} sqID.y: ${(
            //   this.findSqIDByWorldCoords(y) / Math.pow(this.numberOfEmojis, this.currentScale)
            // ).toString(this.numberOfEmojis)}<BR/>` +
            `${this.emojiLocation}`
          const elinkArea = document.getElementById('link-area')
          elinkArea.innerHTML = `http://www.ourearth.care/${this.emojiLocation}`
        })

        map.addListener('zoom_changed', () => {
          this.zoom = map.getZoom()
          // this.fixedZooms(this.zoom)
          console.log(`zoom @: ${this.zoom}`)
        })

        map.addListener('bounds_changed', () => {
          // Limit the north/south pole max bounds of map
          // by recentering map when app attempts to leave google
          // maps' north/south pole limits/boundries
          this.boundWorld()

          // Set the maps current grid scale factor by google maps' current zoom
          this.currentScale = this.breakLayer()

          // Use a Mercator Projection to cast this.bounds values to google
          // maps' equivalent "World Coordinates" values
          this.mercCoords(map)

          this.mapCoordSize.width =
            this.bounds.sw.x < this.bounds.ne.x
              ? Math.abs(this.bounds.ne.x - this.bounds.sw.x)
              : Math.abs(this.bounds.ne.x + (256 - this.bounds.sw.x))
          // this.mapCoordSize.width = Math.round(this.mapCoordSize.width)

          // console.log(this.mapCoordSize.width)

          this.mapCoordSize.height = Math.abs(
            this.bounds.sw.y - this.bounds.ne.y
          )
          // console.log(this.mapCoordSize.height)

          if (this.canvas.getContext) {
            this.drawGrid()
            this.drawEmojis(
              (this.scale[this.currentScale] * this.canvas.width) /
                this.mapCoordSize.width
            )
          } else {
            // canvas unsupported
            // eslint-disable-next-line no-alert
            alert('CANVAS UNSUPPORTED!')
          }
        })

        // Run once after map is fully loaded with projection
        this.google.maps.event.addListenerOnce(
          map,
          'projection_changed',
          () => {
            // Initialize zoom at the minimum zoom level at beginning of app
            map.setZoom(this.minZoomLevel)

            // If an emojiCode exists in URL then handle with this.convertEmojiInput
            if (this.$route.params.emojiCode) {
              setTimeout(() => {
                this.convertEmojiInput(this.$route.params.emojiCode)
                console.log(
                  `converted emoji input: ${map.getCenter().lat()}`,
                  map.getCenter().lng()
                )
              }, 2000)
            } else {
              this.disableZoom = false
            }
          }
        )
      })

      this.canvas.height = googleMapElement.offsetHeight
      this.canvas.width = googleMapElement.offsetWidth
    },
    // eslint-disable-next-line max-statements
    boundWorld() {
      if (this.bounds.ne.y < 0 || this.bounds.sw.y > 256) {
        // still within valid bounds, so save the last valid position
        this.map.panTo(this.center)
        console.log('RECENTER! - OUT OF SAFE BOUNDS!')
      }
    },
    findSqIDByWorldCoords(wCoords) {
      return Math.floor(wCoords / this.scale[this.currentScale])
    },
    findSqIDByWorldCoordsModSize(wCoords) {
      return this.findSqIDByWorldCoords(wCoords) % this.numberOfEmojis
    },
    zoomIn() {
      if (!this.disableZoom) {
        this.map.setZoom(this.map.getZoom() + 1)
      }
    },
    zoomOut() {
      if (this.zoom > 3 && !this.disableZoom) {
        this.map.setZoom(this.map.getZoom() - 1)
      }
    },
    slowZoom(levels) {
      if (levels > 0) {
        // console.log(this.zoom)
        console.log(`levels: ${levels}`)
        this.map.setZoom(this.map.getZoom() + 1)
        // this.zoomIn()
        setTimeout(() => {
          this.slowZoom((levels -= 1))
        }, 750)
      } else if (levels < 0) {
        this.map.setZoom(this.map.getZoom() - 1)
        // console.log(this.zoom)
        console.log(`levels: ${levels}`)
        // this.zoomOut()
        setTimeout(() => {
          this.slowZoom((levels += 1))
        }, 750)
      } else {
        // this.zoom = this.map.getZoom()
        this.disableZoom = false
        console.log(`disable zoom: ${this.disableZoom}`)
      }
    },
    fixedZooms(val) {
      if (val < this.map.getZoom()) {
        if (val === 6) {
          val = 5
        } else if (val === 11) {
          val = 10
        } else if (val === 17) {
          val = 16
        } else if (val === 22) {
          val = 21
        }
        this.map.setZoom(val)
      } else if (val > this.map.getZoom()) {
        if (val === 6) {
          val = 7
        } else if (val === 11) {
          val = 12
        } else if (val === 17) {
          val = 18
        } else if (val === 22) {
          val = 21
        }
        this.map.setZoom(val)
      }
    },
    setZoomByEmojiLength(len) {
      this.currentScale = len
      console.log(`length: ${this.currentScale}`)
      if (this.currentScale === 1) {
        this.slowZoom(3 - this.map.getZoom())
      } else if (this.currentScale === 2) {
        this.slowZoom(7 - this.map.getZoom())
      } else if (this.currentScale === 3) {
        this.slowZoom(12 - this.map.getZoom())
      } else if (this.currentScale === 4) {
        this.slowZoom(18 - this.map.getZoom())
      }
    },
    breakLayer() {
      if (this.map.getZoom() < 7) {
        return 0
      } else if (this.map.getZoom() < 12) {
        return 1
      } else if (this.map.getZoom() < 18) {
        return 2
      }
      return 3
    },
    toggleEmojis() {
      if (this.emojiToggle === 'Off') {
        this.emojiToggle = 'On'
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawGrid()
      } else {
        this.emojiToggle = 'Off'
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawGrid()
        this.drawEmojis(
          (this.scale[this.currentScale] * this.canvas.width) /
            this.mapCoordSize.width
        )
      }
      // console.log(this.emojiToggle)
    },
    getEmojiLocation(x, y) {
      this.emojiLocation = ''
      let xEmojiLoc = (
        this.findSqIDByWorldCoords(x) /
        Math.pow(this.numberOfEmojis, this.currentScale)
      ).toString(this.numberOfEmojis)
      let yEmojiLoc = (
        this.findSqIDByWorldCoords(y) /
        Math.pow(this.numberOfEmojis, this.currentScale)
      ).toString(this.numberOfEmojis)
      xEmojiLoc = xEmojiLoc.replace('.', '')
      yEmojiLoc = yEmojiLoc.replace('.', '')
      for (let i = 0; i <= this.breakLayer(); i++) {
        if (xEmojiLoc[i] === undefined) {
          xEmojiLoc += 0
        }
        if (yEmojiLoc[i] === undefined) {
          yEmojiLoc += 0
        }
        this.emojiLocation += `${
          this.emojiIndexReference[xEmojiLoc[i]][yEmojiLoc[i]]
        }`
      }
      return this.emojiLocation
    },
    // Use an Emoji String to return a valid "World Coordinate" location
    convertEmojiInput(emojiInput) {
      let one
      let two
      const reqLocation = {
        lat: 0,
        lng: 0
      }

      // console.log('DOGE!: ' + [...emojiInput].length)
      // Find [0-z][0-z] keys for matching emoji in the this.emojiIndexReference
      for (let i = 0; i < [...emojiInput].length; i++) {
        for (const key in this.emojiIndexReference) {
          for (const secondKey in this.emojiIndexReference[key]) {
            if (
              this.emojiIndexReference[key][secondKey].match([...emojiInput][i])
            ) {
              one = key
              two = secondKey
            }
          }
        }
        // Use associated emoji x/y keys with a ~Mercator Projection based equation~
        // to find each emojis' associated square location and increase desired values by each
        // approx
        reqLocation.lng +=
          this.scale[i] * (360 / 256) * parseInt(one, this.numberOfEmojis)
        reqLocation.lat += this.scale[i] * parseInt(two, this.numberOfEmojis)
      }

      this.emojiInputZoomCenter(reqLocation)

      // return reqLocation
    },
    // Set this.map's zoom and this.currentScale using length of emoji input
    // Convert loc argument from lat/lng to "World Coordinates"
    // Set this.center to loc AND this.map.setCenter to this.center
    emojiInputZoomCenter(loc) {
      loc.lng -= 180
      loc.lat = this.map
        .getProjection()
        .fromPointToLatLng(new this.google.maps.Point(loc.lng, loc.lat))
        .lat()
      // const bounds = new this.google.maps.LatLngBounds()
      // bounds.extend(this.center)
      this.center = loc
      // bounds.extend(loc)
      // this.map.fitBounds(bounds)
      // this.zoom = 1
      this.map.panTo(this.center)
      setTimeout(() => {
        console.log('World!')
        this.setZoomByEmojiLength([...this.$route.params.emojiCode].length)
      }, 1000)
    },
    drawEmojis(nextLineDist) {
      if (this.emojiToggle === 'Off') {
        const sqID = {
          x: this.findSqIDByWorldCoordsModSize(this.bounds.sw.x),
          // (this.bounds.sw.x + this.firstLatLineInPx() / pxPerCoord) /
          // this.scale[this.currentScale],
          y: this.findSqIDByWorldCoordsModSize(this.bounds.ne.y)
          //     (this.bounds.ne.y + this.firstLngLineInPx() / pxPerCoord) /
          //     this.scale[this.currentScale]
        }
        this.ctx.font = '12px Serif'
        for (let i = 0; i < this.canvas.width; i += nextLineDist) {
          sqID.y = this.findSqIDByWorldCoordsModSize(this.bounds.ne.y)
          for (
            let j = 0;
            j < this.canvas.height + nextLineDist;
            j += nextLineDist
          ) {
            if (
              this.emojiIndexReference[sqID.x.toString(this.numberOfEmojis)][
                sqID.y.toString(this.numberOfEmojis)
              ] !== undefined
            ) {
              this.ctx.fillText(
                // String.fromCodePoint(
                `${
                  this.emojiIndexReference[
                    sqID.x.toString(this.numberOfEmojis)
                  ][sqID.y.toString(this.numberOfEmojis)]
                }`,
                this.firstLatLineInPx() - nextLineDist + i - 7,
                this.firstLngLineInPx() - nextLineDist + j + 4
              )
            }
            if (sqID.y < this.numberOfEmojis - 1) {
              sqID.y++
            } else {
              sqID.y = 0
            }
          }
          if (sqID.x < this.numberOfEmojis - 1) {
            sqID.x++
          } else {
            sqID.x = 0
          }
        }
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
    drawLat(emojis) {
      const pxPerCoord = this.canvas.width / this.mapCoordSize.width
      for (
        let i = this.firstLatLineInPx();
        i < this.canvas.width;
        i += emojis * pxPerCoord
      ) {
        this.ctx.moveTo(i, 0)
        this.ctx.lineTo(i, this.canvas.height)
      }
    },
    drawLng(emojis) {
      const pxPerCoord = this.canvas.height / this.mapCoordSize.height
      for (
        let i = this.firstLngLineInPx();
        i < this.canvas.height;
        i += emojis * pxPerCoord
      ) {
        this.ctx.moveTo(this.canvas.width, i)
        this.ctx.lineTo(0, i)
      }
    },
    drawGrid() {
      const level = this.scale[this.currentScale]

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.ctx.beginPath()
      // metersPerPx = 156543.03392 * Math.cos(latLng.lat() * Math.PI / 180) / Math.pow(2, zoom)
      // pxsPerMeter = Math.pow(2, this.zoom) / (156543.03392 * Math.cos(latLng.lat() * Math.PI / 180))
      // 1113174.304 mEL @ zoom = 1 */
      this.ctx.strokeStyle = `rgb(0, 0, 0)`
      // `rgb(${255 / this.currentScale}, ${
      //   255 / this.currentScale
      // }, 255)`
      // const pxPerEmoji =
      //   1113174.304 /
      //   ((156543.03392 * Math.cos((this.center.lat * Math.PI) / 180)) /
      //     Math.pow(2, this.zoom))

      this.drawLat(level)
      this.drawLng(level)
      this.ctx.closePath()
      this.ctx.stroke()
    },
    // The mapping from lat, lng to googles "World Coordinates" system
    // is defined by a mercator projection. This method converts them.
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
    // Set this.bounds corner coords to equivalent "World Coordinate" values by
    // translating their original (lat, lng) coordinates using a Mercator Projection
    mercCoords() {
      this.bounds.ne = this.mercatorProject(this.map.getBounds().getNorthEast())
      this.bounds.sw = this.mercatorProject(this.map.getBounds().getSouthWest())
    },
    noNegCoords() {
      this.bounds.ne.lat =
        180 - (this.map.getBounds().getNorthEast().lat() + 90)
      this.bounds.sw.lat =
        180 - (this.map.getBounds().getSouthWest().lat() + 90)
      this.bounds.ne.lng = this.map.getBounds().getNorthEast().lng() + 180
      this.bounds.sw.lng = this.map.getBounds().getSouthWest().lng() + 180
    },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place
    },
    addMarker() {
      if (this.currentPlace) {
        let marker
        try {
          marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          }
        } catch (e) {
          marker = this.currentPlace
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        console.log(`NEW "place" added for: ${this.currentPlace}`)
        console.log(
          `NEW "marker" added @: ${this.markers[this.markers.length - 1]}`
        )
        this.center = marker
        this.currentPlace = null
      }
    },
    // Set current real world GPS location to this.center
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    // Mouse input listener logic
    mouseCheck() {
      // const that = this
      // document.onmousedown = function () {
      //   that.mouse.down = true
      // }
      // document.onmouseup = function () {
      //   that.mouse.down = false
      // }
      // document.onmousemove = function (e) {
      //   if (that.mouse.down) {
      //     // that.mouse.dir = e.pageX - that.mouse.oldX
      //     // that.drawGrid()
      //     // that.mouse.dir = 0
      //   }
      //   // that.mouse.oldX = e.pageX
      // }
    },
    // Add any needed remote libraries using js in place of hardcoded html
    addRemoteLibraries() {
      const plugin = document.createElement('script')
      plugin.setAttribute(
        'src',
        `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPS_API_KEY}&callback=init&libraries=&v=weekly`
      )
      plugin.async = true
      document.head.appendChild(plugin)
    }
  },
  watch: {
    // Logic to tie google maps' zoom to this.zoom and correct
    // against any desired zoom level restrictions
    // zoom(val) {
    // if (val < this.minZoomLevel) {
    //   this.map.setZoom(this.minZoomLevel)
    //   console.log('zooombini: ' + this.zoom)
    //   this.zoom = this.minZoomLevel
    // } else {
    // this.fixedZooms(val)
    // console.log(`Zoom @: ${this.zoom}`)
    // }
    // }
  },
  computed: {
    google: gmapApi
  }
}
</script>

<style>
html {
  overflow: hidden;
}
#zindex1 {
  position: absolute;
  z-index: 1;
  pointer-events: none;
}
.map {
  position: relative;
  top: 0px;
  left: 0px;
  height: calc(100vh - 150px);
  width: calc(100vw);
}
#emoji-map {
  border-bottom: 4px groove #272727;
  color: white;
  pointer-events: none;
}
#g-map {
}
#ui {
  display: flex;
  justify-content: center;
  position: relative;
  top: 5px;
}
#vert {
  display: flex;
  position: relative;
  left: 0px;
  margin: 10px;
  flex-direction: column;
}
.ui-component {
  text-shadow: 2px 2px #121212;
  position: relative;
  min-width: 36px !important;
  padding: 0px !important;
  position: relative;
  /* background: rgb(233, 180, 40); */
  /* border: 3px groove rgb(255, 202, 80); */
  border-radius: 10px;
}
.zoom {
  height: 18px !important;
}
#emoji-button {
  height: 36px;
}
#tdCursor {
  font-size: 28pt;
  position: relative;
  z-index: 1 !important;
  top: -10px;
  text-align: center;
  width: 250px;
  border-bottom: 1px solid #121212;
  /* font-family: 'OpenMojiColor'; */
}
#link-area {
  font-size: 12pt;
  font-variant-caps: all-small-caps;
  font-weight: 700;
  position: relative;
  top: -10px;
  left: 6px;
  text-align: center;
  background: #222; /*rgb(255, 244, 180);*/
  height: 28px;
  border-top: 1px solid #181818; /*rgb(255, 225, 100);*/
  border-radius: 0px 0px 6px 6px;
  width: 238px;
  color: white;
  transform-origin: top;
  transition: transform 750ms ease-out;
  -moz-transform: transform 750ms ease-out;
  -webkit-transition: transform 750ms ease-out;
  transform: scaleY(0);
  resize: none;
  overflow: hidden;
}
#tdCursor:hover ~ #link-area {
  transform: scaleY(1);
}
#link-area:hover {
  transform: scaleY(1);
}
.v-navigation-drawer--absolute {
  z-index: 10 !important;
}
.container {
  padding: 0 !important;
}
</style>
