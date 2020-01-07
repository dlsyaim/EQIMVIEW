
<template>
  <component :is="currentView"  v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed:  {
     currentView :function(){
      if (isExternal(this.to)){
        return 'a';
      }else return  'router-link'
     }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        return {
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: url
      }
    }
  }
}
</script>
