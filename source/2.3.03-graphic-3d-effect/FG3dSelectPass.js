with(MO){
   //==========================================================
   // <T>阴影深度渲染过程。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dSelectPass = function FG3dSelectPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      //..........................................................
      // @attribute
      o._code         = 'select';
      o._texture      = MO.Class.register(o, new MO.AGetter('_texture'));
      o._renderTarget = null;
      o._position     = null;
      o._data         = null;
      //..........................................................
      // @method
      o.construct     = FG3dSelectPass_construct;
      // @method
      o.setup         = FG3dSelectPass_setup;
      o.drawRegion    = FG3dSelectPass_drawRegion;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dSelectPass_construct = function FG3dSelectPass_construct(){
      var o = this;
      o.__base.FG3dTechniquePass.construct.call(o);
      // 设置属性
      o._data = new Uint8Array(4);
      o._position = new SPoint2();
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dSelectPass_setup = function FG3dSelectPass_setup(){
      var o = this;
      o.__base.FG3dTechniquePass.setup.call(o);
      var c = o._graphicContext;
      // 创建平面
      var T = o._texture = c.createFlatTexture();
      T.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
      T.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      // 创建渲染目标
      var t = o._renderTarget = c.createRenderTarget();
      t.size().set(1, 1);
      t.textures().push(T);
      t.build();
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   MO.FG3dSelectPass_drawRegion = function FG3dSelectPass_drawRegion(p){
      var o = this;
      var context = o._graphicContext;
      var handle = context.handle();
      // 设置渲染目标
      context.setRenderTarget(o._renderTarget);
      context.clear(0, 0, 0, 0, 1, 1);
      //..........................................................
      // 绘制处理
      var rs = p.allRenderables();
      // 激活效果器
      o.activeEffects(p, rs);
      // 绘制非界面处理
      var rc = rs.count();
      for(var i = 0; i < rc; i++){
         var r = rs.get(i);
         var e = r.activeEffect();
         context.setProgram(e.program());
         var d = r.display();
         if(!d){
            e.drawRenderable(p, r, i);
         }else if(!d._optionFace){
            e.drawRenderable(p, r, i);
         }
      }
      // 绘制界面处理
      context.clearDepth(1);
      for(var i = 0; i < rc; i++){
         var r = rs.get(i);
         var e = r.activeEffect();
         context.setProgram(e.program());
         var d = r.display();
         if(d && d._optionFace){
            e.drawRenderable(p, r, i);
         }
      }
      //..........................................................
      // 读取输出
      handle.readPixels(0, 0, 1, 1, handle.RGBA, handle.UNSIGNED_BYTE, o._data);
      var v = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
      o._selectRenderable = null;
      if(v != 0){
         o._selectRenderable = rs.get(v - 1);
      }
   }
}
