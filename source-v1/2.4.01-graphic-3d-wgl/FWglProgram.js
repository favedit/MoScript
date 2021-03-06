//==========================================================
// <T>WebGL渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglProgram(o){
   o = RClass.inherits(this, o, FG3dProgram);
   //..........................................................
   // @attribute
   o._native        = null;
   //..........................................................
   // @method
   o.setup          = FWglProgram_setup;
   // @method
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   // @method
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   // @method
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
   var c = g = o._graphicContext;
   o._native = c._native.createProgram();
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
   if(!s){
      s = o._vertexShader = RClass.create(FWglVertexShader);
      s.linkGraphicContext(o);
      s.setup();
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
   if(!s){
      s = o._fragmentShader = RClass.create(FWglFragmentShader);
      s.linkGraphicContext(o);
      s.setup();
   }
   return s;
}

//==========================================================
// <T>上传内容处理。</T>
//
// @method
// @param t:shaderCd:EG3dShader 渲染程序类型
// @param s:source:String 渲染代码
//==========================================================
function FWglProgram_upload(t, s){
   var o = this;
   if(t == EG3dShader.Vertex){
      o.vertexShader().upload(s);
   }else if(t == EG3dShader.Fragment){
      o.fragmentShader().upload(s);
   }else{
      throw new Error('Unknown type');
   }
}

//==========================================================
// <T>构建内容处理。</T>
//
// @method
//==========================================================
function FWglProgram_build(){
   var o = this;
   var c = o._graphicContext;
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
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
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
//==========================================================
function FWglProgram_link(){
   var o = this;
   var c = o._graphicContext;
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
      o._native = null;
      return false;
   }
   //............................................................
   // 校验程序
   g.validateProgram(pn);
   // 获得结果
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      //RLogger.fatal(this, null, "Validate program failure. (reason={1})", pi);
      // 释放程序
      //g.deleteProgram(o._native);
      //o._native = null;
      //return false;
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
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
   }
   // 关联属性集合
   if(o.hasAttribute()){
      var pc = o._attributes.count();
      for(var n = 0; n < pc; n++){
         var p = o._attributes.value(n);
         var i = g.getAttribLocation(pn, p.name());
         r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != -1){
            p._statusUsed = true;
         }
      }
   }
   // 关联取样器集合
   if(o.hasSampler()){
      var pc = o._samplers.count();
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
      var si = 0;
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         if(p._statusUsed){
            p._index = si++;
         }
      }
   }
   return r;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FWglProgram_dispose(){
   var o = this;
   var context = o._graphicContext;
   // 释放对象
   var handle = o._native;
   if(handle){
      context._native.deleteProgram(handle);
      o._native = null;
   }
   // 父处理
   o.__base.FG3dProgram.dispose.call(o);
}
