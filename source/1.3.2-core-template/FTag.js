//==========================================================
// <T>标签类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
function FTag(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._name      = 'Tag';
   o._children  = null;
   o._trimLeft  = false;
   o._trimRight = false;
   //..........................................................
   // @event
   o.onBegin    = FTag_onBegin;
   o.onEnd      = FTag_onEnd;
   //..........................................................
   // @method
   o.name       = FTag_name;
   // @method
   o.set        = FTag_set;
   o.push       = FTag_push;
   o.parse      = FTag_parse;
   // @method
   o.toString   = FTag_toString;
   o.innerDump  = FTag_innerDump;
   o.dump       = FTag_dump;
   return o;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
// @param p:context:FTagContext 环境
// @return EResult 处理结果
//==========================================================
function FTag_onBegin(p){
   return EResult.Continue;
}

//==========================================================
// <T>结束处理。</T>
//
// @method
// @param p:context:FTagContext 环境
// @return EResult 处理结果
//==========================================================
function FTag_onEnd(p){
   return EResult.Continue;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return String 名称
//==========================================================
function FTag_name(){
   return this._name;
}

//==========================================================
// <T>设置属性值。</T>
//
// @method
// @param n:name:String 名称
// @param v:level:Integer 内容
//==========================================================
function FTag_set(n, v){
   throw new TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
}

//==========================================================
// <T>增加一个子标签。</T>
//
// @method
// @param p:tag:FTag 子标签
//==========================================================
function FTag_push(p){
   var o = this;
   var ts = o._children;
   if(ts == null){
      ts = o._children = new TObjects();
   }
   ts.push(p);
}

//==========================================================
// <T>解析处理。</T>
//
// @method
// @param p:context:FTagContext 环境
//==========================================================
function FTag_parse(p){
   var o = this;
   // 开始处理
   var r = o.onBegin(p);
   if(r == EResult.Continue){
      // 子标签处理
      var ts = o._children;
      if(ts){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.get(i);
            r = t.parse(p);
            if(r == EResult.Cancel){
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
function FTag_toString(){
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
function FTag_innerDump(ps, pt, pl){
   var o = this;
   ps.appendRepeat('   ', pl);
   ps.append(RClass.dump(pt));
   // 追加属性
   var s = pt.toString();
   if(!RString.isEmpty(s)){
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
function FTag_dump(){
   var r = new TString();
   this.innerDump(r, this, 0);
   return r.toString();
}
