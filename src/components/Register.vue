<template>
  <div class='container'>
    
    <h1 class="row title-background"><span class='section-title'>{{title}}</span></h1>

    <form class="row top2">
    
        <label for="email" class="col-12 black">Email</label>
        <input type="email" class="col-12" ref='email' id='email' required v-model="email">
        <small v-if='errorEmail!=""' class="left1 top1 red">{{errorEmail}} </small>   

        <label for="password1" class="col-12 top1 black">Password</label>
        <input type="text" class="col-12" ref="password1" id='password1' v-model="password1">
        <small v-if='errorPassword1!=""' class="left1 top1 red">{{errorPassword1}} </small>   
        
        <label for="password2" class="col-12 top1 black">Repeat Password</label>
        <input type="text" class="col-12" ref="password2" id='password2' v-model="password2">
        <small v-if='errorPasswords!=""' class="left1 top1 red">{{errorPasswords}} </small>   
        

        <button type='button' class="btn btn-primary top1 col-12" @click='validate' >Register</button>
        

        <!-- <a href="/login" class="btn btn-light top1 col-12">Cancel</a> -->
        <router-link to ="/login" class="btn btn-light top1 col-12">Cancel</router-link>
    
    
    </form>
    
  </div>
</template>

<script>

export default {
  name: 'Register',
  props: {
    title: String,
    count:Number


  },
  data(){
    return{
      email:'',
      password1:'',
      password2:'',
      password:'',
      errorPassword1:'',
      errorPasswords:'',
      errorEmail:''
    }
  },
  methods: { 
    setPassword1(){
        this.password1=this.$refs.password1.value.trim();
    },
    setPassword2(){
        this.password2=this.$refs.password2.value.trim();
    },

    validate(){
       
            try{
              this.validateEmail()
              this.emptyPassword();
              this.comparePasswords();     
              this.submit();     
            }catch (error) {
             console.log(error);
            }
            
      
          
        
    },



    validateEmail(){

       var validator = require("email-validator");
  
      if(!validator.validate(this.email)){
        this.errorEmail='Invalid email';
        throw 'Invalid email';
        
      }
      else{
      this.errorEmail='';
      }
      
      // let data={"email":this.email.trim()};
      // let url ='http://localhost:3000/validateEmail';

      //  fetch(url,
      //     {
      //     method:'POST',          
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Access-Control-Allow-Origin':'*'            
      //       },
      //     body:JSON.stringify(data)
      //     }
      //   ).then(x=>x.json())
      //   .then(y=>{
      //     console.log(y.response);
      //     if(y.response!=true){
      //       this.errorEmail='Invalid email';                       
      //     }
      //     else{
      //       this.errorEmail='';  
      //       this.emptyPassword();
      //       this.comparePasswords(); 
      //       this.submit();                      
      //     }                    
      //   }         
      //   ).catch(e=>{
      //     console.log(e);          
      //   });   
    },


    emptyPassword(){
      
      if(this.password1.trim()==''){
        this.errorPassword1='Please insert a valid password';
        throw 'Please insert a valid password';
      }
      else{
        this.errorPassword1='';
        return true
      }
    },
  
    comparePasswords() { 
      if(this.password1!=this.password2){
        this.errorPasswords='Passwords do not match';
        throw 'Passwords do not match';
      }
      else{
        this.errorPasswords='';
        this.password=this.password1.trim();
        return true;
      }
    },
    
    submit(){
      //
    }
  }
}
</script>


