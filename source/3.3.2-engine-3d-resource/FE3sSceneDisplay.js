//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneDisplay(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 属性
   o._templateGuid        = null;
   // @attribute 配置
   o._optionMergeVertex   = null;
   o._optionMergeMaterial = null;
   // @attribute 矩阵
   o._matrix              = null;
   // @attribute 集合
   o._animations          = null;
   o._movies              = null;
   o._materials           = null;
   o._renderables         = null;
   //..........................................................
   // @method
   o.construct            = FE3sSceneDisplay_construct;
   // @method
   o.templateGuid         = FE3sSceneDisplay_templateGuid;
   o.matrix               = FE3sSceneDisplay_matrix;
   o.findAnimation        = FE3sSceneDisplay_findAnimation;
   o.syncAnimation        = FE3sSceneDisplay_syncAnimation;
   o.animations           = FE3sSceneDisplay_animations;
   o.movies               = FE3sSceneDisplay_movies;
   o.materials            = FE3sSceneDisplay_materials;
   o.renderables          = FE3sSceneDisplay_renderables;
   // @method
   o.unserialize          = FE3sSceneDisplay_unserialize;
   o.saveConfig           = FE3sSceneDisplay_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneDisplay_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>获得模板唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3sSceneDisplay_templateGuid(){
   return this._templateGuid;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FE3sSceneDisplay_matrix(){
   return this._matrix;
}

//==========================================================
// <T>根据唯一编号查找一个动画集合。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sAnimation 动画
//==========================================================
function FE3sSceneDisplay_findAnimation(p){
   var o = this;
   var s = o._animations;
   if(s){
      return s.get(p);
   }
   return null;
}

//==========================================================
// <T>根据唯一编号同步一个动画集合。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sAnimation 动画
//==========================================================
function FE3sSceneDisplay_syncAnimation(p){
   var o = this;
   var s = o._animations;
   if(!s){
      s = o._animations = new TDictionary();
   }
   var a = s.get(p);
   if(!a){
      a = RClass.create(FE3sSceneAnimation);
      a._guid = p;
      s.set(p, a);
   }
   return a;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FE3sSceneDisplay_animations(){
   return this._animations;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FE3sSceneDisplay_movies(){
   return this._movies;
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TObjects 材质集合
//==========================================================
function FE3sSceneDisplay_materials(){
   return this._materials;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
function FE3sSceneDisplay_renderables(){
   return this._renderables;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取配置
   o._templateGuid = p.readString();
   // 读取矩阵
   o._matrix.unserialize(p);
   // 读取动画集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._animations = new TDictionary();
      for(var i = 0; i < c; i++){
         var a = RClass.create(FE3sSceneAnimation);
         a.unserialize(p);
         s.set(a.guid(), a);
      }
   }
   // 读取动画集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sSceneMovie);
         m.unserialize(p);
         s.push(m);
      }
   }
   // 读取材质集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sSceneMaterial);
         m.unserialize(p);
         s.push(m);
      }
   }
   // 读取动画集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FE3sTemplateRenderable);
         r.unserialize(p);
         s.push(r);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sSceneDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   o._matrix.saveConfig(p.create('Matrix'));
   // 存储材质集合
   var s = o._animations;
   if(s){
      var c = s.count();
      var xs = p.create('AnimationCollection');
      for(var i = 0; i < c; i++){
         s.valueAt(i).saveConfig(xs.create('Animation'));
      }
   }
   // 存储材质集合
   var s = o._materials;
   if(s){
      var c = s.count();
      var xs = p.create('MaterialCollection');
      for(var i = 0; i < c; i++){
         s.getAt(i).saveConfig(xs.create('Material'));
      }
   }
}
