//==========================================================
// <T>资源场景空间。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneLayer(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 类型
   o._typeCd        = null;
   // @attribute 变换类型
   o._transformCd   = null;
   // @attribute 显示集合
   o._displays      = null;
   //..........................................................
   // @method
   o.typeCd         = FE3sSceneLayer_typeCd;
   o.setTypeCd      = FE3sSceneLayer_setTypeCd;
   o.transformCd    = FE3sSceneLayer_transformCd;
   o.setTransformCd = FE3sSceneLayer_setTransformCd;
   o.displays       = FE3sSceneLayer_displays;
   // @method
   o.unserialize    = FE3sSceneLayer_unserialize;
   o.saveConfig     = FE3sSceneLayer_saveConfig;
   return o;
}

//==========================================================
// <T>获得类型。</T>
//
// @method
// @return String 类型
//==========================================================
function FE3sSceneLayer_typeCd(){
   return this._typeCd;
}

//==========================================================
// <T>设置类型。</T>
//
// @method
// @param p:value:String 类型
//==========================================================
function FE3sSceneLayer_setTypeCd(p){
   this._typeCd = p;
}

//==========================================================
// <T>获得变换类型。</T>
//
// @method
// @return String 变换类型
//==========================================================
function FE3sSceneLayer_transformCd(){
   return this._transformCd;
}

//==========================================================
// <T>设置变换类型。</T>
//
// @method
// @param p:value:String 变换类型
//==========================================================
function FE3sSceneLayer_setTransformCd(p){
   this._transformCd = p;
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return TObjects 显示集合
//==========================================================
function FE3sSceneLayer_displays(){
   return this._displays;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneLayer_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._typeCd = p.readString();
   o._transformCd = p.readString();
   // 读取显示集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FE3sSceneDisplay);
         d.unserialize(p);
         s.push(d);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sSceneLayer_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   p.set('type_cd', o._typeCd);
   p.set('transform_cd', o._transformCd);
   // 存储显示集合
   var xds = p.create('DisplayCollection');
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xds.create('Display'));
      }
   }
}
