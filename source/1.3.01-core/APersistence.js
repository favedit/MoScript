//============================================================
// <T>属性描述类。</T>
//
// @property
// @param name:String 名称
// @param dataCd:EDataType 数据类型
// @param dataClass:Function 数据类对象
// @author maocy
// @version 150805
//============================================================
MO.APersistence = function APersistence(name, dataCd, dataClass){
   var o = this;
   MO.AAnnotation.call(o, name);
   //..........................................................
   // @declare
   o._annotationCd = MO.EAnnotation.Persistence;
   o._inherit      = true;
   o._ordered      = true;
   //..........................................................
   // @attribute
   o._dataCd       = dataCd;
   o._dataClass    = dataClass;
   //..........................................................
   // @method
   o.dataCd        = MO.APersistence_dataCd;
   o.dataClass     = MO.APersistence_dataClass;
   // @method
   o.newInstance   = MO.APersistence_newInstance;
   // @method
   o.toString      = MO.APersistence_toString;
   return o;
}

//============================================================
// <T>获得数据类型。</T>
//
// @method
// @return EDataType 数据类型
//============================================================
MO.APersistence_dataCd = function APersistence_dataCd(){
   return this._dataCd;
}

//============================================================
// <T>获得数据类对象。</T>
//
// @method
// @return Function 数据类对象
//============================================================
MO.APersistence_dataClass = function APersistence_dataClass(){
   return this._dataClass;
}

//============================================================
// <T>创建实例。</T>
//
// @method
// @return FObject 实例
//============================================================
MO.APersistence_newInstance = function APersistence_newInstance(){
   return MO.Class.create(this._dataClass);
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APersistence_toString = function APersistence_toString(){
   return '<' + this._annotationCd + ',name=' + this._name + '>';
}
