//==========================================================
// <T>对象类的管理工具类。</T>
//
// @tool
// @author maocy
// @version 1.0.1
//==========================================================
var RFlash = new function(){
   var o = this;
   // @attribute
   o.status      = 'sleep';
   o.events      = new Array();
   // Method
   o.start       = RFlash_start;
   o.process     = RFlash_process;
   o.push        = RFlash_push;
   // Construct
   RMemory.register('RFlash', o);
   return o;
}
 
//==========================================================
//
//==========================================================
function flashGetStatus(){
   return RFlash.status;
}

//==========================================================
//
//==========================================================
function flashProcess(){
   RFlash.process();
}

//==========================================================
//
//==========================================================
function RFlash_start(){
   this.status = 'start';
}

//==========================================================
//
//==========================================================
function RFlash_process(){
   var o = this;
   if(o.events){
      var c = o.events.length;
      for(var n=0; n<c; n++){
         o.events[n].invoke();
      }
   }
   o.events = null;
}

//==========================================================
//
//==========================================================
function RFlash_push(e){
   var o = this;
   if(o.events){
      o.events = new Array();
      o.events.push(e)
   }
}