with(MO){
   //==========================================================
   // <T>纹理控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150106
   //==========================================================
   MO.FE3rBitmapConsole = function FE3rBitmapConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd  = EScope.Local;
      o._bitmaps  = null;
      o._dataUrl  = '/cloud.resource.material.wv'
      //..........................................................
      // @method
      o.construct = FE3rBitmapConsole_construct;
      // @method
      o.bitmaps   = FE3rBitmapConsole_bitmaps;
      o.load      = FE3rBitmapConsole_load;
      o.loadUrl   = FE3rBitmapConsole_loadUrl;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rBitmapConsole_construct = function FE3rBitmapConsole_construct(){
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
   MO.FE3rBitmapConsole_bitmaps = function FE3rBitmapConsole_bitmaps(){
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
   MO.FE3rBitmapConsole_load = function FE3rBitmapConsole_load(context, guid, code){
      var o = this;
      // 查找模型
      var flag = guid + '|' + code;
      var bitmap = o._bitmaps.get(flag);
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
   MO.FE3rBitmapConsole_loadUrl = function FE3rBitmapConsole_loadUrl(context, url){
      var o = this;
      // 查找图片
      var bitmap = o._bitmaps.get(url);
      if(bitmap){
         return bitmap;
      }
      // 生成地址
      var loadUrl = RBrowser.contentPath(url);
      RLogger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      // 创建渲染位图
      var bitmap = RClass.create(FE3rBitmap);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }
}
