//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3Template(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._guid       = null;
   // @attribute
   o._activeTheme = null;
   o._themes     = null;
   o._displays   = null;
   //..........................................................
   // @method
   o.themes      = FRs3Template_themes;
   o.displays    = FRs3Template_displays;
   // @method
   o.unserialize = FRs3Template_unserialize;
   return o;
}

//==========================================================
// <T>获得主题集合。</T>
//
// @method
// @return 
//==========================================================
function FRs3Template_themes(){
   return this._themes;
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return 
//==========================================================
function FRs3Template_displays(){
   return this._displays;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Template_unserialize(p){
   // 读取父信息
   var o = this;
   o._guid = p.readString();
   // 读取主题集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._themes = new TObjects();
      for(var i = 0; i < c; i++){
         // 创建主题
         var t = RClass.create(FRs3TemplateTheme);
         t.unserialize(p);
         s.push(t);
         // 设置激活的主题
         if(o._activeTheme == null){
            o._activeTheme = t;
         }
      }
   }
   // 读取显示集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FRs3Display);
         d._template = o;
         d.unserialize(p);
         s.push(d);
      }
   }
}
