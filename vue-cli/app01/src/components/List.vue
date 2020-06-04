<template>
  <div class="list">
      <h3>{{title}}</h3>
      <ul>
          <li v-for="item in data" :key="item.id">
              <slot :scope="item"></slot>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props: {
        title:String,
        data:Array
    }
};
</script>

<style>
</style>