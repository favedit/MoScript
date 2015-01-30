//==========================================================
// <T>舞台对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FStage(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._statusActive  = false;
   o._layers        = null;
   //..........................................................
   // @listener
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   //..........................................................
   // @method
   o.construct     = FStage_construct;
   o.registerLayer = RStage_registerLayer;
   o.layers        = FStage_layers;
   o.active        = FStage_active;
   o.deactive      = FStage_deactive;
   o.process       = FStage_process;
   o.dispose       = FStage_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FStage_construct(){
   var o = this;
   o.__base.FObject.construct(o);
   o._layers = new TDictionary();
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}

//==========================================================
// <T>注册一个显示层。</T>
//
// @method
// @param n:name:String 名称
// @param l:layer:FDisplayLayer 显示层
//==========================================================
function RStage_registerLayer(n, l){
   var o = this;
   var ls = o._layers;
   if(ls == null){
      ls = o._layers = new TDictionary();
   }
   ls.set(n , l);
}

//==========================================================
// <T>获得层次集合。</T>
//
// @method
// @return TDictionary 层次集合
//==========================================================
function FStage_layers(){
   return this._layers;
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function FStage_active(){
   var o = this;
   // 设置状态
   o._statusActive = true;
   // 层集合处理
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).active();
      }
   }
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FStage_deactive(){
   var o = this;
   // 层集合处理
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).deactive();
      }
   }
   // 设置状态
   o._statusActive = false;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FStage_process(){
   var o = this;
   // 前处理
   o.lsnsEnterFrame.process(o);
   // 舞台处理
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).process();
      }
   }
   // 后处理
   o.lsnsLeaveFrame.process(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FStage_dispose(){
   var o = this;
   if(o._layers){
      o._layers.dispose();
      o._layers = null;
   }
   o.__base.FObject.dispose(o);
}
