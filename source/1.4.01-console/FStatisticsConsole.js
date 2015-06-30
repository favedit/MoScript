with(MO){
   //==========================================================
   // <T>统计控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150303
   //==========================================================
   MO.FStatisticsConsole = function FStatisticsConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd      = EScope.Local;
      o._statisticses = MO.Class.register(o, new MO.AGetter('_statisticses'));
      //..........................................................
      // @method
      o.construct     = FStatisticsConsole_construct;
      // @method
      o.register      = FStatisticsConsole_register;
      o.unregister    = FStatisticsConsole_unregister;
      // @method
      o.find          = FStatisticsConsole_find;
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
   MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
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
   MO.FStatisticsConsole_register = function FStatisticsConsole_register(n, s){
      this._statisticses.set(n, s);
   }

   //==========================================================
   // <T>注销一个统计器。</T>
   //
   // @method
   // @param n:name:String 名称
   // @return FStatistics 统计器
   //==========================================================
   MO.FStatisticsConsole_unregister = function FStatisticsConsole_unregister(n){
      return this._statisticses.remove(n);
   }

   //==========================================================
   // <T>查找一个统计器。</T>
   //
   // @method
   // @return 节点链接
   //==========================================================
   MO.FStatisticsConsole_find = function FStatisticsConsole_find(n){
      return this._statisticses.get(n);
   }

   //==========================================================
   // <T>重置所有数据。</T>
   //
   // @method
   //==========================================================
   MO.FStatisticsConsole_reset = function FStatisticsConsole_reset(e){
      var statisticses = this._statisticses;
      for(var i = statisticses.count() - 1; i >= 0; i--){
         statisticses.at(i).reset();
      }
   }

   //==========================================================
   // <T>重置所有帧数据。</T>
   //
   // @method
   //==========================================================
   MO.FStatisticsConsole_resetFrame = function FStatisticsConsole_resetFrame(u, d){
      var statisticses = this._statisticses;
      for(var i = statisticses.count() - 1; i >= 0; i--){
         statisticses.at(i).resetFrame();
      }
   }
}
