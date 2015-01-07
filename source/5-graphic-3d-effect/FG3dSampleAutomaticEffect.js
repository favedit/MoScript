//==========================================================
// <T>简单自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dSampleAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   //..........................................................
   // @attribute
   o._context       = null;
   o._program       = null;
   //..........................................................
   // @method
   o.drawRenderable = FG3dSampleAutomaticEffect_drawRenderable;
   o.load           = FG3dSampleAutomaticEffect_load;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FG3dSampleAutomaticEffect_drawRenderable(r){
   var o = this;
   var c = o._context;
   var p = o._program;
   // 绑定程序
   //c.setProgram(p);
   // 绑定所有属性流
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   // 绘制处理
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}

//==========================================================
// <T>从网络地址加载渲染器。</T>
//
// @method
//==========================================================
function FG3dSampleAutomaticEffect_load(){
   var o = this;
   var u = RBrowser.contentPath() + o._path + "simple.automatic.xml";
   o.loadUrl(u);
}
