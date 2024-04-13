



<template>
  <div class='container'>
    <div class='container'>
      <div class="row shadow top2" id="header">
        <a href="/"><img  class="logo" src="../assets/logo.png" alt="logo">      </a>
      </div>

      
      <h1 class="row"><span class='section-title'></span></h1>
  
      <div class="row top2 mainContainer background-whitesmoke  py-0 py-md-2" id="topmenu">
          <button v-if='option==1' class="col-6 col-md-1 m-md-1 btn btn-primary rounded-0" @click='setOption(1)'><i class="far fa-sticky-note"></i></button>
          <button v-if='option!=1' class="col-6 col-md-1 m-md-1 btn btn-light rounded-0" @click='setOption(1)'><i class="far fa-sticky-note"></i></button>

          <button v-if='option==2 && notifications==0' class="col-6 col-md-1 m-md-1  btn btn-primary rounded-0" @click='setOption(2)'><i class="fas fa-bell"></i></button>
          <button v-if='option!=2 && notifications==0' class="col-6 col-md-1 m-md-1 btn btn-light rounded-0" @click='setOption(2)'><i class="fas fa-bell"></i></button>
  
          <button v-if='option==2 && notifications>0' class="col-6 col-md-1 m-md-1 btn btn-primary rounded-0" @click='setOption(2)'><i class="fas fa-bell"> </i> <small class='notification left1'> <b>({{notifications}})</b></small></button> 
          <button v-if='option!=2 && notifications>0' class="col-6 col-md-1 m-md-1 btn btn-light rounded-0" @click='setOption(2)'><i class="fas fa-bell"> </i> <small class='notification left1'> <b>({{notifications}})</b></small></button>  
          
      </div>
  
  
     <div v-if="option==1"  class="row top2 mainContainer">
        <button class="btn btn-primary2 fas fa-plus " @click='addNew'></button>         
        <button v-if="isTagSearch==false"  class="left1 btn black " @click="toggleTagSearch"><i class="fas fa-tag"></i> group</button>         
        <button v-if="isTagSearch"  class="left1 btn btn-primary2   rounded-0 " @click="toggleTagSearch"><i class="fas fa-tag"></i> group</button>                               
     </div> 

     <div class="row">
        <button v-if="isDraggable && !isTagSearch" @click="toggleDraggable" class="btn  left1  primary"><i class="fas fa-sort"></i></button> 
        <button v-if="!isDraggable && !isTagSearch" @click="toggleDraggable" class="btn left1  btn  disabled"><i class="fas fa-sort"></i></button>  
      </div> 
  
     
  
     <div v-if="option==1 && enableAdd"  class="row top1 mainContainer">
        <input v-if='enableAdd' class="col-md-10 col-12 black"  maxlength="70" type="text" ref="newNoteInput">  
    
        <button v-if="!enabledLabel" class="col-12 col-md btn " @click='toggleLabel' ><i class="fas fa-tag"></i></button>              
        <button v-if="!enabledNotification" class="col-12 col-md btn " @click='toggleNotification' ><i class="fas fa-bell"></i></button>
        
        <transition>
          <div v-if='enabledLabel' class="modalContainer centre">
            <div  class="col-12 modal1 ">
  
              <h2 class="col-12 black"><i class="fas fa-tag"></i> </h2>  
              
              <div class="col-12 top1 black"><small><b>Add label</b></small></div>
              <input class="col-10 top1" type="text" id="input_label"
              :style="{ color: this.colour}"
              >   
              <v-swatches class="top1"
              v-model="colour"                              
              shapes="circles"
                >
              </v-swatches>
              <button class="col-10 top1 btn btn-light" @click='addLabel'>ok</button>
              <button class="col-10 top1  btn black " @click='toggleLabel'>cancel</button>
                         
            </div>
          </div>
        </transition>
  
        <div class="col-12 top1">                  
            <button v-if="labelText!=''" class="btn btn-light fas fa-tag" :style="{color: labelColour}" @click='deleteLabel()'><small> {{labelText}} -</small></button>
            <button v-if="reminderDate!=null" class="btn darkcyan left1" @click="deleteReminder" :title=displayDateTime> <i class="fas fa-bell"><small> {{displayDateTime}}  <i class="fas fa-trash-alt"></i></small></i></button>          
            
        </div>
  
        
  
         <transition>
            <div v-if='enabledNotification' class="modalContainer">
              <div  class="col-12 centre modal1">
                <h2 class="col-12 black"><i class="fas fa-bell"></i> </h2> 
                <div class="col-12 black"><small><b>Add Reminder</b></small></div>
  
                
                  <div class="col">
                    <date-picker id="datePicker"
                      v-model="reminderDate"
                      type="date"
                      format='DD-MM-YYYY'
                      placeholder="Reminder date"
                      :editable=false
                      confirm=true
                      confirm-text='ok'
                      >
                        
                    </date-picker>
                  </div>
  
                  <div v-if="reminderDate!=null" class="col top2" >
  
                    <!-- time picker -->
                    <date-picker id="timePicker"
                      v-model="reminderTime"
                      type="time"
                      format='HH:mm'
                      placeholder="Reminder time "
                      :editable=false
                      confirm=true
                      confirm-text='ok'
                      :clearable=true
    
                      :time-picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '23:30',
                      }"
                      >    
                    </date-picker>
  
                    <!-- no time selected -->
                    
                  </div>   
  
                  <div class="col-12 top1  red" v-if="timeNull"><small>Please select reminder time</small></div>                       
  
                <button class="col-10 top1 btn btn-light primary" @click='addReminder'>add</button>
                <button class="col-10 top1  btn black" @click='toggleNotification'>cancel</button>
              </div>  
            </div>  
         </transition>
        
        <button v-if="!this.enabledLabel && !this.enabledNotification" class="col-12 top2 btn btn-primary" @click='saveNew'>add</button>
        <button v-if="!this.enabledLabel && !this.enabledNotification"  class="col-12 top2 btn btn-primary2 black" @click='closeAdd'>cancel</button>
     </div> 
  
     <div v-if="option==1 && !enableAdd" id="notesContainer" class="container top1" >
        
        <!-- filter by labels is off -->

        
        <span v-if="!isNoteOptions && !isEdit && !isTagSearch">

        

          <draggable v-model="notes" v-if="isDraggable"
          
          @end="resort"    
          >
            <div class="row  shadow-sm  button rounded-0  black my-2" v-for="(n,index) in notes" :key="index">
                    
              
              <template v-if="n.isCompleted==false">                                
                <button class="button_display_text btn background-primary-light left col-11 rounded-0" >{{n.text}}  </button>
                <button class="btn rounded-0 col-1 background-primary-light left text-md-right fas fa-sort"></button>
                            
                <div class="col-12 ">
                  <button v-if="n.labelText!=''" class="btn  rounded-0 " :style="{color: n.labelColour}" :title=n.labelText> <i class="fas fa-tag"> <small> {{n.labelText}}</small></i></button>
                  <button  v-if='n.reminderDate!=null' class="btn  darkcyan rounded-0" :title=n.displayDateTime ><i class="fas fa-bell"><small> {{n.displayDateTime}}</small></i></button>
                </div>                   
              </template>            
            </div>   
         </draggable> 
        
          <template v-if="!isDraggable">
            <div  class="row  shadow-sm  button rounded-0  black my-2" v-for="(n,index) in notes" :key="index">
                    
              
              <template v-if="n.isCompleted==false">                                
                <button class="button_display_text btn background-primary-light left col-11 rounded-0" slot="header" @click='toggleNoteOptions(index, n.id)' >{{n.text}}  </button>
                <button class="btn rounded-0 col-1 background-primary-light text-left text-md-right fas fa-ellipsis-v"   @click='toggleNoteOptions(index, n.id)'></button>
                            
                <div class="col-12 ">
                  <button v-if="n.labelText!=''" class="btn  rounded-0 " :style="{color: n.labelColour}" :title=n.labelText> <i class="fas fa-tag"> <small> {{n.labelText}}</small></i></button>
                  <button  v-if='n.reminderDate!=null' class="btn  darkcyan rounded-0" :title=n.displayDateTime ><i class="fas fa-bell"><small> {{n.displayDateTime}}</small></i></button>
                </div>                   
              </template>
    
              <!-- if task is completed -->
              <template v-if="n.isCompleted==true">            
                <button class="button_display_text btn background-primary-light left col system rounded-0">{{n.text}}  </button>             
                <button class="btn background-primary-light col-2 col-md-1 rounded-0 green" @click='markIncomplete(n.id)'><i class="fas fa-undo"></i></button>
                <button class="btn background-primary-light col-2 col-md-1 rounded-0 black" @click='deleteNote(n.id,complete=true)' ><i class="fa fa-trash"></i></button>              
              </template>
    
    
            </div>  
          </template>          
         
        <!-- END Draggable -->

         <div v-if="notes==''"  class="row  top1">          
              <p class="left1  primary2">No notes found</p>
         </div> 
        </span>
  
  
        <!-- filter by labels is on -->
         <div v-if="!isNoteOptions && !isEdit && isTagSearch"> 

          <!-- select          -->
          <div v-if="notes!=''" class="row sticky-top membrane2 top1">                        
            <i class="fas fa-caret-down margin-v-auto"></i>             
            <select v-model="selectedLabel" class="left1"  name="tagFilter"  id="tagFilter" @change="loadTags()">
               
              <option class="primary" v-for="(l,index) in labels" :value="l" :key="index">                  
  
                <template v-if="l==''">
                  No label    
                </template>
  
                <template v-if="l!=''">
                  {{ l }}    
                </template>
                 
              </option>        
            </select>                        
          </div> 
  
                 
            <div class="row  shadow-sm button  black my-2 " v-for="(n,index) in notes" :key="index">          
              <template v-if="n.isCompleted==false">       
                <button class="col-11 button_display_text btn background-primary-light left  rounded-0" @click='toggleNoteOptions(index, n.id)' >{{n.text}}</button>
                <button class="col-1 btn rounded-0 background-primary-light text-left text-md-right fas fa-ellipsis-v" @click='toggleNoteOptions(index, n.id)'></button>
                <div class="col-12 ">
                  <button v-if="n.labelText!=''" class="btn  rounded-0 " :style="{color: n.labelColour}" :title=n.labelText> <i class="fas fa-tag"> <small> {{n.labelText}}</small></i></button>
                  <button  v-if='n.reminderDate!=null' class="btn  darkcyan rounded-0" :title=n.displayDateTime ><i class="fas fa-bell"><small> {{n.displayDateTime}}</small></i></button>
                </div>                 
              </template>

              <template v-if="n.isCompleted==true">                   
                <button class="button_display_text btn background-primary-light left col system rounded-0">{{n.text}}  </button>             
                <button class="btn background-primary-light col-2 col-md-1 rounded-0 green" @click='markIncomplete(n.id)'><i class="fas fa-undo"></i></button>
                <button class="btn background-primary-light col-2 col-md-1 rounded-0 black" @click='deleteNote(n.id,complete=true)' ><i class="fa fa-trash"></i></button>            
              </template >  
            </div>  

            <div v-if="notes==''"  class="row top1   button  black top1">          
              <p class=" primary2">No notes found</p>                         
            </div> 

         </div>
        
  
         <span v-if="isNoteOptions">
            <div class="row  shadow  button  black top1">
              <!-- <button class="btn background-primary-light left col-12 black noteTextButton" @click='toggleNoteOptions(noteIndex,noteId)'> {{notes[noteIndex].text}}</button> -->
              <button class="btn col-12 text-right  fas fa-ellipsis-v" @click='toggleNoteOptions(noteIndex,noteId)'></button>

              <button class="btn green background-green rounded-0 col-12   top1" @click='markCompleted(noteId)' ><i class="fas fa-check-double"></i></button>
              <button class="btn primary background-light rounded-0 col-12  black" @click='toggleEdit' ><i class="far fa-edit"></i></button>            
              <button class="btn rounded-0 col-12" @click='deleteNote(noteId)' ><i class="fa fa-trash"></i></button>                                        
            </div>  
          </span> 
  
          <span v-if="isEdit">
            <div class="row  button  black top1">
              <input  class="col-10 black" id="input_edit" type="text" :value='notes[noteIndex].text'>             
  
               <button v-if="!enabledLabel" class="col-12 col-md btn " @click="toggleLabel" ><i class="fas fa-tag"></i></button>            
               <button v-if="!enabledNotification" class="col-12 col-md btn " @click="toggleNotification" ><i class="fas fa-bell"></i></button>
            </div>  
  
            <div class="row top1">    
              
              <button v-if="labelText!=''" class="btn btn-light fas fa-tag" :style="{color: labelColour}" @click='deleteLabel()'><small> {{labelText}} -</small></button>
              <button v-if='reminderDate!=null' class="btn darkcyan left left1" @click='deleteReminder()' ><i class="fas fa-bell" :title=displayDateTime><small> {{displayDateTime}} <i class="fas fa-trash-alt"></i></small> </i> </button>
              
            </div>  

            <div class="row">
              <button class="btn btn-primary2  top1 col-md-2" @click='saveEdit' >ok</button>            
              <button class="btn btn primary top1 col-md-2  m-md-1" @click='toggleEdit'>cancel</button>            
            </div>
          </span> 
  
          <transition>
  
          <div v-if='enabledLabel' class="modalContainer centre">
            <div  class="col-12 modal1 ">
  
              <h2 class="col-12 black"><i class="fas fa-tag"></i> </h2>  
              
              <div class="col-12 top1 black"><small><b>Add label</b></small></div>
              <input class="col-10 top1" type="text" id="input_label"
              :style="{ color: this.colour}"
              >   
              <v-swatches class="top1"
              v-model="colour"                              
              shapes="circles"
                >
              </v-swatches>
              <button class="col-10 top1 btn btn-light" @click='addLabel'>ok</button>
              <button class="col-10 top1  btn black " @click='toggleLabel'>cancel</button>
              <!-- <button class="btn col">cancel</button> -->             
            </div>
          </div>
        </transition>
  
         <transition>
            <div v-if='enabledNotification' class="modalContainer">
              <div  class="col-12 centre modal1">
                <h2 class="col-12 black"><i class="fas fa-bell"></i> </h2> 
                <div class="col-12 black"><small><b>Add Reminder</b></small></div>
  
                
                  <div class="col">
                    <date-picker
                      v-model="reminderDate"
                      type="date"
                      format='DD-MM-YYYY'
                      placeholder="Reminder date"
                      :editable=false
                      confirm=true
                      confirm-text='ok'
                      >
                        
                    </date-picker>
  
                    
                  </div>
  
                  
                  <div  class="col top2">
                    <date-picker 
                      v-model="reminderTime"
                      type="time"
                      format='HH:mm'
                      placeholder="Reminder time "
                      :editable=false
                      confirm=true
                      confirm-text='ok'
                      :clearable=true
    
                      :time-picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '23:30',
                      }"
                      >
                        
                    </date-picker>

                  </div>        

                  <div class="col-12 top1  red" v-if="timeNull"><small>Please select reminder time</small></div>

                <button class="col-10 top1 btn btn-light primary" @click='addReminder'>add</button>
                <button class="col-10 top1  btn black" @click='toggleNotification'>cancel</button>
                
              </div>  
            </div>  
         </transition>
     </div> 
  
    
    <!-- Display notes with reminder -->
     <div v-if="option==2"  class=" top1">      
        <div class="row  sticky-top mainContainer membrane2  ">
          <button v-if='isActiveReminder' class="btn  d-md-none col-6" @click='toggleReminders(1)' ><b>| Expired</b> <small v-if="activeReminders>0" class="primary notification"><b> &nbsp;({{activeReminders}})</b></small></button> 
          <button v-if='!isActiveReminder' class="btn d-md-none col-6" @click='toggleReminders(1)'>Expired <small v-if="activeReminders>0" class="primary notification"><b> &nbsp;({{activeReminders}})</b></small> </button> 
  
          <button v-if='isUpcomingReminder' class="btn d-md-none col-6" @click='toggleReminders(2)'><b>| Upcoming</b> <small v-if="upcomingReminders>0" class="primary notification"><b> &nbsp;({{upcomingReminders}})</b></small></button>          
          <button v-if='!isUpcomingReminder' class="btn d-md-none col-6" @click='toggleReminders(2)'>Upcoming <small v-if="upcomingReminders>0" class="notification" ><b> &nbsp;({{upcomingReminders}})</b></small></button>

          <button v-if='isActiveReminder' class="btn  d-none d-md-block  text-md-left" style="width:120px" @click='toggleReminders(1)' ><b>| Expired</b> <small v-if="activeReminders>0" class="primary notification"><b>  &nbsp;({{activeReminders}})</b></small></button> 
          <button v-if='!isActiveReminder' class="btn d-none d-md-block  text-md-left" style="width:120px" @click='toggleReminders(1)'>Expired <small v-if="activeReminders>0" class="primary notification"><b> &nbsp;({{activeReminders}})</b></small> </button> 
  
          <button v-if='isUpcomingReminder' class="btn d-none d-md-block  text-md-left" style="width:120px" @click='toggleReminders(2)'><b>| Upcoming</b> <small v-if="upcomingReminders>0" class="primary notification"><b> &nbsp;({{upcomingReminders}})</b></small> </button>          
          <button v-if='!isUpcomingReminder' class="btn d-none  d-md-block text-md-left" style="width:120px" @click='toggleReminders(2)'>Upcoming  <small v-if="upcomingReminders>0" class="notification" ><b>&nbsp;({{upcomingReminders}})</b></small></button>          
        </div>
  
        <div v-if="notes==''"  class="row   top1">          
            <p class="col left1 text-center text-md-left primary2">No notes found</p>
        </div>
         
        <template  v-if="!isNoteOptions && !isEdit">
          <div class="notesContainer">
            <div  class="row button  black top1" v-for="(n,index) in notes" :key="index">          
                <template v-if="n.isCompleted==false">
                  <!-- <button class="button_display_text btn background-primary-light left col black" @click='toggleNoteOptions(index, n.id)'>{{n.text}}  </button>                
                  <button v-if="n.labelText!=''" class=" btn btn-light2 left" :style="{color: n.labelColour}" :title=n.labelText> <i class="fas fa-tag"> <small> {{n.labelText}}</small></i></button>
                  <button v-if="n.labelText==''" class=" btn btn-light2 left"  :title=n.labelText></button>
                  <button  v-if='n.reminderDate!=null' class=" btn btn-light2 darkcyan" :title=n.displayDateTime ><i class="fas fa-bell"></i> <small>{{n.displayDateTime}}</small>  </button>
                  <button  v-if='n.reminderDate==null' class=" btn btn-light2 darkcyan" ><i class="fas fa-bell invisible" ></i></button>                                          -->

                  <button class="button_display_text btn background-primary-light left col-11 rounded-0" @click='toggleNoteOptions(index, n.id)' >{{n.text}}  </button>
                  <button class="btn rounded-0 col-1 background-primary-light text-left text-md-right fas fa-ellipsis-v" @click='toggleNoteOptions(index, n.id)'></button>

                  <div class="col-12 ">
                    <button v-if="n.labelText!=''" class="btn  rounded-0 " :style="{color: n.labelColour}" :title=n.labelText> <i class="fas fa-tag"> <small> {{n.labelText}}</small></i></button>
                    <button  v-if='n.reminderDate!=null' class="btn  darkcyan rounded-0" :title=n.displayDateTime ><i class="fas fa-bell"><small> {{n.displayDateTime}}</small></i></button>
                  </div>  

                </template>
          
                <template v-if="n.isCompleted==true">
                  <!-- <button class="button_display_text btn btn-light2 left col system">{{n.text}}  </button>                
                  <button v-if="n.labelText!=''" class=" btn btn-light2 left system" :title=n.labelText> <i class="fas fa-tag"> <small> {{n.labelText}}</small></i></button>
                  <button v-if="n.labelText==''" class=" btn btn-light2 left"  :title=n.labelText></button>
                  <button  v-if='n.reminderDate!=null' class=" btn btn-light2 system" :title=n.displayDateTime ><i class="fas fa-bell"></i> <small>{{n.displayDateTime}}</small>  </button>
                  <button  v-if='n.reminderDate==null' class=" btn btn-light2 system" ><i class="fas fa-bell invisible" ></i></button>                                                       
                  <button class="btn btn-light2 left col-1 green" @click='markIncomplete(n.id)'><i class="fas fa-undo"></i></button>                  
                  <button class="btn btn-light2 col-1  black" @click='deleteNote(n.id,complete=true)' ><i class="fa fa-trash"></i></button> -->

                  <button class="button_display_text btn background-primary-light left col system rounded-0">{{n.text}}  </button>             
                  <button class="btn background-primary-light col-2 col-md-1 rounded-0 green" @click='markIncomplete(n.id)'><i class="fas fa-undo"></i></button>
                  <button class="btn background-primary-light col-2 col-md-1 rounded-0 black" @click='deleteNote(n.id,complete=true)' ><i class="fa fa-trash"></i></button>            
                </template>
            </div>
    
           
          </div>           
        </template>  
         
           
        <span v-if="isNoteOptions">
        <!-- <div class="row  shadow  button  black top1">
          <button class="button_display_text btn background-primary-light left col black" @click='toggleNoteOptions(noteIndex,noteId)'> {{notes[noteIndex].text}}</button>
          <button class="btn green background-green rounded-0 col-12 col-md-1  my-1 my-md-0" @click='markCompleted(noteId)' ><i class="fas fa-check-double"></i></button>
          <button class="btn primary background-light rounded-0 col-12 col-md-1 my-1 my-md-0 black" @click='toggleEdit' ><i class="far fa-edit"></i></button>            
          <button class="btn rounded-0 col-12 col-md-1  my-1 my-md-0" @click='deleteNote(noteId)' ><i class="fa fa-trash"></i></button>            
        </div>   -->
          <div class="row  shadow  button  black top1">
              <!-- <button class="btn background-primary-light left col-12 black noteTextButton" @click='toggleNoteOptions(noteIndex,noteId)'> {{notes[noteIndex].text}}</button> -->
              <button class="btn col-12 text-right fas fa-ellipsis-v" @click='toggleNoteOptions(noteIndex,noteId)'></button>

              <button class="btn green background-green rounded-0 col-12   top1" @click='markCompleted(noteId)' ><i class="fas fa-check-double"></i></button>
              <button class="btn primary background-light rounded-0 col-12  black" @click='toggleEdit' ><i class="far fa-edit"></i></button>            
              <button class="btn rounded-0 col-12" @click='deleteNote(noteId)' ><i class="fa fa-trash"></i></button>                                        
          </div> 
        </span> 
  
        <span v-if="isEdit">
          <div class="row  button  black top1">
            <input  class="col-12 col-md-10 black" id="input_edit" type="text"  maxlength="70" :value='notes[noteIndex].text'>             
  
              <button v-if="!enabledLabel" class="col-12 col-md btn " @click="toggleLabel" ><i class="fas fa-tag"></i></button>            
              <button v-if="!enabledNotification" class="col-12 col-md btn " @click="toggleNotification" ><i class="fas fa-bell"></i></button>
          </div>  
  
          <div class="row top1">    
            
            <button v-if="labelText!=''" class="btn btn-light fas fa-tag" :style="{color: labelColour}" @click='deleteLabel()'><small> {{labelText}} -</small></button>
            <button v-if='reminderDate!=null' class="btn darkcyan left left1" @click='deleteReminder()' ><i class="fas fa-bell" :title=displayDateTime><small> {{displayDateTime}} <i class="fas fa-trash-alt"></i> </small> </i> </button>
            
          </div>  
                      
          <div class="row">
            <button class="btn btn-primary2  top1 col-md-2" @click='saveEdit' >ok</button>            
            <button class="btn btn primary top1 col-md-2  m-md-1" @click='toggleEdit'>cancel</button>            
          </div>
        </span> 
  
        <transition>
  
          <div v-if='enabledLabel' class="modalContainer centre">
            <div  class="col-12 modal1 ">
  
              <h2 class="col-12 black"><i class="fas fa-tag"></i> </h2>  
              
              <div class="col-12 top1 black"><small><b>Add label</b></small></div>
              <input class="col-10 top1" type="text" id="input_label"
              :style="{ color: this.colour}"
              >   
              <v-swatches class="top1"
              v-model="colour"                              
              shapes="circles"
                >
              </v-swatches>
              <button class="col-10 top1 btn btn-light" @click='addLabel'>ok</button>
              <button class="col-10 top1  btn black " @click='toggleLabel'>cancel</button>
              <!-- <button class="btn col">cancel</button> -->             
            </div>
          </div>
        </transition>
  
        
  
        
         <transition>
            <div v-if='enabledNotification' class="modalContainer">
              <div  class="col-12 centre modal1">
                <h2 class="col-12 black"><i class="fas fa-bell"></i> </h2> 
                <div class="col-12 black"><small><b>Add Reminder</b></small></div>
  
                
                  <div class="col">
                    <date-picker
                      v-model="reminderDate"
                      type="date"
                      format='DD-MM-YYYY'
                      placeholder="Reminder date"
                      :editable=false
                      confirm=true
                      confirm-text='ok'
                      >
                        
                    </date-picker>
  
                    
                  </div>
  
                  
                  <div  class="col top2">
                    <date-picker 
                      v-model="reminderTime"
                      type="time"
                      format='HH:mm'
                      placeholder="Reminder time "
                      :editable=false
                      confirm=true
                      confirm-text='ok'
                      :clearable=true
    
                      :time-picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '23:30',
                      }"
                      >
                        
                    </date-picker>
                  </div>     
                  <div class="col-12 top1  red" v-if="timeNull"><small>Please select reminder time</small></div>

                <button class="col-10 top1 btn btn-light primary" @click='addReminder'>add</button>
                <button class="col-10 top1  btn black" @click='toggleNotification'>cancel</button>
                
              </div>  
            </div>  
         </transition>
        
     </div>  
  
     
  <div v-if="notes.length>1" class="row  top1">
      <small class="col lightgrey">scroll to see all notes</small>  
  </div>
        
    <!-- <button class="btn btn-danger" @click='deleteDB'>Delete all notes</button>   -->
  
    <!-- <button class="btn" @click='loadData'>read</button>   -->
  
  
  
  
    
  
  
    </div>
  </div>
</template>

<script>
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
  
import draggable from 'vuedraggable'
  

export default {
  name: 'Main',
  props: {
    title: String,
  },
  components: { VSwatches,DatePicker,draggable },

    mounted(){
      this.loadData();
      this.loadNotifications();
    },

  data(){
    return{
      option:1,
      notes:[],  
      notesNoLabel:[],    
      enableAdd:false,
      enabledLabel:false,
      enabledNotification:false,
      colour:'#000000',
      labelText:'',
      labelColour:'',            
      labels:[],
      selectedLabel:'All notes',
      isNoteOptions:false,
      noteIndex:'',
      noteId:'',
      selectedNote:[],
      reminderDate: null,      
      reminderTime: null, 
      displayDateTime:'',             
      dateNull:false,
      timeNull:false,
      isEdit:false ,

      isTagSearch:false,
      isActiveReminder:false,
      isUpcomingReminder:false,
      activeReminders:0,
      upcomingReminders:0,
      notifications:0,
      isDraggable:false,
      

    }
  },

  methods:{
    setOption(n){
        this.option=n;       
        this.isNoteOptions=false;
        //show all notes
        if(n==1){
          this.loadData();
          this.isActiveReminder=false;
          this.isUpcomingReminder=false;
        }
        //show notes with reminders
        if(n==2){
          
          this.loadActiveReminders();
          
          this.isActiveReminder=true;
          this.isTagSearch=false;
        }
    },

    addNew(){
      
      this.enableAdd=true;
      this.isTagSearch=false;
      this.isNoteOptions=false;
      setTimeout(() => {
        this.$refs.newNoteInput.focus();  
      }, 200);      
    },


    closeAdd(){
      this.enableAdd=false;
      this.labels=[];
      this.reminderDate= null;        
      this.reminderTime= null; 
      this.timeNull=false;
      this.dateNull=false;   
      this.displayDateTime='';

    },

    toggleLabel(){      
      this.enabledLabel=!this.enabledLabel;      
      if(this.enabledLabel){
        setTimeout(() => {
        document.getElementById('input_label').focus();  
        }, 100);
      }
      else{
        setTimeout(() => {
          if(this.enableAdd){
            this.$refs.newNoteInput.focus();  
          }
          else{
            document.getElementById('input_edit').focus();
          }
        
        }, 100);
      }
    },

    toggleNotification(){      
      this.enabledNotification=!this.enabledNotification;

      //cancel is clicked
      if(!this.enabledNotification && this.displayDateTime==''){      
                
          this.reminderDate= null;        
          this.reminderTime= null; 
          this.timeNull=false;
          this.dateNull=false;   
      }
      

    },

    addLabel(){
      this.labelText=document.getElementById('input_label').value.trim();
      this.labelColour=this.colour;
      // let newLabel={labelText:labelText,colour:labelColour};

      // if(labelText.trim()!=''){
      //     this.labels.push(newLabel);
      //     this.toggleLabel();
      //     }

      if(this.labelText!=''){
          // this.labels.splice(0,1,newLabel);
          this.toggleLabel();
          }

      
      
    },

    addReminder(){
      // this.toggleNotification();      
      if(this.reminderDate!=null && this.reminderTime!=null){
        this.dateNull=false;
        this.timeNull=false;
        this.enabledNotification=!this.enabledNotification;

        //reformat date
        let fDate=this.reminderDate.toDateString();
        fDate=fDate.split(' ');
        fDate=fDate[2]+' '+fDate[1]+' '+fDate[3];
        let displayDate=fDate;

        //reformat time        
        let fTime=this.reminderTime.toString();
        fTime=fTime.split(' ');
        fTime=fTime[4];
        fTime=fTime.split(':');
        fTime=fTime[0]+':'+fTime[1];
        let displayTime=fTime;
        this.displayDateTime=displayDate + ' '+displayTime        
      }

      if(this.reminderDate==null){
        this.dateNull=true;
      }

      if(this.reminderTime==null){
        this.timeNull=true;
      }    
    },

    saveNew(){
      let newNoteText=this.$refs.newNoteInput.value;
      console.log(this.labels);

      let newNote;
      newNote={text:newNoteText,
              reminderDate:this.reminderDate,
              reminderTime:this.reminderTime,
              displayDateTime:this.displayDateTime,
              labelText:this.labelText,
              labelColour:this.labelColour,
              isCompleted:false
              };
    
      let self = this;
      
      //indexedDB
      const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;      
      console.log(indexedDB);      
      const request= indexedDB.open('todoDatabase',1);
      
      //onerror
      request.onerror=function(event){
        console.log(event);
      }

      //onupgradeneeded
      request.onupgradeneeded=function(event){
        let db = event.target.result;
        let objectStore=db.createObjectStore('notes', { keyPath: "id", autoIncrement: true });        
        objectStore.createIndex('labelIndex','note.labelText',{unique:false});  
        objectStore.createIndex('noteIndex',['note.text'],{unique:false}); 
        objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
        objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});           
        console.log("Object store Created Successfully...");
      }

      //onsuccess
      request.onsuccess = function (event){       
       var db = event.target.result;
       console.log(db);
       var transaction = db.transaction("notes", "readwrite");
       var objectStore = transaction.objectStore("notes");     
       
       if(newNoteText.trim()!=''){
       objectStore.add({ note: newNote});
        db.close();
        self.enableAdd=false;
        self.labelText='',
        self.labelColour=''
        
        self.reminderDate=null;
        self.reminderTime=null;
        self.displayDateTime='';

      }
       transaction.oncomplete = function () {   
       self.labels=[];
       self.selectedLabel='All notes';             
       self.loadData();
       self.loadNotifications();
        };
     }

    },

    toggleNoteOptions(n,id){      
      
      this.selectedNote=[];
      //get selected note's id
      this.noteId=id;


      //set get selected note
      for(let n of this.notes){

        console.log(n.id);
        if(n.id==id){
          this.selectedNote.push(n);
        }
      }

      console.log(this.notes);
      console.log(this.selectedNote);
      this.noteIndex=n;      
      this.isNoteOptions=!this.isNoteOptions;
    },

    deleteNote(id,complete){      
    //  this.notes.splice(n,1);
    //  this.isNoteOptions=!this.isNoteOptions;


    //delete note from db

    let self=this;
        const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
        const request = indexedDB.open("todoDatabase", 1);
      
        request.onerror = function(){
            console.log("request error deleteNote");
        }

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
            objectStore.createIndex('labelIndex','note.labelText',{unique:false});  
            objectStore.createIndex('noteIndex',['note.text'],{unique:false});
            objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
            objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});                
            console.log("Object store Created Successfully...");
        };


        request.onsuccess = function (event){       
          var db = event.target.result;
          let transaction = db.transaction('notes','readwrite');
          const objectStore = transaction.objectStore("notes");

          const deleteNote = objectStore.delete(id);
          deleteNote.onsuccess = function(){
          console.log('note id: '+id+ ' deleted');
          
         }  
            
          transaction.oncomplete = function () {     

            if(self.option==1){
              if(self.isTagSearch){                  
                self.selectedLabel='All notes';          
                self.loadTags();  
              }
              else{
                self.loadData();  

                self.labels=[];
                  self.reminder=[];
                  self.reminderDate=null;
                  self.reminderTime=null;
                  self.displayDateTime='';

              }   
            }
            else if(self.option==2){

              if(self.isActiveReminder){
                self.loadActiveReminders();
               }
               else{
                self.loadUpcomingReminders();
               }

            }

            
            
            if(complete==true){
              this.isNoteOptions=false;
              
            }
            else{
              self.isNoteOptions=!self.isNoteOptions;              
            }
            db.close();
            self.loadNotifications();
          };
          
        }

    },

    toggleEdit(){               
      this.isEdit=!this.isEdit;
      this.isNoteOptions=!this.isNoteOptions;
       
      setTimeout(() => {
        if(this.isEdit){

        document.getElementById('input_edit').focus();
        
        this.labelText= this.notes[this.noteIndex].labelText;
        
        this.labelColour= this.notes[this.noteIndex].labelColour;
      
        
        this.reminderDate=null;
        this.reminderTime=null;

        this.reminderDate=this.notes[this.noteIndex].reminderDate;
        this.reminderTime=this.notes[this.noteIndex].reminderTime;
        this.displayDateTime=this.notes[this.noteIndex].displayDateTime;
        
      }
      }, 100);
      

    },

    saveEdit(){
      if(document.getElementById('input_edit').value.trim()!=''){

        //updated field values
          let text= document.getElementById('input_edit').value.trim();
          let labelText=this.labelText;
          let labelColour=this.labelColour;
          let reminderDate=this.reminderDate;
          let reminderTime=this.reminderTime;
          let displayDateTime = this.displayDateTime;
          

        //save changes to indexedDB
        let self=this;
        const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
        const request = indexedDB.open("todoDatabase", 1);
                        
        request.onerror = function(){
            console.log("request error - saveEdit");
        }

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
            objectStore.createIndex('labelIndex',['note.labelText'],{unique:false});  
            objectStore.createIndex('noteIndex',['note.text'],{unique:false}); 
            objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
            objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});   
            
            console.log("Object store Created Successfully...");
        };

        

        request.onsuccess = function (event){       
          var db = event.target.result;
          let transaction = db.transaction("notes","readwrite");
          const objectStore = transaction.objectStore("notes");

          //get record to modify
          const recordRequest = objectStore.get(self.noteId);

          

          recordRequest.onsuccess=function(){

            
            let record = recordRequest.result;
            console.log(record);    
                    
            record.note.text = text;
            record.note.reminderDate=reminderDate;
            record.note.reminderTime=reminderTime;
            record.note.displayDateTime=displayDateTime;            
            record.note.labelText=labelText;
            record.note.labelColour=labelColour;
            record.note.isCompleted=false;


            //save new values to indexedDB
            const updateRequest=objectStore.put(record);

            updateRequest.onsuccess=function(){
              console.log('record updated');
            }
            
          }
          transaction.oncomplete = function () {
            self.labelText='';
            self.labelColour='';            
            self.reminderDate=null;
            self.reminderTime=null;
            self.displayDateTime='';

            //show all notes (filtered by tag or not)
            if(self.option==1){
              if(self.isTagSearch){    
                if(self.selectedLabel!='All notes'){
                  self.selectedLabel=labelText;         
                }  
                            
                 self.loadTags();  
              }
              else{
                self.loadData();  
              }
            }
            //show notes with reminders
            else if (self.option==2){
               if(self.isActiveReminder){
                self.loadActiveReminders();
               }
               else{
                self.loadUpcomingReminders();
               }
               
            }
            self.loadNotifications();                                                      
            db.close();
          };


          };

      }
      
      
      this.isEdit=!this.isEdit;
      
     
    },

    deleteLabel(){            
      this.labelText='';
      this.labelColour='';
    },

    deleteReminder(){    
            
      this.reminderDate=null;
      this.reminderTime=null;
      this.displayDateTime='';
      if(this.notes!=''){
        this.notes[this.noteIndex].reminder.reminderDate=null;
        this.notes[this.noteIndex].reminder.reminderTime=null;
      }
      
    },

     toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel;
    },

    loadData(){
      
        
        let self=this;
        const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
        const request = indexedDB.open("todoDatabase", 1);
        
        let foundNotes=[];
        
        request.onerror = function(){
            console.log("database test creation error");
        }

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
            objectStore.createIndex('labelIndex','note.labelText',{unique:false});  
            objectStore.createIndex('noteIndex',['note.text'],{unique:false});  
            objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
          objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});  
            
            console.log("Object store Created Successfully...");
        };


        request.onsuccess = function (event){       
          var db = event.target.result;
          let transaction = db.transaction("notes");
          const objectStore = transaction.objectStore("notes");

            // read through table
            objectStore.openCursor().onsuccess = event => { 
              var cursor = event.target.result; 
              if (cursor) { 
                console.log('is cursor')
                  
                  let record;
                  
                     record={id:cursor.value.id,
                             text:cursor.value.note.text,
                             labelText:cursor.value.note.labelText,
                             labelColour:cursor.value.note.labelColour,
                             reminderDate:cursor.value.note.reminderDate,
                             reminderTime:cursor.value.note.reminderTime,
                             displayDateTime:cursor.value.note.displayDateTime,
                             isCompleted:cursor.value.note.isCompleted
                             }
                             
                  
                  
                  console.log(record);
                  foundNotes.push(record);              
                  console.log(cursor.value);

                  console.log("id: "+ cursor.value.id);
                  console.log("text: "+ cursor.value.note.text);
                  
                  cursor.continue(); 
              } else { 
                  console.log('end of table');
              } 
            };

          
            
          transaction.oncomplete = function () {
            console.log(foundNotes);
            self.notes=[];
            for(let n of foundNotes){
              self.notes.push(n);          
            }
                                    
             console.log(self.notes)
             
            db.close();
          };

          
        }

    

    },

    deleteDB(){

      const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
      
      indexedDB.deleteDatabase("todoDatabase");      
      
    },

    resort(){

      let self =this;
      
      this.deleteDB(); 
  
      const request = indexedDB.open("todoDatabase",1);

      request.onupgradeneeded=function(event){
        let db = event.target.result;
        let objectStore=db.createObjectStore('notes', { keyPath: "id", autoIncrement: true });        
        objectStore.createIndex('labelIndex',['note.labelText'],{unique:false});  
        objectStore.createIndex('noteIndex',['note.text'],{unique:false});  
        objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
        objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});  
        
        console.log("Object store Created Successfully...");
      }

       request.onsuccess = function (event){       
       var db = event.target.result;
       let transaction = db.transaction("notes","readwrite");
       const objectStore = transaction.objectStore("notes");
        console.log(objectStore);

      

      self.notes.forEach(function (n) {     
      let newNote={ 
                   text:n.text,
                   labelText:n.labelText,
                   labelColour:n.labelColour,
                   reminderDate:n.reminderDate,
                   reminderTime:n.reminderTime,
                   displayDateTime:n.displayDateTime,
                   isCompleted:n.isCompleted
                   
                   }
      objectStore.add({ note: newNote});
      
      console.log(n.text+'-'+ n.id)          
          // objectStore.put({id: n, name: "deevana",branch: "CSE"});
      })
 
      transaction.oncomplete = function () {        
        console.log('resorting updated');
        
        self.loadData();
        db.close();

      };

    
          
    }

    },

    toggleTagSearch(){
      this.isTagSearch=!this.isTagSearch;
      this.enableAdd=false;
      this.isNoteOptions=false;
      if(this.isTagSearch){
        this.loadTags();
        
      }
      else{
        this.unloadTags();
      }
      
    }, 

    loadLabels(){
      //populate labels[] with labelText values

      this.labels=[];
      this.labels.push('All notes');



      let self=this;
      const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
      const request = indexedDB.open("todoDatabase", 1);
              
      request.onerror = function(){
            console.log("database test creation error");
      }

      request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
            objectStore.createIndex('labelIndex','note.labelText',{unique:false});  
            objectStore.createIndex('noteIndex',['note.text'],{unique:false});  
            objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
            objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});  
            console.log("Object store Created Successfully...");
        };


        request.onsuccess = function (event){   
          
          var db = event.target.result;
          let transaction = db.transaction("notes");          
          const objectStore = transaction.objectStore("notes");
          let labelIndex = objectStore.index("labelIndex");
          

          

          let request  = labelIndex.getAll();
          
          
                    
          request.onsuccess = function(){
            console.log('success');
            console.log(request.result);
            let results= request.result;
            
            for(let r of results){
                            
               let exists=false;
                self.labels.forEach(l => {
                 if(r.note.labelText==l){
                  exists=true;
                 } 
                });

                if(exists==false){
                  
                  self.labels.push(r.note.labelText);
                }   

            }            
            
         };

          transaction.oncomplete = function () {                                  
            db.close();
          };
        }           
    },

    
    loadTags(){
        
        this.enableAdd=false;
        this.notes=[];
        this.loadLabels();

      
        
        let self=this;
        const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
        const request = indexedDB.open("todoDatabase", 1);
        
        
        
        request.onerror = function(){
            console.log("database test creation error");
        }

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
            objectStore.createIndex('labelIndex','note.labelText',{unique:false});  
            objectStore.createIndex('noteIndex',['note.text'],{unique:false});  
            objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
            objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});  
            console.log("Object store Created Successfully...");
        };


        request.onsuccess = function (event){   
          
          var db = event.target.result;
          let transaction = db.transaction("notes");          
          const objectStore = transaction.objectStore("notes");
          let labelIndex = objectStore.index("labelIndex");
          

          let request='';
          if(self.selectedLabel=='All notes'){
            request = labelIndex.getAll();

          }
          else{
            request = labelIndex.getAll(self.selectedLabel);
           
          }
                    
          request.onsuccess = function(){
            console.log('success');
            console.log(request.result);
            let results= request.result;
            console.log(results);
            for(let r of results){
              let resultNote={id:r.id,
                              text:r.note.text,
                              labelText:r.note.labelText,
                              labelColour:r.note.labelColour,
                              reminderDate:r.note.reminderDate,
                              reminderTime:r.note.reminderTime,
                              displayDateTime:r.note.displayDateTime,
                              isCompleted:r.note.isCompleted
                              }

              
              

                                         
                //push note into notes[]
                self.notes.push(resultNote);
                console.log(self.notes);
            }            
            
         };

          transaction.oncomplete = function () {                                  
            db.close();
          };
        }
      console.log('TAGS');
    },

    unloadTags(){
      this.loadData();
      this.labels=[];
      this.selectedLabel='All notes';
    },

    //counts how many reminders expired
    loadNotifications(){
      this.notifications=0;
      
      
      let self=this;
      const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
      const request = indexedDB.open("todoDatabase", 1);
        
      request.onerror = function(){
          console.log("database test creation error");
      }

      request.onupgradeneeded = function(event) {
          var db = event.target.result;
          var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
          objectStore.createIndex('labelIndex','note.labelText',{unique:false});  
          objectStore.createIndex('noteIndex',['note.text'],{unique:false});  
          objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
          objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});  

          console.log("Object store Created Successfully...");
      };


        request.onsuccess = function (event){   
          
          var db = event.target.result;
          let transaction = db.transaction("notes");          
          const objectStore = transaction.objectStore("notes");
          let dateIndex = objectStore.index("dateIndex");
          let request='';
          request = dateIndex.getAll();
                      
          request.onsuccess = function(){
            console.log('success');
            console.log(request.result);
            let results= request.result;
            console.log(results);
            
            
            let now = new Date();
            now = now.getTime();
            
            
            
            for(let r of results){

             //reconstruct date and time to compare it with current date and time   
             let dateToString=r.note.reminderDate.toString();
             let actualDate1=dateToString.split(' ');                
             actualDate1=actualDate1[0]+' '+actualDate1[1]+' '+actualDate1[2]+' '+actualDate1[3];

             let timeToString=r.note.reminderTime.toString();
             let actualTime1=timeToString.split(' ');                
             actualTime1=actualTime1[4]+' '+actualTime1[5]+' '+actualTime1[6];
             
             let actualDateTime=actualDate1+' '+actualTime1;
             console.log(actualDateTime);

             //reconvert to Date format
             actualDateTime=new Date(actualDateTime);
                                                        
             //compare with current Date and Time
             //if reminder has not expired, push note into notes[]
             if(actualDateTime.getTime()<now){
              self.notifications++;
             }
             
                                            
            }            
            
         };

          transaction.oncomplete = function () {                                  
            db.close();
          };
        }
      
    },

    loadActiveReminders(){
      this.activeReminders=0;  
      this.upcomingReminders=0;
      this.notes=[];
      let self=this;
      const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
      const request = indexedDB.open("todoDatabase", 1);
        
      request.onerror = function(){
          console.log("database test creation error");
      }

      request.onupgradeneeded = function(event) {
          var db = event.target.result;
          var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
          objectStore.createIndex('labelIndex','note.labelText',{unique:false});  
          objectStore.createIndex('noteIndex',['note.text'],{unique:false});  
          objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
          objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});  

          console.log("Object store Created Successfully...");
      };


        request.onsuccess = function (event){   
          
          var db = event.target.result;
          let transaction = db.transaction("notes");          
          const objectStore = transaction.objectStore("notes");
          let dateIndex = objectStore.index("dateIndex");
          let request='';
          request = dateIndex.getAll();
                      
          request.onsuccess = function(){
            console.log('success');
            console.log(request.result);
            let results= request.result;
            console.log(results);
            
            
            let now = new Date();
            now = now.getTime();
            
            
            
            for(let r of results){

             //reconstruct date and time to compare it with current date and time   
             let dateToString=r.note.reminderDate.toString();
             let actualDate1=dateToString.split(' ');                
             actualDate1=actualDate1[0]+' '+actualDate1[1]+' '+actualDate1[2]+' '+actualDate1[3];

             let timeToString=r.note.reminderTime.toString();
             let actualTime1=timeToString.split(' ');                
             actualTime1=actualTime1[4]+' '+actualTime1[5]+' '+actualTime1[6];
             
             let actualDateTime=actualDate1+' '+actualTime1;
             console.log(actualDateTime);

             //reconvert to Date format
             actualDateTime=new Date(actualDateTime);

             

              let resultNote={id:r.id,
                              text:r.note.text,
                              labelText:r.note.labelText,
                              labelColour:r.note.labelColour,
                              reminderDate:r.note.reminderDate,
                              reminderTime:r.note.reminderTime,
                              displayDateTime:r.note.displayDateTime,
                              isCompleted:r.note.isCompleted
                              }
                            
                
             //compare with current Date and Time
             //if reminder has not expired, push note into notes[]
             if(actualDateTime.getTime()<now){
              self.notes.push(resultNote);
              self.activeReminders++;
              console.log(self.notes);
             }
             else{
              self.upcomingReminders++;
             }
                                            
            }            
            
         };

          transaction.oncomplete = function () {                                  
            db.close();
          };
        }
      
    },



    loadUpcomingReminders(){

      this.notes=[];
      this.upcomingReminders=0;
      this.activeReminders=0;  
      
      let self=this;
      const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
      const request = indexedDB.open("todoDatabase", 1);
        
      request.onerror = function(){
          console.log("database test creation error");
      }

      request.onupgradeneeded = function(event) {
          var db = event.target.result;
          var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
          objectStore.createIndex('labelIndex','note.labelText',{unique:false});  
          objectStore.createIndex('noteIndex',['note.text'],{unique:false});  
          objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
          objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});  

          console.log("Object store Created Successfully...");
      };


        request.onsuccess = function (event){   
          
          var db = event.target.result;
          let transaction = db.transaction("notes");          
          const objectStore = transaction.objectStore("notes");
          let dateIndex = objectStore.index("dateIndex");
          let request='';
          request = dateIndex.getAll();
                      
          request.onsuccess = function(){
            console.log('success');
            console.log(request.result);
            let results= request.result;
            console.log(results);
            
            
            let now = new Date();
            now = now.getTime();
            
            
            
            for(let r of results){

             //reconstruct date and time to compare it with current date and time   
             let dateToString=r.note.reminderDate.toString();
             let actualDate1=dateToString.split(' ');                
             actualDate1=actualDate1[0]+' '+actualDate1[1]+' '+actualDate1[2]+' '+actualDate1[3];

             let timeToString=r.note.reminderTime.toString();
             let actualTime1=timeToString.split(' ');                
             actualTime1=actualTime1[4]+' '+actualTime1[5]+' '+actualTime1[6];
             
             let actualDateTime=actualDate1+' '+actualTime1;
             console.log(actualDateTime);

             //reconvert to Date format
             actualDateTime=new Date(actualDateTime);

             

              let resultNote={id:r.id,
                              text:r.note.text,
                              labelText:r.note.labelText,
                              labelColour:r.note.labelColour,
                              reminderDate:r.note.reminderDate,
                              reminderTime:r.note.reminderTime,
                              displayDateTime:r.note.displayDateTime,
                              isCompleted:r.note.isCompleted
                              }
                            
                
             //compare with current Date and Time
             //if reminder has expired, push note into notes[]
             if(actualDateTime.getTime()>now){
              self.notes.push(resultNote);
              self.upcomingReminders++;
              console.log(self.notes);
             }
             else{
              self.activeReminders++;
             }
                                            
            }            
            
         };

          transaction.oncomplete = function () {                                  
            db.close();
          };
        }
      //
    },

    toggleReminders(n){
      
      if(n==1){
        this.isActiveReminder=true;
        this.isUpcomingReminder=false;
        this.loadActiveReminders();
      }
      else{
        this.isActiveReminder=false;
        this.isUpcomingReminder=true;
        this.loadUpcomingReminders();
      }

      

    },

    //marks note as completed
    markCompleted(noteId){
      //
      

        let self=this;
        const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
        const request = indexedDB.open("todoDatabase", 1);
                        
        request.onerror = function(){
            console.log("request error - markCompleted");
        }

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
            objectStore.createIndex('labelIndex',['note.labelText'],{unique:false});  
            objectStore.createIndex('noteIndex',['note.text'],{unique:false}); 
            objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
            objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});   
            
            console.log("Object store Created Successfully...");
        };
      
        request.onsuccess = function (event){       
          var db = event.target.result;
          let transaction = db.transaction("notes","readwrite");
          const objectStore = transaction.objectStore("notes");

          //get record to modify
          const recordRequest = objectStore.get(noteId);

          recordRequest.onsuccess=function(){

            let record = recordRequest.result;
            console.log(record);    
                    
            // record.note.text = text;
            // record.note.reminderDate=reminderDate;
            // record.note.reminderTime=reminderTime;
            // record.note.displayDateTime=displayDateTime;            
            // record.note.labelText=labelText;
            // record.note.labelColour=labelColour;
            record.note.isCompleted=true;


            //save new values to indexedDB
            const updateRequest=objectStore.put(record);

            updateRequest.onsuccess=function(){
              console.log('record updated');
            }
            
          }
          transaction.oncomplete = function () {
          
            //show all notes (filtered by tag or not)
            if(self.option==1){
              if(self.isTagSearch){    
                if(self.selectedLabel!='All notes'){
                  self.selectedLabel=self.selectedNote[0].labelText;                           
                }  
                            
                 self.loadTags();  
              }
              else{
                self.loadData();  
              }
            }
            //show notes with reminders
            else if (self.option==2){
               if(self.isActiveReminder){
                self.loadActiveReminders();
               }
               else{
                self.loadUpcomingReminders();
               }
               
            }
          
                                                                  
            db.close();
            self.isNoteOptions=false;
          };


          };




    },

    markIncomplete(noteId){
      //
       let self=this;
        const indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
        
        const request = indexedDB.open("todoDatabase", 1);
                        
        request.onerror = function(){
            console.log("request error - markCompleted");
        }

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("notes",{keyPath :"id",  autoIncrement:true});
            objectStore.createIndex('labelIndex',['note.labelText'],{unique:false});  
            objectStore.createIndex('noteIndex',['note.text'],{unique:false}); 
            objectStore.createIndex('dateIndex',['note.reminderDate'],{unique:false});  
            objectStore.createIndex('timeIndex',['note.reminderTime'],{unique:false});   
            
            console.log("Object store Created Successfully...");
        };
      
        request.onsuccess = function (event){       
          var db = event.target.result;
          let transaction = db.transaction("notes","readwrite");
          const objectStore = transaction.objectStore("notes");

          //get record to modify
          const recordRequest = objectStore.get(noteId);

          recordRequest.onsuccess=function(){

            let record = recordRequest.result;
            console.log(record);    
                    
            record.note.isCompleted=false;


            //save new values to indexedDB
            const updateRequest=objectStore.put(record);

            updateRequest.onsuccess=function(){
              console.log('record updated');
            }
            
          }
          transaction.oncomplete = function () {
            

            //show all notes (filtered by tag or not)
            if(self.option==1){
              if(self.isTagSearch){    
                console.log(self.selectedLabel);      
                if(self.selectedLabel!='All notes'){
                  // self.selectedLabel=self.labelText; 
                  // console.log(self.selectedLabel);                     
                }  
                            
                 self.loadTags();  
              }
              else{
                self.loadData();  
              }
            }
            //show notes with reminders
            else if (self.option==2){
               if(self.isActiveReminder){
                self.loadActiveReminders();
               }
               else{
                self.loadUpcomingReminders();
               }
               
            }
                                                                  
            db.close();
            self.isNoteOptions=false;
          };


          };
    },

    toggleDraggable(){
      this.isDraggable=!this.isDraggable;
    }


  }

}
</script>


