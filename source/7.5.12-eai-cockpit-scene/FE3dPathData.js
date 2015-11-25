//==========================================================
// <T>路径数据。</T>
//
//
// @class
// @author adu
// @history 150207
//==========================================================
MO.FE3dPathData = function FE3dPathData(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._origin                  = MO.Class.register(o, new MO.AGetter('_origin'));
   o._destination             = MO.Class.register(o, new MO.AGetter('_destination'));
   o._playing                 = MO.Class.register(o, new MO.AGetter('_playing'), false);
   o._duration                = 0;
   o._startTime               = 0;
   o._now                     = 0;
   o._rate                    = 0;
   //..........................................................
   // @method
   o.construct                = MO.FE3dPathData_construct;
   o.setup                    = MO.FE3dPathData_setup;
   o.gotoRelative             = MO.FE3dPathData_gotoRelative;
   o.nextStep                 = MO.FE3dPathData_nextStep;
   o.dispose                  = MO.FE3dPathData_dispose;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dPathData_construct = function FE3dPathData_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o._origin = new MO.SPoint2(0, 0);
   o._destination = new MO.SPoint2(0, 0);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dPathData_setup = function FE3dPathData_setup() {
   var o = this;
   o._destination.set(o._origin.x, o._origin.y);
}

//==========================================================
// <T>设置相对终点。</T>
//
// @method
//==========================================================
MO.FE3dPathData_gotoRelative = function FE3dPathData_gotoRelative(rx, ry, duration) {
   var o = this;
   o._duration = duration;
   o._origin.set(o._destination.x, o._destination.y);
   o._destination.add(rx, ry);
   o._startTime = MO.Timer.current();
   o._rate = 0;
   o._playing = true;
}

//==========================================================
// <T>下一步，返回当前位置SPoint2。</T>
//
// @method
//==========================================================
MO.FE3dPathData_nextStep = function FE3dPathData_nextStep() {
   var o = this;
   var result = new MO.SPoint2(0, 0);
   if(o._playing) {
      var now = o._now = MO.Timer.current();
      var rate = o._rate = (now - o._startTime) / o._duration;
      if(rate >= 1) {
         rate = 1;
         o._playing = false;
      }
      result.x = (o._destination.x - o._origin.x) * rate + o._origin.x;
      result.y = (o._destination.y - o._origin.y) * rate + o._origin.y;
   }else {
      result.set(o._destination.x, o._destination.y);
   }
   
   return result;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dPathData_dispose = function FE3dPathData_dispose() { 
   var o = this;
   o.__base.FObject.dispose.call(o);
}