﻿//============================================================
// <T>属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @author maocy
// @version 141231
//============================================================
MO.AProperty = function AProperty(name, linker){
   var o = this;
   MO.AAnnotation.call(o, name);
   //..........................................................
   // @declare
   o._inherit      = true;
   o._annotationCd = MO.EAnnotation.Property;
   //..........................................................
   // @attribute
   o._linker       = null;
   o._force        = false;
   //..........................................................
   // @method
   o.code          = MO.AProperty_code;
   o.build         = MO.AProperty_build;
   o.load          = MO.AProperty_load;
   o.save          = MO.AProperty_save;
   o.toString      = MO.AProperty_toString;
   //..........................................................
   // @construct
   var code = null;
   if(linker == null){
      if(MO.Lang.String.startsWith(name, '_')){
         code = name.substring(1);
      }else{
         code = name;
      }
      code = MO.Lang.String.toUnderline(code);
   }else{
      code = linker;
   }
   o._linker = code;
   return o;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
MO.AProperty_code = function AProperty_code(){
   return this._linker;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param v:value:Object 对象
//============================================================
MO.AProperty_build = function AProperty_build(){
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
MO.AProperty_load = function AProperty_load(v, x){
   v[this._name] = x.get(this._linker);
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
MO.AProperty_save = function AProperty_save(v, x){
   x.set(this._linker, v[this._name]);
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.AProperty_toString = function AProperty_toString(){
   return '<' + this._annotationCd + ',linker=' + this._linker + '>';
}
