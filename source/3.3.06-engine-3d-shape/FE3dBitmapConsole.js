with(MO){
   //==========================================================
   // <T>纹理控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150106
   //==========================================================
   MO.FE3dBitmapConsole = function FE3dBitmapConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd       = EScope.Local;
      // @attribute
      o._bitmaps       = RClass.register(o, new AGetter('_bitmaps'));
      o._bitmapDatas   = RClass.register(o, new AGetter('_bitmapDatas'));
      // @attribute
      o._dataUrl       = '/cloud.resource.bitmap.wv'
      //..........................................................
      // @method
      o.construct      = FE3dBitmapConsole_construct;
      // @method
      //o.load           = FE3dBitmapConsole_load;
      o.loadByUrl      = FE3dBitmapConsole_loadByUrl;
      o.loadByGuid     = FE3dBitmapConsole_loadByGuid;
      o.loadDataByUrl  = FE3dBitmapConsole_loadDataByUrl;
      o.loadDataByGuid = FE3dBitmapConsole_loadDataByGuid;
      // @method
      o.dispose        = FE3dBitmapConsole_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapConsole_construct = function FE3dBitmapConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 创建属性
      o._bitmaps = new TDictionary();
      o._bitmapDatas = new TDictionary();
   }

   //==========================================================
   // <T>加载一个渲染位图。</T>
   //
   // @method
   // @param context:FGraphicContext 渲染环境
   // @param guid:String 材质唯一编号
   // @param code:String 位图代码
   // @return FE3rBitmap 渲染位图
   //==========================================================
   //MO.FE3dBitmapConsole_load = function FE3dBitmapConsole_load(context, guid, code){
   //   var o = this;
   //   // 查找模型
   //   var flag = guid + '|' + code;
   //   var bitmap = o._bitmaps.get(flag);
   //   if(bitmap){
   //      return bitmap;
   //   }
   //   // 生成地址
   //   var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   //   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   //   // 加载模型
   //   if(code == 'environment'){
   //      bitmap = RClass.create(FE3rBitmapCubePack);
   //   }else{
   //      bitmap = RClass.create(FE3rBitmapFlatPack);
   //   }
   //   bitmap.linkGraphicContext(context);
   //   bitmap.loadUrl(url);
   //   o._bitmaps.set(flag, bitmap);
   //   return bitmap;
   //}

   //==========================================================
   // <T>根据网络地址加载一个位图。</T>
   //
   // @method
   // @param context:FRenderContext 渲染上下文
   // @param url:String 网络地址
   // @return FE3rBitmap 渲染位图
   //==========================================================
   MO.FE3dBitmapConsole_loadByUrl = function FE3dBitmapConsole_loadByUrl(context, url){
      var o = this;
      // 查找图片
      var bitmap = o._bitmaps.get(url);
      if(bitmap){
         return bitmap;
      }
      // 生成地址
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      // 创建渲染位图
      var bitmap = RClass.create(FE3dBitmap);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }

   //==========================================================
   // <T>根据唯一编号加载一个位图。</T>
   //
   // @method
   // @param context:FRenderContext 渲染上下文
   // @param guid:String 唯一编号
   // @return FE3dBitmapData 位图数据
   //==========================================================
   MO.FE3dBitmapConsole_loadByGuid = function FE3dBitmapConsole_loadByGuid(context, guid){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(guid);
      // 生成地址
      var url = RBrowser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
      return o.loadByUrl(context, url);
   }

   //==========================================================
   // <T>根据网络地址加载一个位图数据。</T>
   //
   // @method
   // @param context:FRenderContext 渲染上下文
   // @param url:String 网络地址
   // @return FE3dBitmapData 位图数据
   //==========================================================
   MO.FE3dBitmapConsole_loadDataByUrl = function FE3dBitmapConsole_loadDataByUrl(context, url){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(url);
      // 生成地址
      var dataUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap data from url. (url={1})', dataUrl);
      // 查找图片
      var data = o._bitmapDatas.get(url);
      if(!data){
         // 创建渲染位图
         data = RClass.create(FE3dBitmapData);
         data.linkGraphicContext(context);
         data.setup();
         // 加载地址
         data.loadUrl(url);
         // 存储位图
         o._bitmapDatas.set(url, data);
      }
      return data;
   }

   //==========================================================
   // <T>根据唯一编号加载一个位图数据。</T>
   //
   // @method
   // @param context:FRenderContext 渲染上下文
   // @param guid:String 唯一编号
   // @return FE3dBitmapData 位图数据
   //==========================================================
   MO.FE3dBitmapConsole_loadDataByGuid = function FE3dBitmapConsole_loadDataByGuid(context, guid){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(guid);
      // 生成地址
      var url = RBrowser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
      return o.loadDataByUrl(context, url);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapConsole_dispose = function FE3dBitmapConsole_dispose(){
      var o = this;
      // 释放属性
      o._bitmaps = RObject.dispose(o._bitmaps);
      o._bitmapDatas = RObject.dispose(o._bitmapDatas);
      // 父处理
      o.__base.FConsole.dispose.call(o);
   }
}
