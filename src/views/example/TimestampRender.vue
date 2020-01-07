<template>
   <span>{{ data.row[data.column.property] | parseTime('{y}-{m}-{d}') }}</span>
</template>

<script>
export default {
    name:'TimestampRender',
    props: {
        data : Object,
        required: () => true
    }
}
</script>
 