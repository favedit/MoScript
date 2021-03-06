﻿//============================================================
// <T>属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @author maocy
// @version 141231
//============================================================
function AProperty(n, l){
   var o = this;
   AAnnotation.call(o, n);
   //..........................................................
   // @declare
   o._inherit      = true;
   o._annotationCd = EAnnotation.Property;
   //..........................................................
   // @attribute
   o._linker       = null;
   o._force        = false;
   //..........................................................
   // @method
   o.code          = AProperty_code;
   o.build         = AProperty_build;
   o.load          = AProperty_load;
   o.save          = AProperty_save;
   o.toString      = AProperty_toString;
   //..........................................................
   // @construct
   var ln = null;
   if(l == null){
      if(RString.startsWith(n, '_')){
         ln = n.substring(1);
      }else{
         ln = n;
      }
      ln = RString.toUnderline(ln);
   }else{
      ln = l;
   }
   o._linker = ln;
   return o;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
function AProperty_code(){
   return this._linker;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param v:value:Object 对象
//============================================================
function AProperty_build(){
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
function AProperty_load(v, x){
   var o = this;
   v[o._name] = x.get(o._linker);
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
function AProperty_save(v, x){
   var o = this;
   x.set(o._linker, v[o._name]);
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function AProperty_toString(){
   var o = this;
   return '<' + o._annotationCd + ',linker=' + o._linker + '>';
}
