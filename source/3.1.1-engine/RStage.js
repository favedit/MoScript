//==========================================================
// <T>舞台管理器。</T>
//
// @author maocy
// @history 141231
//==========================================================
var RStage = new function RStage(){
   var o = this;
   //..........................................................
   // @attribute
   o._active        = true;
   o._interval      = 1000 / 40;
   o._stages        = null;
   //..........................................................
   // @listener
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   //..........................................................
   // @event
   o.onProcess      = RStage_onProcess;
   //..........................................................
   // @method
   o.construct      = RStage_construct;
   o.register       = RStage_register;
   o.unregister     = RStage_unregister;
   o.active         = RStage_active;
   o.deactive       = RStage_deactive;
   o.process        = RStage_process;
   o.start          = RStage_start;
   //..........................................................
   // @construct
   o.construct();
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function RStage_onProcess(){
   RStage.process();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}

//==========================================================
// <T>注册一个舞台。</T>
//
// @method
// @param name:String 名称
// @param stage:FStage 舞台
//==========================================================
function RStage_register(name, stage){
   var o = this;
   var stages = o._stages;
   if(!stages){
      stages = o._stages = new TDictionary();
   }
   stages.set(name , stage);
}

//==========================================================
// <T>注销一个舞台。</T>
//
// @method
// @param stage:FStage 舞台
//==========================================================
function RStage_unregister(stage){
   this._stages.removeValue(stage);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function RStage_active(){
   var o = this;
   var stages = o._stages;
   if(stages != null){
      var c = stages.count();
      for(var i = 0; i < c; i++){
         stages.valueAt(i).active();
      }
   }
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function RStage_deactive(){
   var o = this;
   var stages = o._stages;
   if(stages != null){
      var c = stages.count();
      for(var i = 0; i < c; i++){
         stages.valueAt(i).deactive();
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function RStage_process(){
   var o = this;
   if(o._active){
      try{
         // 前处理
         o.lsnsEnterFrame.process(o);
         // 舞台处理
         var stages = o._stages;
         if(stages){
            var count = stages.count();
            for(var i = 0; i < count; i++){
               stages.valueAt(i).process();
            }
         }
         // 后处理
         o.lsnsLeaveFrame.process(o);
         RTimer.update();
      }catch(e){
         alert(e);
      }
   }
}

//==========================================================
// <T>启动处理。</T>
//
// @method
// @param interval:Integer 执行间隔
//==========================================================
function RStage_start(interval){
   var o = this;
   // 引擎配置
   RE3dEngine.setup();
   // 激活舞台
   o.active();
   // 舞台处理
   o.process();
   // 启动时间处理
   if(interval == null){
      interval = o._interval;
   }
   RTimer.setup();
   setInterval('RStage_onProcess()', parseInt(interval));
}
