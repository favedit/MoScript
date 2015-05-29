with(MO){
   //==========================================================
   // <T>随机数管理器。</T>
   //
   // @reference
   // @author maocy
   // @version 150523
   //==========================================================
   MO.RRandom = function RRandom(){
      var o = this;
      //..........................................................
      o._seed = (new Date()).getTime();
      //..........................................................
      // @define
      o.get  = RRandom_get;
      o.rand = RRandom_rand;
      return o;
   }

   //===========================================================
   // <T>获得一个随机数。</T>
   //
   // @method
   // @return 随机数
   //===========================================================
   MO.RRandom_get = function RRandom_get(){
      var o = this;
      o._seed = (o._seed * 9301 + 49297) % 233280;
      return o._seed/(233280.0); 
   }

   //===========================================================
   // <T>根据种子获得一个随机数。</T>
   //
   // @method
   // @param seed:Number 种子
   // @return 随机数
   //===========================================================
   MO.RRandom_rand = function RRandom_rand(seed){
      var o = this;
      var value = o.get() * seed;
      return Math.ceil(value);
   }
   //..........................................................
   // 实例化内容
   MO.RRandom = new RRandom();
}
