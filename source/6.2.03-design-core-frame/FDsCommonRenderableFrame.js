with(MO){
   //==========================================================
   // <T>场景渲染页面。</T>
   //
   // @author maocy
   // @history 150216
   //==========================================================
   MO.FDsCommonRenderableFrame = function FDsCommonRenderableFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      //..........................................................
      // @attribute
      o._activeSpace      = null;
      o._activeRenderable = null;
      //..........................................................
      // @event
      o.onBuilded         = FDsCommonRenderableFrame_onBuilded;
      o.onDataChanged     = FDsCommonRenderableFrame_onDataChanged;
      o.onMaterialClick   = FDsCommonRenderableFrame_onMaterialClick;
      o.onEffectClick     = FDsCommonRenderableFrame_onEffectClick;
      //..........................................................
      // @method
      o.construct         = FDsCommonRenderableFrame_construct;
      // @method
      o.loadObject        = FDsCommonRenderableFrame_loadObject;
      // @method
      o.dispose           = FDsCommonRenderableFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonRenderableFrame_onBuilded = function FDsCommonRenderableFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      // 关联对象
      o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
      o._controlRotation.addDataChangedListener(o, o.onDataChanged);
      o._controlScale.addDataChangedListener(o, o.onDataChanged);
      // 增加对象
      o._controlMaterials.addClickListener(o, o.onMaterialClick);
      o._controlEffects.addClickListener(o, o.onEffectClick);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonRenderableFrame_onDataChanged = function FDsCommonRenderableFrame_onDataChanged(p){
      var o = this;
      var r = o._activeRenderable;
      var m = r.matrix();
      // 设置环境颜色
      var v = o._controlTranslate.get();
      m.setTranslate(v.x, v.y, v.z);
      // 设置散射颜色
      var v = o._controlRotation.get();
      m.setRotation(v.x, v.y, v.z);
      // 设置高光颜色
      var v = o._controlScale.get();
      m.setScale(v.x, v.y, v.z);
      // 重新计算
      m.update();
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonRenderableFrame_onMaterialClick = function FDsCommonRenderableFrame_onMaterialClick(event){
      var o = this;
      var item = event.item;
      var materialRefer = item.tag();
      // 显示对话框
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonMaterialReferDialog);
      dialog._frame = o;
      dialog._materialRefer = materialRefer;
      //dialog.setContentGuid('');
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>效果点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonRenderableFrame_onEffectClick = function FDsCommonRenderableFrame_onEffectClick(event){
      var o = this;
      // 获得代码
      var item = event.item;
      var effect = item.tag();
      var program = effect._program;
      var vertexShader = program.vertexShader();
      // s.targetSource()
      var fragmentShader = program.fragmentShader();
      // 弹出内容
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonProgramDialog);
      dialog._frameSet = o._frameSet;
      dialog.setProgramCode(effect._code);
      dialog.setVertexSource(vertexShader.source(), vertexShader.targetSource());
      dialog.setFragmentSource(fragmentShader.source(), fragmentShader.targetSource());
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonRenderableFrame_construct = function FDsCommonRenderableFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FUiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载渲染对象信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间
   // @param renderable:FE3dRenderable 渲染对象
   //==========================================================
   MO.FDsCommonRenderableFrame_loadObject = function FDsCommonRenderableFrame_loadObject(space, renderable){
      var o = this;
      o._activeSpace = space;
      o._activeRenderable = renderable;
      var resource = renderable.resource();
      // 设置矩阵参数
      var matrix = renderable.matrix();
      o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
      o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
      o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
      // 建立材质集合
      if(resource){
         var materialBox = o._controlMaterials;
         materialBox.clear();
         var indexBuffers = renderable.indexBuffers();
         var count = indexBuffers.count();
         for(var i = 0; i < count; i++){
            var materialRefer = resource.syncMaterialRefer(i);
            var item = materialBox.createItem(null, i + ': ' + materialRefer.guid());
            item.setTag(materialRefer);
            materialBox.push(item);
         }
      }
      // 建立效果器集合
      var effectBox = o._controlEffects;
      effectBox.clear();
      var infos = renderable.infos();
      var count = infos.count();
      for(var i = 0; i < count; i++){
         var effect = infos.at(i).effect;
         if(effect){
            var item = effectBox.createItem(null, effect.code());
            item.setTag(effect);
            effectBox.push(item);
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonRenderableFrame_dispose = function FDsCommonRenderableFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiForm.dispose.call(o);
   }
}
