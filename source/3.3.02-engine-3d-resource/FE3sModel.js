//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150128
//==========================================================
MO.FE3sModel = function FE3sModel(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   //..........................................................
   // @attribute
   o._typeName      = 'Model';
   o._dataCompress  = true;
   o._dataBlock     = true;
   // @attribute
   o._meshes        = MO.Class.register(o, new MO.AGetter('_meshes'));
   o._skeletons     = MO.Class.register(o, new MO.AGetter('_skeletons'));
   o._animations    = MO.Class.register(o, new MO.AGetter('_animations'));
   o._display       = MO.Class.register(o, new MO.AGetter('_display'));
   //..........................................................
   o.construct      = MO.FE3sModel_construct;
   // @method
   o.findMeshByCode = MO.FE3sModel_findMeshByCode;
   // @method
   o.unserialize    = MO.FE3sModel_unserialize;
   o.saveConfig     = MO.FE3sModel_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sModel_construct = function FE3sModel_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   // 设置属性
   var display = o._display = MO.Class.create(MO.FE3sModelDisplay);
   display._model = o;
}

//==========================================================
// <T>根据代码查找网格。</T>
//
// @method
// @param p:code:String 代码
// @return FE3sMesh 网格
//==========================================================
MO.FE3sModel_findMeshByCode = function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.at(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sModel_unserialize = function FE3sModel_unserialize(input){
   // 读取父信息
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   //..........................................................
   // 存储模型
   var modelConsole = MO.Console.find(MO.FE3sModelConsole);
   modelConsole.models().set(o.guid(), o);
   //..........................................................
   // 读取几何体集合
   var meshCount = input.readInt16();
   if(meshCount > 0){
      var meshes = o._meshes = new MO.TDictionary();
      for(var i = 0; i < meshCount; i++){
         var mesh = modelConsole.unserialMesh(input)
         var meshGuid = mesh.guid();
         meshes.set(meshGuid, mesh);
      }
   }
   //..........................................................
   // 读取骨骼集合
   var skeletonCount = input.readInt16();
   if(skeletonCount > 0){
      var s = o._skeletons = new MO.TObjects();
      for(var i = 0; i < skeletonCount; i++){
         var skeleton = modelConsole.unserialSkeleton(input)
         s.push(skeleton);
      }
   }
   //..........................................................
   // 读取动画集合
   var animationCount = input.readInt16();
   if(animationCount > 0){
      var animations = o._animations = new MO.TObjects();
      for(var i = 0; i < animationCount; i++){
         var animation = modelConsole.unserialAnimation(o, input)
         animations.push(animation);
      }
   }
   //..........................................................
   // 读取显示信息
   var display = o._display;
   display.unserialize(input);
   var renderables = display.renderables();
   if(renderables){
      var renderableCount = renderables.count();
      for(var i = 0; i < renderableCount; i++){
         var renderable = renderables.get(i);
         var meshGuid = renderable.meshGuid();
         var mesh = meshes.get(meshGuid);
         renderable.setMesh(mesh);
      }
   }
   //..........................................................
   MO.Logger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sModel_saveConfig = function FE3sModel_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, xconfig);
   // 存储属性
   o._display.saveConfig(xconfig.create('Display'));
}
