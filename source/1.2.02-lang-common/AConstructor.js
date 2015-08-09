//============================================================
// <T>构造描述类。</T>
//
// @property
// @param name:String 名称
// @param dataCd:EDataType 数据类型
// @param dataClass:Function 类型对象
// @author maocy
// @version 150807
//============================================================
MO.AConstructor = function AConstructor(name, dataCd, dataClass){
   var o = this;
   MO.AAnnotation.call(o, name);
   //..........................................................
   // @attribute
   o._annotationCd = MO.EAnnotation.Constructor;
   o._inherit      = true;
   o._ordered      = true;
   // @attribute
   o._dataCd       = dataCd;
   o._dataClass    = dataClass;
   //..........................................................
   // @method
   o.dataCd        = MO.AConstructor_dataCd;
   o.dataClass     = MO.AConstructor_dataClass;
   return o;
}

//============================================================
// <T>获得数据类型。</T>
//
// @method
// @return EDataType 数据类型
//============================================================
MO.AConstructor_dataCd = function AConstructor_dataCd(){
   return this._dataCd;
}

//============================================================
// <T>获得数据类对象。</T>
//
// @method
// @return Function 数据类对象
//============================================================
MO.AConstructor_dataClass = function AConstructor_dataClass(){
   return this._dataClass;
}
