//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderEffect(o){
   o = RClass.inherits(this, o, FRenderObject);
   //..........................................................
   // @attribute
   o._context       = null;
   o._program       = null;
   //..........................................................
   // @method
   o.setParameter   = FRenderEffect_setParameter;
   o.setSampler     = FRenderEffect_setSampler;
   o.drawRenderable = FRenderEffect_drawRenderable;
   o.loadUrl        = FRenderEffect_loadUrl;
   return o;
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pv:value:Object 数据
// @param pc:count:Integer 个数
//==========================================================
function FRenderEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}

//==========================================================
// <T>设置取样器。</T>
//
// @method
// @param pn:name:String 名称
// @param pt:texture:FRenderTexture 纹理
//==========================================================
function FRenderEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FRenderEffect_drawRenderable(r){
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
// @param u:url:String 网络地址
//==========================================================
function FRenderEffect_loadUrl(u){
   var o = this;
   var c = o._context;
   // 获得网络数据
   var x = RClass.create(FXmlConnection);
   var d = x.send(u);
   // 加载程序内容
   var p = o._program = c.createProgram();
   p.loadConfig(d);
   p.build();
   p.link();
}
