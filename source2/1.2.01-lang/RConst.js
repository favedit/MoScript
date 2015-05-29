with(MO){
   //==========================================================
   // <T>数学常量管理类</T>
   //
   // @reference
   // @author maocy
   // @version 150311
   //==========================================================
   MO.RConst = function RConst(){
      var o = this;
      //..........................................................
      // @const
      o.PI_2         = Math.PI / 2;
      o.PI           = Math.PI;
      o.PI2          = Math.PI * 2;
      // @const
      o.RADIAN_RATE  = 180 / Math.PI;
      o.DEGREE_RATE  = Math.PI / 180;
      // @const
      o.PERCENT_10   = 1 / 10;
      o.PERCENT_100  = 1 / 100;
      o.PERCENT_1000 = 1 / 1000;
      // @const
      o.identity3x3  = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      o.identity4x4  = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      return o;
   }
   //..........................................................
   // 实例化内容
   MO.RConst = new RConst();
}
