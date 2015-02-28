//==========================================================
// <T>标签判断真类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
MO.FTagTrue = function FTagTrue(o){
   o = RClass.inherits(this, o, MO.FTag);
   //..........................................................
   // @attribute
   o._trimLeft = true;
   o._source   = null;
   //..........................................................
   // @event
   o.onBegin   = FTagTrue_onBegin;
   //..........................................................
   // @method
   o.set       = FTagTrue_set;
   o.toString  = FTagTrue_toString;
   return o;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   // @return EResult 处理结果
   //==========================================================
   function FTagTrue_onBegin(p){
      var o = this;
      var r = false;
      var ns = o._source.split('|');
      var c = ns.length;
      for(var i = 0; i < c; i++){
         var n = ns[i]
         var v = p.get(n);
         if(RBoolean.parse(v)){
            r = true;
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
   function FTagTrue_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
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
   function FTagTrue_toString(){
      var o = this;
      return 'source=' + o._source;
   }
}
