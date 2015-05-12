//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE3rSkin(o){
   o = RClass.inherits(this, o, FE3rObject);
   //..........................................................
   // @attribute
   o._resource    = null;
   // @attribute
   o._streams     = null;
   //..........................................................
   // @method
   o.resource     = FE3rSkin_resource;
   o.streams      = FE3rSkin_streams;
   // @method
   o.loadResource = FE3rSkin_loadResource;
   return o;
}

//==========================================================
// <T>获得资源信息。</T>
//
// @return FE3sSkeletonSkin 资源信息
//==========================================================
function FE3rSkin_resource(){
   return this._resource;
}

//==========================================================
// <T>获得渲染数据流集合。</T>
//
// @return TObjects 渲染数据流集合
//==========================================================
function FE3rSkin_streams(){
   return this._streams;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param resource:FRsModel 资源信息
//==========================================================
function FE3rSkin_loadResource(resource){
   var o = this;
   // 设置属性
   o._resource = resource;
   // 读取数据流集合
   var streamResources = resource.streams();
   if(streamResources){
      var count = streamResources.count();
      if(count > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < count; i++){
            var streamResource = streamResources.at(i);
            // 创建数据流
            var stream = RClass.create(FE3rStream);
            stream.linkGraphicContext(o);
            stream.loadResource(streamResource);
            streams.push(stream);
         }
      }
   }
}
