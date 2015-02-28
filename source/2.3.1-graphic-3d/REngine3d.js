//==========================================================
// <T>三维渲染引擎。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
MO.Graphic3d.REngine3d = new function REngine3d(){
   var o = this;
   //..........................................................
   // @attribute
   o.contexts = new MO.TObjects();
   //..........................................................
   // @method
   o.createContext = REngine3d_createContext;
   return o;

   //==========================================================
   // <T>创建渲染环境</T>
   //
   // @method
   // @param h:canvas:HtmlCanvasTag 页面画板
   //==========================================================
   function REngine3d_createContext(c, h){
      var o = this;
      var r = RClass.create(c);
      r.linkCanvas(h);
      o.contexts.push(r);
      return r;
   }
}
