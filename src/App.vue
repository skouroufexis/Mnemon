<template>
  <div >
     <router-view ></router-view>

  </div>
</template>

<script>
// import Login from './components/Login'
// import Register from './components/Register'
// import Main from './components/Main'

export default {
  name: 'App',
  components: {
    //
  },

  data(){
    return{
      //
      
      
    }
  },

  methods:{
    checkRoute(){
      let pathname= window.location.pathname;
      
      return pathname;
      
    }
  }
}
</script>

<style>


.top1 {margin-top: 1%;}
.top2 {margin-top: 2%;}
.top3 {margin-top: 3%;}

.bottom1 {margin-bottom: 1%;}
.bottom2 {margin-bottom: 2%;}


.left0{margin-left: 0%;}
.left1 {margin-left: 1%;}
.left2 {margin-left: 2%;}

.right1 {margin-right: 1%;}
.right2 {margin-right: 2%;}

.left {text-align: left;}
.right {text-align: right;}
.centre {text-align: center;}
.justify {text-align: justify;  }

.justify-centre {justify-content: center;}
.justify-left {justify-content: left;}
.justify-right {justify-content: right;}

a, a:visited,a:active,a:hover {color: black; text-decoration: none;}

.logo{height: 150px;}

/* button */
.button {cursor: pointer;}
button:focus{outline: none; }

.system {color: rgba(0,0,0,0.4); cursor:auto!important;}
.system:hover{color: rgba(0,0,0,0.4)}


.noteTextButton {

              overflow: hidden;
          }
.btn-primary {background-color: rgb(25, 71, 100); border: none;}


.btn-primary:hover {background-color: rgb(25, 71, 100); border: none;}


.btn-primary2 {background-color: whitesmoke; color: rgb(25, 71, 100); 
              border: none;}
.btn-primary2:hover {background-color: whitesmoke; color: rgb(25, 71, 100); 
              border: none;}

.btn-light2 { background-color: whitesmoke;
              
            }

.btn-green { color: green;
             background-color: rgb(0, 128, 0,0.1);
}

.btn-green:hover { color: green;
                   background-color: rgb(0, 128, 0,0.1);
            }

.btn-red { color: red;
            background-color: rgb(255, 0, 0,0.1);

}

.btn-red:hover { color: red;
            background-color: rgb(255, 0, 0,0.1);

}


.margin-v-auto {margin-top: auto; margin-bottom: auto;}
.margin-h-auto {margin-left: auto; margin-right: auto;}

.padding1 {padding: 1;}
.padding0 {padding: 0;}

*:focus { outline: 0; }

/* colors */
.green {color: green;}
.darkgreen {color: darkgreen;}

.darkcyan {color: darkcyan};
.red {color: red;}

.orange {color: darkorange;}



.gold{color: darkgoldenrod;}
.gold:hover {color: darkgoldenrod;}
.lightgrey{color: rgba(0,0,0,0.4);}
.black {color:rgba(0,0,0,0.7)}
.grey {color: grey;}
.blue {color: blue;}
.darkblue{color: darkblue;}
.primary {color:rgb(25, 71, 100);}

.primary2 {color:rgb(25, 71, 100,0.6);}



.darkorchid {color: darkorchid;}
.disabled{color: rgba(0,0,0,0.5)!important;}

.background-whitesmoke {background-color: whitesmoke;}
.background-whitesmoke-light {background-color: rgb(245, 245, 245,0.3);}



.background-green {background-color: rgb(0, 128, 0,0.05);}
.background-red {background-color: rgb(255, 0, 0,0.1);}
.background-primary {background-color:rgb(25, 71, 100,1) ;}
.background-primary-light {background-color:rgb(25, 71, 100,0.05) ;}
.border-red {border-color: red;}

.border-light {
                border: solid rgb(25, 71, 100,0.2) thin!important;}


  



/* Transition */
.v-enter-active {    
transition: opacity 0.3s,transform 0.3s;      
transform: translateY(0px);
}


.v-leave-active {
transition: opacity 0.2s,transform 0.2s;
}

.v-enter-from,
.v-leave-to {
opacity: 0;
transform: translateY(-10px);
}


.fade-enter-from{
opacity: 0;

}

.fade-enter-to{
opacity: 1;

}

.fade-enter-active{
transition: all 0.3s;
}

.fade-leave-from {
opacity: 0;
}

.fade-leave-to{
opacity: 0;
}

.fade-leave-active{
transition: all 0s;
}


.membrane {    
background-color: rgb(245, 245, 245,0.5);
height: auto;
}

.membrane2 {    
background-color: rgb(255, 255, 255,0.8);

/* height: 35px; */
}


select {  
  background-color: white;  
  color:rgb(25, 71, 100);
  appearance: none;
  border-radius: 0px;  
  cursor: pointer;
  
  
}

option {text-align:right!important;}

#tagFilter {
 color:rgb(25, 71, 100);
 border: none;
 /* border-bottom: solid rgb(25, 71, 100) thin ; */
 
 
 
 /* border-top-right-radius: 20px;
 border-bottom-right-radius: 20px; */
 

 /* padding-left: 1%;
 padding-right: 1%; */
 /* padding: 0.5%; */
 
 
 
 /* box-shadow: 0px 3px 3px rgba(25, 71, 100,0.8); */
}



.section-title {
  color: rgb(25, 71, 100);

  border-bottom: solid 20px rgb(25, 71, 100,0.1);;
  padding-bottom: 1%;
}

.title-background {
  /* background-color: rgb(245, 245, 245,0.2); */
  
}

input {border:none;
       border-bottom: solid whitesmoke thin;
    }
.button_display_text {overflow: hidden;}


.mainContainer {padding: 1%;

}

#notesContainer {

  height: 250px;
  overflow-y: scroll;
  
}


#notesContainer button {
  height: 40px;
  
}

.notesContainer {
  height: 250px;
  overflow-y: scroll;
  background-color: white;
  padding: 1%;
  
  
}



.notesContainer button {
  height: 40px;
}

.dragg-me{
  padding: 5px;
  border: 1px solid blue;
}

.notification {
  position: absolute;
  margin-top: 0;
  
}

.test{ width: 100%;}
/* modals */

.modalContainer {
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 0%;
  width: 100%;
  height: 100%;  
  background-color: rgb(255, 255, 255,0.99);
}

.modal1 {
  
  margin-top:10% ;
}
/* fonts */

*{
/* font-family: 'Signika Negative', sans-serif; */
}

::-webkit-scrollbar{
  display: none;
}


</style>
