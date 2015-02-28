//==========================================================
// <T>标签判断真类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
MO.FTagNotEquals = function FTagNotEquals(o){
   o = RClass.inherits(this, o, MO.FTag);
   //..........................................................
   // @attribute
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   //..........................................................
   // @event
   o.onBegin   = FTagNotEquals_onBegin;
   //..........................................................
   // @method
   o.set       = FTagNotEquals_set;
   o.toString  = FTagNotEquals_toString;
   return o;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   // @return EResult 处理结果
   //==========================================================
   function FTagNotEquals_onBegin(p){
      var o = this;
      var r = true;
      var s = p.get(o._source);
      var vs = o._value.split('|');
      var c = vs.length;
      for(var i = 0; i < c; i++){
         var v = vs[i]
         if(s == v){
            r = false;
            break;
         }
      }
      return r ? EResult.Continue : EResult.Skip;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param v:level:Integer 内容
   //==========================================================
   function FTagNotEquals_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
         case 'value':
            o._value = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }


   //==========================================================
   //<T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   function FTagNotEquals_toString(){
      var o = this;
      return 'source=' + o._source + ', value=' + o._value;
   }
}
