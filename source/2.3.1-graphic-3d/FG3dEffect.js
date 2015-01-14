//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._program          = null;
   o._templateContext  = null;
   o._vertexTemplate   = null;
   o._fragmentTemplate = null;
   //..........................................................
   // @method
   o.construct         = FG3dEffect_construct;
   o.program           = FG3dEffect_program;
   o.setParameter      = FG3dEffect_setParameter;
   o.setSampler        = FG3dEffect_setSampler;
   o.drawRenderable    = FG3dEffect_drawRenderable;
   o.buildInfo         = FG3dEffect_buildInfo;
   o.loadUrl           = FG3dEffect_loadUrl;
   o.build             = FG3dEffect_build;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dEffect_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   // 初始化变量
   o._templateContext = RClass.create(FTagContext);
}

//==========================================================
// <T>获得渲染程序。</T>
//
// @method
// @return FG3dProgram 渲染程序
//==========================================================
function FG3dEffect_program(){
   return this._program;
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pv:value:Object 数据
// @param pc:count:Integer 个数
//==========================================================
function FG3dEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}

//==========================================================
// <T>设置取样器。</T>
//
// @method
// @param pn:name:String 名称
// @param pt:texture:FG3dTexture 纹理
//==========================================================
function FG3dEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pt:tagContext:FTagContext 模板环境
// @param pc:effectInfo:SG3dEffectInfo 渲染信息
//==========================================================
function FG3dEffect_buildInfo(f, r){
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param p:renderable:FG3dable 渲染对象
//==========================================================
function FG3dEffect_drawRenderable(r){
   var o = this;
   var c = o._context;
   var p = o._program;
   // 绑定程序
   c.setProgram(p);
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
function FG3dEffect_loadUrl(u){
   var o = this;
   var c = o._context;
   // 获得网络数据
   var x = RClass.create(FXmlConnection);
   var d = x.send(u);
   // 加载程序内容
   var p = o._program = c.createProgram();
   p.loadConfig(d);
   // 建立代码模板
   var vt = o._vertexTemplate = RClass.create(FTagDocument);
   vt.setSpace('shader');
   vt.load(p._vertexSource);
   var ft = o._fragmentTemplate = RClass.create(FTagDocument);
   ft.setSpace('shader');
   ft.load(p._fragmentSource);
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:effectInfo:SG3dEffectInfo 效果信息
//==========================================================
function FG3dEffect_build(p){
   var o = this;
   var g = o._program;
   // 设置环境
   var c = o._templateContext;
   c.resetAttributes();
   o.buildInfo(c, p);
   // 生成顶点代码
   c.resetSource();
   var vs = o._vertexTemplate.parse(c);
   var vsf = RString.formatLines(vs);
   g.upload(EG3dShader.Vertex, vsf);
   // 生成像素代码
   c.resetSource();
   var fs = o._fragmentTemplate.parse(c);
   var fsf = RString.formatLines(fs);
   g.upload(EG3dShader.Fragment, fsf);
   // 编译处理
   g.build();
   g.link();
}
