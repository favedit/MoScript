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
      o._scopeCd  = EScope.Local;
      o._bitmaps  = null;
      o._dataUrl  = '/cloud.resource.bitmap.wv'
      //..........................................................
      // @method
      o.construct = FE3dBitmapConsole_construct;
      // @method
      o.bitmaps   = FE3dBitmapConsole_bitmaps;
      o.load      = FE3dBitmapConsole_load;
      o.loadUrl   = FE3dBitmapConsole_loadUrl;
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
      o._bitmaps = new TDictionary();
   }

   //==========================================================
   // <T>获得渲染位图集合。</T>
   //
   // @method
   // @return TDictionary 渲染纹理集合
   //==========================================================
   MO.FE3dBitmapConsole_bitmaps = function FE3dBitmapConsole_bitmaps(){
      return this._bitmaps;
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
   MO.FE3dBitmapConsole_load = function FE3dBitmapConsole_load(context, guid, code){
      var o = this;
      // 查找模型
      var flag = guid + '|' + code;
      var bitmap = o._bitmaps.get(flag);
      if(bitmap){
         return bitmap;
      }
      // 生成地址
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      // 加载模型
      if(code == 'environment'){
         bitmap = RClass.create(FE3rBitmapCubePack);
      }else{
         bitmap = RClass.create(FE3rBitmapFlatPack);
      }
      bitmap.linkGraphicContext(context);
      bitmap.loadUrl(url);
      o._bitmaps.set(flag, bitmap);
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
   MO.FE3dBitmapConsole_loadUrl = function FE3dBitmapConsole_loadUrl(context, url){
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
      var bitmap = RClass.create(FE3dBitmapData);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }
}
