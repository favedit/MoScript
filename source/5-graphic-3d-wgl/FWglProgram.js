//==========================================================
// <T>WebGL渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglProgram(o){
   o = RClass.inherits(this, o, FRenderProgram);
   //..........................................................
   // @attribute
   o._native        = null;
   // @method
   o.setup          = FWglProgram_setup;
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   o.setParameter   = FWglProgram_setParameter;
   o.dispose        = FWglProgram_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglProgram_setup(){
   var o = this;
   var g = o._context._native;
   o._native = g.createProgram();
}

//==========================================================
// <T>获得顶点渲染器。</T>
//
// @method
// @return FVertexShader 顶点渲染器
//==========================================================
function FWglProgram_vertexShader(){
   var o = this;
   var s = o._vertexShader;
   if(s == null){
      s = RClass.create(FWglVertexShader);
      s.linkContext(o._context);
      s.setup();
      o._vertexShader = s;
   }
   return s;
}

//==========================================================
// <T>获得像素渲染器。</T>
//
// @method
// @return FFragmentShader 顶点渲染器
//==========================================================
function FWglProgram_fragmentShader(){
   var o = this;
   var s = o._fragmentShader;
   if(s == null){
      s = RClass.create(FWglFragmentShader);
      s.linkContext(o._context);
      s.setup();
      o._fragmentShader = s;
   }
   return s;
}

//==========================================================
// <T>关联内容处理。</T>
//
// @method
// @param t:type:ERenderShader 渲染程序类型
// @param s:source:String 渲染代码
//==========================================================
function FWglProgram_upload(t, s){
   var o = this;
   var g = o._context._native;
   if(t == ERenderShader.Vertex){
      var vs = o.vertexShader();
      vs.upload(s);
   }else if(t == ERenderShader.Fragment){
      var fs = o.fragmentShader();
      fs.upload(s);
   }else{
      throw new Error('Unknown type');
   }
}

//==========================================================
// <T>关联内容处理。</T>
//
// @method
// @param t:type:ERenderShader 渲染程序类型
// @param s:source:String 渲染代码
//==========================================================
function FWglProgram_build(){
   var o = this;
   var c = o._context;
   var g = c._native;
   var pn = o._native;
   // 设置顶点渲染器
   var vs = o.vertexShader();
   g.attachShader(pn, vs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vs._native);
   if(!r){
      return r;
   }
   // 设置顶点渲染器
   var fs = o.fragmentShader();
   g.attachShader(pn, fs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fs._native);
   if(!r){
      return r;
   }
   // 设置属性集合
   if(o.hasAttribute()){
      var as = o.attributes();
      var count = as.Count();
      for(var n = 0; n < count; n++){
         var a = as.get(n);
         var an = a.name();
         g.bindAttribLocation(pn, n, an);
         r = c.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, an);
         if(!r){
            return r;
         }
      }
   }
}

//==========================================================
// <T>关联内容处理。</T>
//
// @method
// @param t:type:ERenderShader 渲染程序类型
// @param s:source:String 渲染代码
//==========================================================
function FWglProgram_link(){
   var o = this;
   var c = o._context;
   var g = c._native;
   var r = false;
   // 关联处理
   var pn = o._native;
   g.linkProgram(pn);
   // 获得结果
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      // 释放程序
      g.deleteProgram(o._native);
      o._native = null;;
      return false;
   }
   //............................................................
   // 校验程序
   g.validateProgram(pn);
   // 获得结果
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Validate program failure. (reason={1})", pi);
      // 释放程序
      g.deleteProgram(o._native);
      o._native = null;;
      return false;
   }
   //............................................................
   // 结束处理
   g.finish();
   r = c.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!r){
      return r;
   }
   //............................................................
   // 关联常量集合
   if(o.hasParameter()){
      var pc = o._parameters.count();
      for(var n = 0; n < pc; n++){
         var p = o._parameters.value(n);
         var i = g.getUniformLocation(pn, p.name);
         r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name, i);
         if(!r){
            return r;
         }
         p.slot = i;
         if(i != null){
            p.statusUsed = true;
         }
      }
   }
   // 关联属性集合
   if(o.hasAttribute()){
      var pc = o._attributes.count();
      for(var n = 0; n < pc; n++){
         var p = o._attributes.value(n);
         var i = g.getAttribLocation(pn, p.name);
         r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name, i);
         if(!r){
            return r;
         }
         p.slot = i;
         if(i != -1){
            p.statusUsed = true;
         }
      }
   }
   // 关联取样器集合
   if(o.hasSampler()){
      var pc = o._samplers.count();
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         var i = g.getUniformLocation(pn, p.name);
         r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name, i);
         if(!r){
            return r;
         }
         p.slot = i;
         if(i != null){
            p.statusUsed = true;;
         }
      }
      var si = 0;
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         if(p.statusUsed){
            p.index = si++;
         }
      }
   }
   return r;
}

//==========================================================
// <T>设置参数。</T>
//
// @method
//==========================================================
function FWglProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.parameterFind(pn);
   o._context.bindConst(null, p.slot, p.formatCd, pv, pc);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FWglProgram_dispose(){
   var o = this;
   if(o._program){
      o._context._context.deleteProgram(o._program);
   }
   o._program = null;
   o.base.FProgram3d.dispose.call(o);
}
