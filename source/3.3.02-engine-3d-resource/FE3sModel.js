//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FE3sModel(o){
   o = RClass.inherits(this, o, FE3sSpace);
   //..........................................................
   // @attribute
   o._typeName      = 'Model';
   o._dataCompress  = true;
   o._dataBlock     = true;
   // @attribute
   o._meshes        = null;
   o._skeletons     = null;
   o._animations    = null;
   o._display       = null;
   //..........................................................
   o.construct      = FE3sModel_construct;
   // @method
   o.findMeshByCode = FE3sModel_findMeshByCode;
   o.meshes         = FE3sModel_meshes;
   o.skeletons      = FE3sModel_skeletons;
   o.animations     = FE3sModel_animations;
   o.display        = FE3sModel_display;
   // @method
   o.unserialize    = FE3sModel_unserialize;
   o.saveConfig     = FE3sModel_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sModel_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   // 设置属性
   var display = o._display = RClass.create(FE3sModelDisplay);
   display._model = o;
}

//==========================================================
// <T>根据代码查找网格。</T>
//
// @method
// @param p:code:String 代码
// @return FE3sMesh 网格
//==========================================================
function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
}

//==========================================================
// <T>获得网格集合。</T>
//
// @method
// @return TObjects 网格集合
//==========================================================
function FE3sModel_meshes(){
   return this._meshes;
}

//==========================================================
// <T>获得骨骼集合。</T>
//
// @method
// @return TObjects 骨骼集合
//==========================================================
function FE3sModel_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FE3sModel_animations(){
   return this._animations;
}

//==========================================================
// <T>获得显示信息。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FE3sModel_display(){
   return this._display;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sModel_unserialize(input){
   // 读取父信息
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   //..........................................................
   // 存储模型
   var modelConsole = RConsole.find(FE3sModelConsole);
   modelConsole.models().set(o.guid(), o);
   //..........................................................
   // 读取几何体集合
   var meshCount = input.readInt16();
   if(meshCount > 0){
      var meshes = o._meshes = new TDictionary();
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
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < skeletonCount; i++){
         var skeleton = modelConsole.unserialSkeleton(input)
         s.push(skeleton);
      }
   }
   //..........................................................
   // 读取动画集合
   var animationCount = input.readInt16();
   if(animationCount > 0){
      var animations = o._animations = new TObjects();
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
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sModel_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, xconfig);
   // 存储属性
   o._display.saveConfig(xconfig.create('Display'));
}
