//==========================================================
// <T>统计控制台。</T>
//
// @console
// @author maocy
// @version 150303
//==========================================================
function FStatisticsConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd      = EScope.Local;
   o._statisticses = null;
   //..........................................................
   // @method
   o.construct     = FStatisticsConsole_construct;
   // @method
   o.register      = FStatisticsConsole_register;
   o.unregister    = FStatisticsConsole_unregister;
   // @method
   o.find          = FStatisticsConsole_find;
   o.statisticses  = FStatisticsConsole_statisticses;
   // @method
   o.reset         = FStatisticsConsole_reset;
   o.resetFrame    = FStatisticsConsole_resetFrame;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FStatisticsConsole_construct(){
   var o = this;
   o._statisticses = new TDictionary();
}

//==========================================================
// <T>注册一个统计器。</T>
//
// @method
// @param n:name:String 名称
// @param s:statistics:FStatistics 统计器
//==========================================================
function FStatisticsConsole_register(n, s){
   this._statisticses.set(n, s);
}

//==========================================================
// <T>注销一个统计器。</T>
//
// @method
// @param n:name:String 名称
// @return FStatistics 统计器
//==========================================================
function FStatisticsConsole_unregister(n){
   return this._statisticses.remove(n);
}

//==========================================================
// <T>查找一个统计器。</T>
//
// @method
// @return 节点链接
//==========================================================
function FStatisticsConsole_find(n){
   return this._statisticses.get(n);
}

//==========================================================
// <T>获得统计器集合。</T>
//
// @method
// @return 统计器集合
//==========================================================
function FStatisticsConsole_statisticses(){
   return this._statisticses;
}

//==========================================================
// <T>重置所有数据。</T>
//
// @method
//==========================================================
function FStatisticsConsole_reset(e){
   var s = this._statisticses;
   for(var i = s.count() - 1; i >= 0; i--){
      s.getAt(i).reset();
   }
}

//==========================================================
// <T>重置所有帧数据。</T>
//
// @method
//==========================================================
function FStatisticsConsole_resetFrame(u, d){
   var s = this._statisticses;
   for(var i = s.count() - 1; i >= 0; i--){
      s.getAt(i).resetFrame();
   }
}
