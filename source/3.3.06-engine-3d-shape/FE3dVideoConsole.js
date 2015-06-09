with(MO){
   //==========================================================
   // <T>纹理控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150106
   //==========================================================
   MO.FE3dVideoConsole = function FE3dVideoConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd  = EScope.Local;
      o._videos   = null;
      o._dataUrl  = '/cloud.resource.bitmap.wv'
      //..........................................................
      // @method
      o.construct = FE3dVideoConsole_construct;
      // @method
      o.videos    = FE3dVideoConsole_videos;
      o.load      = FE3dVideoConsole_load;
      o.loadUrl   = FE3dVideoConsole_loadUrl;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dVideoConsole_construct = function FE3dVideoConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._videos = new TDictionary();
   }

   //==========================================================
   // <T>获得渲染位图集合。</T>
   //
   // @method
   // @return TDictionary 渲染纹理集合
   //==========================================================
   MO.FE3dVideoConsole_videos = function FE3dVideoConsole_videos(){
      return this._videos;
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
   MO.FE3dVideoConsole_load = function FE3dVideoConsole_load(context, guid, code){
      var o = this;
      // 查找模型
      var flag = guid + '|' + code;
      var bitmap = o._videos.get(flag);
      if(bitmap){
         return bitmap;
      }
      // 生成地址
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      RLogger.info(o, 'Load bitmap. (url={1})', url);
      // 加载模型
      if(code == 'environment'){
         bitmap = RClass.create(FE3rBitmapCubePack);
      }else{
         bitmap = RClass.create(FE3rBitmapFlatPack);
      }
      bitmap.linkGraphicContext(context);
      bitmap.loadUrl(url);
      o._videos.set(flag, bitmap);
      return bitmap;
   }

   //==========================================================
   // <T>加载一个模型。</T>
   //
   // @method
   // @param context:FRenderContext 渲染上下文
   // @param url:String 网络地址
   // @return FE3rBitmap 渲染位图
   //==========================================================
   MO.FE3dVideoConsole_loadUrl = function FE3dVideoConsole_loadUrl(context, url){
      var o = this;
      // 查找图片
      var bitmap = o._videos.get(url);
      if(bitmap){
         return bitmap;
      }
      // 生成地址
      var loadUrl = RBrowser.contentPath(url);
      RLogger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      // 创建渲染位图
      var bitmap = RClass.create(FE3dVideoData);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._videos.set(url, bitmap);
      return bitmap;
   }
}
