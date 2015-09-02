//==========================================================
// <T>数据行。</T>
//
// @tool
// @author maocy
// @version 150901
//==========================================================
MO.FDataRow = function FDataRow(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._dataset    = MO.Class.register(o, new MO.AGetSet('_dataset'));
   o._index      = MO.Class.register(o, new MO.AGetSet('_index'), 0);
   // @attribute
   o._statusCd   = MO.Class.register(o, new MO.AGetSet('_statusCd'), MO.EDataStatus.Unknown);
   // @attribute
   o._dataValues = null;
   //..........................................................
   // @method
   o.construct   = MO.FDataRow_construct;
   // @method
   o.isEmpty     = MO.FDataRow_isEmpty;
   o.count       = MO.FDataRow_count;
   o.get         = MO.FDataRow_get;
   o.set         = MO.FDataRow_set;
   o.clear       = MO.FDataRow_clear;
   // @method
   o.loadConfig  = MO.FDataRow_loadConfig;
   o.saveConfig  = MO.FDataRow_saveConfig;
   // @method
   o.dispose     = MO.FDataRow_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDataRow_construct = function FDataRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._dataValues = new MO.TDictionary();
}

//==========================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
MO.FDataRow_isEmpty = function FDataRow_isEmpty(){
   return this._dataValues.isEmpty();
}

//==========================================================
// <T>获得内容总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
MO.FDataRow_count = function FDataRow_count(){
   return this._dataValues.count();
}

//==========================================================
// <T>获得指定名称的内容。</T>
//
// @method
// @param name:String 名称
// @param defaultValue:String 默认
// @return String 内容
//==========================================================
MO.FDataRow_get = function FDataRow_get(name, defaultValue){
   var o = this;
   var dataValue = o._dataValues.get(name);
   if(dataValue){
      return dataValue.get();
   }
   return defaultValue;
}

//==========================================================
// <T>设置指定名称的内容。</T>
//
// @method
// @param name:String 名称
// @param value:Object 数据内容
// @param typeCd:EDataType 数据类型
//==========================================================
MO.FDataRow_set = function FDataRow_set(name, value, typeCd){
   var o = this;
   var dataValues = o._dataValues;
   var dataValue = dataValues.get(name);
   if(!dataValue){
      dataValue = MO.Class.create(MO.FDataValue);
      dataValues.set(name, dataValue);
   }
   dataValue.set(value, typeCd);
}

//==========================================================
// <T>清空数据内容。</T>
//
// @method
//==========================================================
MO.FDataRow_clear = function FDataRow_clear(){
   var o = this;
   var dataValues = o._dataValues;
   var count = dataValues.count();
   for(var i = 0; i < count; i++){
      var dataValue = dataValues.at(i);
      dataValue.clear();
   }
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FDataRow_loadConfig = function FDataRow_loadConfig(xconfig){
   var o = this;
   // 设置属性
   o._statusCd = MO.EDataStatus.View;
   // 加载数据行
   var attributes = xconfig.attributes();
   if(attributes){
      var count = attributes.count();
      for(var i = 0; i < count; i++){
         var name = attributes.name(i);
         var value = attributes.value(i);
         o.set(name, value);
      }
   }
}

//==========================================================
// <T>保存配置信息。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FDataRow_saveConfig = function FDataRow_saveConfig(xconfig){
   var o = this;
   // 获得数据集信息
   xconfig.set('_status_cd', o._statusCd);
   // 加载数据行记录
   var dataValues = o._dataValues;
   var count = dataValues.count();
   for(var i = 0; i < count; i++){
      var name = dataValues.name(i);
      var dataValue = dataValues.value(i);
      var value = dataValue.get();
      xconfig.set(name, value);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDataRow_dispose = function FDataRow_dispose(){
   var o = this;
   o._dataValues = MO.Lang.Object.dispose(o._dataValues);
   o.__base.FObject.dispose.call(o);
}
