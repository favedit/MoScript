//==========================================================
// <T>资源场景空间。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sDisplayLayer(o){
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
   o.typeCd         = FE3sDisplayLayer_typeCd;
   o.setTypeCd      = FE3sDisplayLayer_setTypeCd;
   o.transformCd    = FE3sDisplayLayer_transformCd;
   o.setTransformCd = FE3sDisplayLayer_setTransformCd;
   o.displays       = FE3sDisplayLayer_displays;
   // @method
   o.unserialize    = FE3sDisplayLayer_unserialize;
   o.saveConfig     = FE3sDisplayLayer_saveConfig;
   return o;
}

//==========================================================
// <T>获得类型。</T>
//
// @method
// @return String 类型
//==========================================================
function FE3sDisplayLayer_typeCd(){
   return this._typeCd;
}

//==========================================================
// <T>设置类型。</T>
//
// @method
// @param p:value:String 类型
//==========================================================
function FE3sDisplayLayer_setTypeCd(p){
   this._typeCd = p;
}

//==========================================================
// <T>获得变换类型。</T>
//
// @method
// @return String 变换类型
//==========================================================
function FE3sDisplayLayer_transformCd(){
   return this._transformCd;
}

//==========================================================
// <T>设置变换类型。</T>
//
// @method
// @param p:value:String 变换类型
//==========================================================
function FE3sDisplayLayer_setTransformCd(p){
   this._transformCd = p;
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return TObjects 显示集合
//==========================================================
function FE3sDisplayLayer_displays(){
   return this._displays;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sDisplayLayer_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取属性
   o._typeCd = input.readString();
   o._transformCd = input.readString();
   // 读取显示集合
   var displayCount = input.readUint16();
   if(displayCount > 0){
      var displays = o._displays = new TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = RClass.create(FE3sSceneDisplay);
         display.unserialize(input);
         displays.push(display);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sDisplayLayer_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   // 存储属性
   xconfig.set('type_cd', o._typeCd);
   xconfig.set('transform_cd', o._transformCd);
   // 存储显示集合
   var displays = o._displays;
   if(displays){
      var xdisplays = xconfig.create('DisplayCollection');
      var count = displays.count();
      for(var i = 0; i < count; i++){
         displays.at(i).saveConfig(xdisplays.create('Display'));
      }
   }
}
