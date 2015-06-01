with(MO){
   //==========================================================
   // <T>标签类。</T>
   //
   // @class
   // @author maocy
   // @version 150114
   //==========================================================
   MO.FTagText = function FTagText(o){
      o = RClass.inherits(this, o, FTag);
      //..........................................................
      // @attribute
      o._text    = null;
      //..........................................................
      // @event
      o.onBegin  = FTagText_onBegin;
      //..........................................................
      // @method
      o.text     = FTagText_text;
      o.setText  = FTagText_setText;
      o.toString = FTagText_toString;
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
         if(RString.startsWith(t, '\r')){
            t = t.substring(1);
         }
         if(RString.startsWith(t, '\n')){
            t = t.substring(1);
         }
      }
      if(p._trimRight){
         if(RString.endsWith(t, '\r')){
            t = t.substring(0, t.length - 1);
         }
         if(RString.endsWith(t, '\n')){
            t = t.substring(0, t.length - 1);
         }
      }
      p.write(t);
      return EResult.Skip;
   }

   //==========================================================
   // <T>获得文本。</T>
   //
   // @method
   // @return String 文本
   //==========================================================
   MO.FTagText_text = function FTagText_text(){
      return this._text;
   }

   //==========================================================
   // <T>设置文本。</T>
   //
   // @method
   // @param p:text:String 文本
   //==========================================================
   MO.FTagText_setText = function FTagText_setText(p){
      this._text = p;
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
}
