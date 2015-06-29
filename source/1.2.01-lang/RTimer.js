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
      return o;
   }

   //===========================================================
   // <T>配置处理。</T>
   //
   // @method
   //===========================================================
   MO.RTimer.prototype.setup = function RTimer_setup(){
      var o = this;
      var tick = new Date().getTime();
      o._startTime = tick;
      o._lastTime = tick;
   }

   //====================================1=======================
   // <T>获得现在时刻。</T>
   //
   // @method
   // @return Number 时刻
   //===========================================================
   MO.RTimer.prototype.now = function RTimer_now(){
      return new Date().getTime();
   }

   //===========================================================
   // <T>获得当前时间。</T>
   //
   // @method
   // @return Number 时间
   //===========================================================
   MO.RTimer.prototype.current = function RTimer_current(){
      return this._lastTime;
   }

   //===========================================================
   // <T>获得速率(次/秒)。</T>
   //
   // @method
   // @return Number 速率
   //===========================================================
   MO.RTimer.prototype.rate = function RTimer_rate(){
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
   MO.RTimer.prototype.update = function RTimer_update(){
      var o = this;
      o._count++;
      o._lastTime = new Date().getTime();
   }
   //..........................................................
   // 实例化内容
   MO.RTimer = new RTimer();
   MO.Timer = MO.RTimer;
}
