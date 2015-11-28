//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitForecastMessageAchievementProblemData = function FEaiCockpitForecastMessageAchievementProblemData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._departmentLable          = MO.Class.register(o, [new MO.AGetter('_departmentLable'), new MO.APersistence('_departmentLable', MO.EDataType.String)]);
   o._marketerTotal            = MO.Class.register(o, [new MO.AGetter('_marketerTotal'), new MO.APersistence('_marketerTotal', MO.EDataType.Int32)]);
   o._noMarketer               = MO.Class.register(o, [new MO.AGetter('_noMarketer'), new MO.APersistence('_noMarketer', MO.EDataType.Int32)]);
   o._Rate                     = MO.Class.register(o, [new MO.AGetter('_Rate'), new MO.APersistence('_Rate', MO.EDataType.Double)]);
   // @attribute
   o._noAchYear                = MO.Class.register(o, [new MO.AGetter('_noAchYear'), new MO.APersistence('_noAchYear',MO.EDataType.Int32)]);
   return o;
}