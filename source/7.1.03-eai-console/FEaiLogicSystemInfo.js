//==========================================================
// <T>系统信息。</T>
//
// @class
// @author maocy
// @history 150810
//==========================================================
MO.FEaiLogicSystemInfo = function FEaiLogicSystemInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._sessionId = MO.Class.register(o, [new MO.AGetter('_sessionId'), new MO.APersistence('_sessionId', MO.EDataType.String)]);
   o._date      = MO.Class.register(o, [new MO.AGetter('_date'), new MO.APersistence('_date', MO.EDataType.String)]);
   o._token     = MO.Class.register(o, [new MO.AGetter('_token'), new MO.APersistence('_token', MO.EDataType.Uint32)]);
   return o;
}
