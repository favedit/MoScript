﻿//==========================================================
// <T>标签类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
MO.FTag = function FTag(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._name      = 'Tag';
   o._children  = null;
   o._trimLeft  = false;
   o._trimRight = false;
   //..........................................................
   // @event
   o.onBegin    = MO.FTag_onBegin;
   o.onEnd      = MO.FTag_onEnd;
   //..........................................................
   // @method
   o.name       = MO.FTag_name;
   // @method
   o.set        = MO.FTag_set;
   o.push       = MO.FTag_push;
   o.parse      = MO.FTag_parse;
   // @method
   o.toString   = MO.FTag_toString;
   o.innerDump  = MO.FTag_innerDump;
   o.dump       = MO.FTag_dump;
   return o;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
// @param p:context:FTagContext 环境
// @return EResult 处理结果
//==========================================================
MO.FTag_onBegin = function FTag_onBegin(p){
   return MO.EResult.Continue;
}

//==========================================================
// <T>结束处理。</T>
//
// @method
// @param p:context:FTagContext 环境
// @return EResult 处理结果
//==========================================================
MO.FTag_onEnd = function FTag_onEnd(p){
   return MO.EResult.Continue;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return String 名称
//==========================================================
MO.FTag_name = function FTag_name(){
   return this._name;
}

//==========================================================
// <T>设置属性值。</T>
//
// @method
// @param n:name:String 名称
// @param v:level:Integer 内容
//==========================================================
MO.FTag_set = function FTag_set(n, v){
   throw new MO.TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
}

//==========================================================
// <T>增加一个子标签。</T>
//
// @method
// @param p:tag:FTag 子标签
//==========================================================
MO.FTag_push = function FTag_push(p){
   var o = this;
   var ts = o._children;
   if(ts == null){
      ts = o._children = new MO.TObjects();
   }
   ts.push(p);
}

//==========================================================
// <T>解析处理。</T>
//
// @method
// @param p:context:FTagContext 环境
//==========================================================
MO.FTag_parse = function FTag_parse(p){
   var o = this;
   // 开始处理
   var r = o.onBegin(p);
   if(r == MO.EResult.Continue){
      // 子标签处理
      var ts = o._children;
      if(ts){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.get(i);
            r = t.parse(p);
            if(r == MO.EResult.Cancel){
               return r;
            }
            p._trimLeft = t._trimLeft;
            p._trimRight = t._trimRight;
         }
      }
      return o.onEnd(p);
   }
   return r;
}

//==========================================================
//<T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.FTag_toString = function FTag_toString(){
   return null;
}

//==========================================================
//<T>获取运行时信息。</T>
//
// @method
// @param ps:source:TString 信息
// @param pt:tag:FTag 标签
// @param pl:level:Integer 级别
//==========================================================
MO.FTag_innerDump = function FTag_innerDump(ps, pt, pl){
   var o = this;
   ps.appendRepeat('   ', pl);
   ps.append(MO.Class.dump(pt));
   // 追加属性
   var s = pt.toString();
   if(!MO.MO.Lang.String.isEmpty(s)){
      ps.append(' [', s, ']');
   }
   // 追加子标签
   var ts = pt._children;
   if(ts){
      ps.append('\n');
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         o.innerDump(ps, t, pl + 1);
         if(i < c - 1){
            ps.append('\n');
         }
      }
   }
}

//==========================================================
//<T>获取运行时信息。</T>
//
// @method
// @return String 运行信息
//==========================================================
MO.FTag_dump = function FTag_dump(){
   var result = new MO.TString();
   this.innerDump(result, this, 0);
   return result.toString();
}
