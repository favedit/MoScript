with(MO){
   //==========================================================
   // <T>设计资源控制台。</T>
   //
   // @class
   // @author maocy
   // @version 150331
   //==========================================================
   MO.FDrAbsResourceConsole = function FDrAbsResourceConsole(o){
      o = MO.Class.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd       = EScope.Local;
      // @attribute
      o._serviceCode   = null;
      o._classUnit     = null;
      o._resources     = null;
      //..........................................................
      // @method
      o.construct      = FDrAbsResourceConsole_construct;
      // @method
      o.makeServiceUrl = FDrAbsResourceConsole_makeServiceUrl;
      // @method
      o.loadResource   = FDrAbsResourceConsole_loadResource;
      // @method
      o.doList         = FDrAbsResourceConsole_doList;
      o.doQuery        = FDrAbsResourceConsole_doQuery;
      // @method
      o.doCreate       = FDrAbsResourceConsole_doCreate;
      o.doUpdate       = FDrAbsResourceConsole_doUpdate;
      o.doDelete       = FDrAbsResourceConsole_doDelete;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDrAbsResourceConsole_construct = function FDrAbsResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 初始化属性
      o._resources = new TDictionary();
   }

   //==========================================================
   // <T>生成网络地址。</T>
   //
   // @method
   // @return String 网络地址
   //==========================================================
   MO.FDrAbsResourceConsole_makeServiceUrl = function FDrAbsResourceConsole_makeServiceUrl(action){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=' + action);
      if(MO.Runtime.isDebug()){
         url += '&date=' + RDate.format();
      }
      return url;
   }

   //==========================================================
   // <T>根据配置信息加载一个资源。</T>
   //
   // @method
   // @return FDrResource 资源
   //==========================================================
   MO.FDrAbsResourceConsole_loadResource = function FDrAbsResourceConsole_loadResource(xconfig){
      var o = this;
      var guid = xconfig.get('guid');
      var resource = o._resources.get(guid);
      if(!resource){
         resource = MO.Class.create(o._classUnit);
         o._resources.set(guid, resource);
      }
      resource.loadConfig(xconfig);
      return resource;
   }

   //==========================================================
   // <T>查询数据内容。</T>
   //
   // @method
   // @param typeCd:String 类型代码
   // @param serach:String 搜索内容
   // @param order:String 排序内容
   // @param pageSize:Integer 分页大小
   // @param page:Integer 分页
   //==========================================================
   MO.FDrAbsResourceConsole_doList = function FDrAbsResourceConsole_doList(search, order, pageSize, page){
      var o = this;
      // 生成请求地址
      var url = '/' + o._serviceCode + '.ws?action=list';
      if(!MO.Lang.String.isEmpty(search)){
         url += '&search=' + search;
      }
      if(!MO.Lang.String.isEmpty(order)){
         url += '&order=' + order;
      }
      if(pageSize >= 0){
         url += '&page_size=' + pageSize;
      }
      if(page >= 0){
         url += '&page=' + page;
      }
      // 发送数据请求
      return MO.Console.find(FXmlConsole).sendAsync(url);
   }

   //==========================================================
   // <T>生成名称。</T>
   //
   // @method
   // @param guid:String 唯一编号
   //==========================================================
   MO.FDrAbsResourceConsole_doQuery = function FDrAbsResourceConsole_doQuery(guid){
      var o = this;
      // 发送数据请求
      var url = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
      return MO.Console.find(FXmlConsole).sendAsync(url);
   }

   //==========================================================
   // <T>新建一条数据记录。</T>
   //
   // @method
   // @param resource:FDrResource 资源
   //==========================================================
   MO.FDrAbsResourceConsole_doCreate = function FDrAbsResourceConsole_doCreate(resource){
      var o = this;
      // 设置数据
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'create');
      // 设置资源数据
      var xdata = xroot.create(resource.classCode());
      resource.saveConfig(xdata);
      // 发送数据
      return MO.Console.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
   }

   //==========================================================
   // <T>修改一条数据记录。</T>
   //
   // @method
   // @param resource:FDrResource 资源
   //==========================================================
   MO.FDrAbsResourceConsole_doUpdate = function FDrAbsResourceConsole_doUpdate(resource){
      var o = this;
      // 设置数据
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      // 设置资源数据
      var xdata = xroot.create(resource.classCode());
      resource.saveConfig(xdata);
      // 发送数据
      return MO.Console.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
   }

   //==========================================================
   // <T>删除一条数据记录。</T>
   //
   // @method
   // @param resource:FDrResource 资源
   //==========================================================
   MO.FDrAbsResourceConsole_doDelete = function FDrAbsResourceConsole_doDelete(guid){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=delete&guid=' + guid;
      return MO.Console.find(FXmlConsole).sendAsync(url);
   }
}
