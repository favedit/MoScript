with(MO){
   //==========================================================
   // <T>计时管理类。</T>
   //
   // @reference
   // @author maocy
   // @version 150106
   //==========================================================
   MO.RTimer = function RTimer(){
      var o = this;
      //..........................................................
      // @attribute
      o._startTime = 0;
      o._lastTime  = 0;
      o._count     = 0;
      //..........................................................
      // @method
      o.setup      = RTimer_setup;
      o.now        = RTimer_now;
      o.current    = RTimer_current;
      o.rate       = RTimer_rate;
      o.update     = RTimer_update;
      return o;
   }

   //===========================================================
   // <T>配置处理。</T>
   //
   // @method
   //===========================================================
   MO.RTimer_setup = function RTimer_setup(){
      var o = this;
      var n = new Date().getTime();
      o._startTime = n;
      o._lastTime = n;
   }

   //====================================1=======================
   // <T>获得现在时刻。</T>
   //
   // @method
   // @return Number 时刻
   //===========================================================
   MO.RTimer_now = function RTimer_now(){
      return new Date().getTime();
   }

   //===========================================================
   // <T>获得当前时间。</T>
   //
   // @method
   // @return Number 时间
   //===========================================================
   MO.RTimer_current = function RTimer_current(){
      return this._lastTime;
   }

   //===========================================================
   // <T>获得速率(次/秒)。</T>
   //
   // @method
   // @return Number 速率
   //===========================================================
   MO.RTimer_rate = function RTimer_rate(){
      var o = this;
      if(o._count == 0){
         return 0;
      }
      var t = o._lastTime - o._startTime;
      var c = o._count * 1000 / t;
      return parseInt(c);
   }

   //===========================================================
   // <T>更新处理。</T>
   //
   // @method
   //===========================================================
   MO.RTimer_update = function RTimer_update(){
      var o = this;
      o._count++;
      o._lastTime = new Date().getTime();
   }
   //..........................................................
   // 实例化内容
   MO.RTimer = new RTimer();
}
