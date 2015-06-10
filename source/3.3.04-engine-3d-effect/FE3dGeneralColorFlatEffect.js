﻿with(MO){
   //==========================================================
   // <T>通用自动渲染器。</T>
   //
   // @author maocy
   // @history 150119
   //==========================================================
   MO.FE3dGeneralColorFlatEffect = function FE3dGeneralColorFlatEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      //..........................................................
      // @attribute
      o._code          = 'general.color.flat';
      //..........................................................
      // @method
      o.drawRenderable = FE3dGeneralColorFlatEffect_drawRenderable;
      return o;
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param region:FG3dRegion 渲染区域
   // @param renderable:FG3dRenderable 渲染对象
   //==========================================================
   MO.FE3dGeneralColorFlatEffect_drawRenderable = function FE3dGeneralColorFlatEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var contextSize = context.size();
      var contextWidth = contextSize.width;
      var contextHeight = contextSize.height;
      var program = o._program;
      // 绑定材质
      var material = renderable.material();
      o.bindMaterial(material);
      // 设置骨头集合
      if(renderable._optionMerge){
         var meshs = renderable.mergeRenderables();
         var meshCount = meshs.count();
         var data = RTypeArray.findTemp(EDataType.Float32, 4 * meshCount);
         var index = 0;
         for(var i = 0; i < meshCount; i++){
            var mesh = meshs.at(i);
            var matrix = mesh.matrix();
            data[index++] = matrix.sx / contextWidth * 2;
            data[index++] = matrix.sy / contextHeight * 2;
            data[index++] = matrix.tx / contextWidth * 2 - 1;
            data[index++] = 1 - matrix.ty / contextHeight * 2;
            mesh.currentMatrix().writeData(data, 4 * i);
         }
         program.setParameter('vc_position', data);
         // 绘制处理
         o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
      }else{
         var matrix = renderable.matrix();
         var cx = matrix.sx / contextWidth * 2;
         var cy = matrix.sy / contextHeight * 2;
         var tx = matrix.tx / contextWidth * 2 - 1;
         var ty = 1 - matrix.ty / contextHeight * 2;
         program.setParameter4('vc_position', cx, cy, tx, ty);
         // 绘制处理
         var size = renderable.size();
         //context.setScissorRectangle(matrix.tx, matrix.ty, size.width, size.height);
         //context.setScissorRectangle(100, 100, 600, 400);
         //context.setScissorRectangle(matrix.tx, matrix.ty, size.width, size.height);
         o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
         //context.setScissorRectangle(0, 0, contextWidth, contextHeight);
         //context.setScissorRectangle();
      }
   }
}
