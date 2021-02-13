import Vue from 'vue'
import GoogleMap from '@/components/core/GoogleMap.vue'
import EmojiMap from '@/components/core/EmojiMap.vue'
import Heading from '@/components/common/Heading.vue'
import Description from '@/components/common/Description.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import SuccessMessage from '@/components/common/SuccessMessage.vue'
import SubmitButton from '@/components/common/SubmitButton.vue'
import ProjectDescription from '@/components/common/ProjectDescription.vue'

Vue.component('GoogleMap', GoogleMap)
Vue.component('EmojiMap', EmojiMap)
Vue.component('Heading', Heading)
Vue.component('Description', Description)
Vue.component('ErrorMessage', ErrorMessage)
Vue.component('SuccessMessage', SuccessMessage)
Vue.component('SubmitButton', SubmitButton)
Vue.component('ProjectDescription', ProjectDescription)
