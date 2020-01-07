<template>
   <span>{{ data.row[data.column.property] }}</span>
</template>

<script>
export default {
    name:'CommonRender',
    props: {
        data : Object,
        required: () => true
    },
    
}
</script>
 