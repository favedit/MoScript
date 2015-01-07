function FG3dSampleAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   o._context       = null;
   o._program       = null;
   o.drawRenderable = FG3dSampleAutomaticEffect_drawRenderable;
   o.load           = FG3dSampleAutomaticEffect_load;
   return o;
}
function FG3dSampleAutomaticEffect_drawRenderable(r){
   var o = this;
   var c = o._context;
   var p = o._program;
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
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dSampleAutomaticEffect_load(){
   var o = this;
   var u = RBrowser.contentPath() + o._path + "simple.automatic.xml";
   o.loadUrl(u);
}
function FG3dSampleColorEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   o._context       = null;
   o._program       = null;
   o.setParameter   = FG3dSampleColorEffect_setParameter;
   o.setSampler     = FG3dSampleColorEffect_setSampler;
   o.drawRenderable = FG3dSampleColorEffect_drawRenderable;
   o.loadUrl        = FG3dSampleColorEffect_loadUrl;
   return o;
}
function FG3dSampleColorEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}
function FG3dSampleColorEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}
function FG3dSampleColorEffect_drawRenderable(r){
   var o = this;
   var c = o._context;
   var p = o._program;
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
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dSampleColorEffect_loadUrl(u){
   var o = this;
   var c = o._context;
   var x = RClass.create(FXmlConnection);
   var d = x.send(u);
   var p = o._program = c.createProgram();
   p.loadConfig(d);
   p.build();
   p.link();
}
function FG3dSampleTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._pass = null;
   o.setup = FG3dSampleTechnique_setup;
   return o;
}
function FG3dSampleTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o._pass = RClass.create(FG3dSampleTechniquePass);
   o._passes.push(o._pass);
}
function FG3dSampleTechniquePass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   return o;
}
