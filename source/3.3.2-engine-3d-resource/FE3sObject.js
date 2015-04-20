//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE3sObject(o){
   o = RClass.inherits(this, o, FObject, MAttributeParent, MAttributeGuid, MAttributeCode, MAttributeLabel);
   //..........................................................
   // @attribute
   o._typeName   = null;
   o._isClone    = false;
   //..........................................................
   // @method
   o.unserialize = FE3sObject_unserialize;
   o.saveConfig  = FE3sObject_saveConfig;
   o.clone       = FE3sObject_clone;
   // @method
   o.dispose     = FE3sObject_dispose;
   return o;
}

//==========================================================
// <T>从输入流里反序列化数据内容</T>
//
// @param input:FByteStream 数据流
//==========================================================
function FE3sObject_unserialize(input){
   var o = this;
   o._typeName = input.readString();
   o._guid = input.readString();
   o._code = input.readString();
   o._label = input.readString();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sObject_saveConfig(xconfig){
   var o = this;
   // 设置类型
   if(!RString.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   // 存储属性
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
   if(o._isClone){
      xconfig.set('is_clone', 'Y');
   }
}

//==========================================================
// <T>克隆资源对象。</T>
//
// @method
// @param instance:FE3sObject 实例对象
// @return FE3sObject 资源对象
//==========================================================
function FE3sObject_clone(instance){
   var o = this;
   var result = null;
   if(instance){
      result = instance;
   }else{
      result = RClass.create(o.constructor);
   }
   result._isClone = true;
   result._typeName = o._typeName;
   result._guid = o._guid;
   result._code = o._code;
   result._label = o._label;
   return result;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sObject_dispose(){
   var o = this;
   // 父处理
   o.__base.MAttributeParent.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
