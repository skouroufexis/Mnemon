<template>
  <div class='container'>
    
    <h1 class="row"><span class='section-title'>{{title}}</span></h1>

    <form class="row top2">
    
        <p class="col-12 black">Email</p>
        <input type="text" class="col-12">

        <p class="col-12 top1 black">Password</p>
        <input type="text" class="col-12">

        <button type="button" class="btn btn-primary top1 col-12">Login</button>

        <!-- <a href="/register" class="btn btn-light top1 col-12">Register</a> -->
        <router-link to="/register" class="btn btn-light top1 col-12">Register</router-link>
        
    </form>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    title: String,
    count:Number
  },
  data(){
    return{
      test:1
    }
  }
}
</script>


