//==========================================================
// <T>号令二级页面头部个人信息。</T>
//
// @class
// @author zhaoyihan
// @history 151124
//==========================================================
MO.FEaiCockpitNoticeUserData = function FEaiCockpitNoticeUserData(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._label =           MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._total =           MO.Class.register(o, [new MO.AGetter('_total'), new MO.APersistence('_total', MO.EDataType.Int32)]);
   o._positionLabel =   MO.Class.register(o, [new MO.AGetter('_positionLabel'), new MO.APersistence('_positionLabel', MO.EDataType.String)]);
   o._publishDate =     MO.Class.register(o, [new MO.AGetter('_publishDate'), new MO.APersistence('_publishDate', MO.EDataType.String)]);
   o._userCount =       MO.Class.register(o, [new MO.AGetter('_userCount'), new MO.APersistence('_userCount', MO.EDataType.Int32)]);
   o._readprocess =     MO.Class.register(o, [new MO.AGetter('_readprocess'), new MO.APersistence('_readprocess', MO.EDataType.Double)]);
   return o;
}