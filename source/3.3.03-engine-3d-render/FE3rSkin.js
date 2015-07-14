//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE3rSkin = function FE3rSkin(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   //..........................................................
   // @attribute
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   // @attribute
   o._streams     = MO.Class.register(o, new AGetter('_streams'));
   //..........................................................
   // @method
   o.loadResource = MO.FE3rSkin_loadResource;
   return o;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param resource:FRsModel 资源信息
//==========================================================
MO.FE3rSkin_loadResource = function FE3rSkin_loadResource(resource){
   var o = this;
   // 设置属性
   o._resource = resource;
   // 读取数据流集合
   var streamResources = resource.streams();
   if(streamResources){
      var count = streamResources.count();
      if(count > 0){
         var streams = o._streams = new MO.TObjects();
         for(var i = 0; i < count; i++){
            var streamResource = streamResources.at(i);
            // 创建数据流
            var stream = MO.Class.create(MO.FE3rStream);
            stream.linkGraphicContext(o);
            stream.loadResource(streamResource);
            streams.push(stream);
         }
      }
   }
}
