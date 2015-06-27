//==========================================================
// <T>标签类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
MO.FTagText = function FTagText(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   //..........................................................
   // @attribute
   o._text    = MO.Class.register(o, new MO.AGetSet('_text'));
   //..........................................................
   // @event
   o.onBegin  = MO.FTagText_onBegin;
   //..........................................................
   // @method
   o.toString = MO.FTagText_toString;
   return o;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
// @param p:context:FTagContext 环境
// @return EResult 处理结果
//==========================================================
MO.FTagText_onBegin = function FTagText_onBegin(p){
   var t = this._text;
   if(p._trimLeft){
      if(MO.RString.startsWith(t, '\r')){
         t = t.substring(1);
      }
      if(MO.RString.startsWith(t, '\n')){
         t = t.substring(1);
      }
   }
   if(p._trimRight){
      if(MO.RString.endsWith(t, '\r')){
         t = t.substring(0, t.length - 1);
      }
      if(MO.RString.endsWith(t, '\n')){
         t = t.substring(0, t.length - 1);
      }
   }
   p.write(t);
   return MO.EResult.Skip;
}

//==========================================================
//<T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.FTagText_toString = function FTagText_toString(){
   var o = this;
   return '{' + o._text + '}';
}
