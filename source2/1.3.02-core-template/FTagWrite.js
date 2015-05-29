with(MO){
   //==========================================================
   // <T>标签输出类。</T>
   //
   // @class
   // @author maocy
   // @version 150114
   //==========================================================
   MO.FTagWrite = function FTagWrite(o){
      o = RClass.inherits(this, o, FTag);
      //..........................................................
      // @attribute
      o._source  = null;
      //..........................................................
      // @event
      o.onBegin  = FTagWrite_onBegin;
      //..........................................................
      // @method
      o.set      = FTagWrite_set;
      o.toString = FTagWrite_toString;
      return o;
   }

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   // @return EResult 处理结果
   //==========================================================
   MO.FTagWrite_onBegin = function FTagWrite_onBegin(p){
      var o = this;
      var v = p.get(o._source);
      p.write(v);
      return EResult.Skip;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param v:level:Integer 内容
   //==========================================================
   MO.FTagWrite_set = function FTagWrite_set(n, v){
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
   MO.FTagWrite_toString = function FTagWrite_toString(){
      var o = this;
      return 'source=' + o._source;
   }
}
