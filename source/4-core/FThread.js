//==========================================================
// <T>线程。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
function FThread(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._owner    = null;
   o._name     = null;
   o._statusCd = EThreadStatus.Sleep;
   o._interval = 100;
   o._count    = 0;
   // @attribute
   o.callback  = null;
   //..........................................................
   // @method
   o.name      = FThread_name;
   o.statusCd  = FThread_statusCd;
   o.process   = FThread_process;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FThread_name(){
   return this._name;
}

//==========================================================
// <T>获得状态。</T>
//
// @method
// @return 状态
//==========================================================
function FThread_statusCd(){
   return this._statusCd;
}

//==========================================================
// <T>调用处理。</T>
//
// @method
// @return 名称
//==========================================================
function FThread_process(){
   var o = this;
   if(o.count > 0){
      if(o.run){
         if(o.owner){
            o.run.call(o.owner, o);
         }else{
            o.run(o);
         }
      }
      o.count = o.interval;
      o.count--;
   }
}
