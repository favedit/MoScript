//==========================================================
// <T>路径数据。</T>
//
//
// @class
// @author adu
// @history 150207
//==========================================================
MO.FEaiCockpitGroundPiece = function FEaiCockpitGroundPiece(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._origin                  = MO.Class.register(o, new MO.AGetter('_origin'));
   o._destination             = MO.Class.register(o, new MO.AGetter('_destination'));
   o._playing                 = MO.Class.register(o, new MO.AGetter('_playing'), false);
   o._alpha                   = MO.Class.register(o, new MO.AGetter('_alpha'));
   o._alphaState              = 0;
   o._duration                = 0;
   o._startTime               = 0;
   o._now                     = 0;
   o._rate                    = 0;
   //..........................................................
   // @method
   o.construct                = MO.FEaiCockpitGroundPiece_construct;
   o.setup                    = MO.FEaiCockpitGroundPiece_setup;
   o.gotoRelative             = MO.FEaiCockpitGroundPiece_gotoRelative;
   o.nextStep                 = MO.FEaiCockpitGroundPiece_nextStep;
   o.nextAlphaState           = MO.FEaiCockpitGouundPiece_nextAlphaState;
   o.dispose                  = MO.FEaiCockpitGroundPiece_dispose;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundPiece_construct = function FEaiCockpitGroundPiece_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o._origin = new MO.SPoint2(0, 0);
   o._destination = new MO.SPoint2(0, 0);
   o._alpha = 0xff;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundPiece_setup = function FEaiCockpitGroundPiece_setup() {
   var o = this;
   o._destination.set(o._origin.x, o._origin.y);
}

//==========================================================
// <T>设置相对终点。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundPiece_gotoRelative = function FEaiCockpitGroundPiece_gotoRelative(rx, ry, duration) {
   var o = this;
   o._duration = duration;
   o._origin.set(o._destination.x, o._destination.y);
   o._destination.add(rx, ry);
   o._startTime = MO.Timer.current();
   o._rate = 0;
   o._playing = true;
}

//==========================================================
// <T>下一步，返回当前位置SPoint2,同时更新alpha。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundPiece_nextStep = function FEaiCockpitGroundPiece_nextStep() {
   var o = this;
   var result = new MO.SPoint2(0, 0);
   if(o._playing) {
      var now = o._now = MO.Timer.current();
      var rate = o._rate = (now - o._startTime) / o._duration;
      rate = rate > 1 ? 1 : rate;
      result.x = (o._destination.x - o._origin.x) * rate + o._origin.x;
      result.y = (o._destination.y - o._origin.y) * rate + o._origin.y;
      var alphaState = o._alphaState;
      if (alphaState == 0) { 
         o._alpha = (0xff * (1 - rate)).toFixed();
      }else if(alphaState == 1) {
         o._alpha = (0xff * rate).toFixed();
      }
      if(rate == 1) {
         o._playing = false;
         o.nextAlphaState();
      }
   }else {
      result.set(o._destination.x, o._destination.y);
   }
   return result;
}

MO.FEaiCockpitGouundPiece_nextAlphaState = function FEaiCockpitGouundPiece_nextAlphaState() {
   var o = this;
   o._alphaState = (o._alphaState + 1) % 3;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundPiece_dispose = function FEaiCockpitGroundPiece_dispose() { 
   var o = this;
   o.__base.FObject.dispose.call(o);
}
