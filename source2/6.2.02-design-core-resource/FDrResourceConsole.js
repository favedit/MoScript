with(MO){
   //==========================================================
   // <T>设计资源控制台。</T>
   //
   // @class
   // @author maocy
   // @version 150331
   //==========================================================
   MO.FDrResourceConsole = function FDrResourceConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      //..........................................................
      // @attribute
      o._serviceCode   = 'cloud.resource';
      o._catalogCode   = 'cloud.resource.catalog';
      o._resources     = null;
      //..........................................................
      // @method
      o.construct      = FDrResourceConsole_construct;
      // @method
      o.doList         = FDrResourceConsole_doList;
      o.doShare        = FDrResourceConsole_doShare;
      o.doDelete       = FDrResourceConsole_doDelete;
      // @method
      o.doListShare    = FDrResourceConsole_doListShare;
      // @method
      o.doFolderCreate = FDrResourceConsole_doFolderCreate;
      o.doFolderUpdate = FDrResourceConsole_doFolderUpdate;
      o.doFolderDelete = FDrResourceConsole_doFolderDelete;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDrResourceConsole_construct = function FDrResourceConsole_construct(){
      var o = this;
      o.__base.FDrAbsResourceConsole.construct.call(o);
      // 初始化属性
      o._resources = new TDictionary();
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
   MO.FDrResourceConsole_doList = function FDrResourceConsole_doList(typeCd, search, order, pageSize, page){
      var o = this;
      // 发送数据请求
      var url = '/' + o._serviceCode + '.ws?action=list&type_cd=' + typeCd + '&serach=' + search + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }

   //==========================================================
   // <T>分享一条数据记录。</T>
   //
   // @method
   // @param guid:String 唯一编号
   // @param shareCd:String 分享类型
   //==========================================================
   MO.FDrResourceConsole_doShare = function FDrResourceConsole_doShare(guid, shareCd){
      var o = this;
      var url = o.makeServiceUrl('share') + '&guid=' + guid + '&share_cd=' + shareCd;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }

   //==========================================================
   // <T>删除一条数据记录。</T>
   //
   // @method
   // @param typeCd:String 资源类型
   // @param guid:String 唯一编号
   //==========================================================
   MO.FDrResourceConsole_doDelete = function FDrResourceConsole_doDelete(typeCd, guid){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=delete&type_cd=' + typeCd + '&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
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
   MO.FDrResourceConsole_doListShare = function FDrResourceConsole_doListShare(typeCd, search, order, pageSize, page){
      var o = this;
      // 发送数据请求
      var url = '/' + o._serviceCode + '.ws?action=listShare&type_cd=' + typeCd + '&serach=' + search + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }

   //==========================================================
   // <T>创建资源文件夹。</T>
   //
   // @method
   //==========================================================
   MO.FDrResourceConsole_doFolderCreate = function FDrResourceConsole_doFolderCreate(parentGuid, code, label){
      var o = this;
      // 设置数据
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'create');
      // 设置资源数据
      var xfolder = xroot.create('Folder');
      xfolder.set('parent_guid', parentGuid);
      xfolder.set('code', code);
      xfolder.set('label', label);
      // 发送数据
      return RConsole.find(FXmlConsole).sendAsync('/' + o._catalogCode + '.ws', xdocument);
   }

   //==========================================================
   // <T>修改资源文件夹。</T>
   //
   // @method
   //==========================================================
   MO.FDrResourceConsole_doFolderUpdate = function FDrResourceConsole_doFolderUpdate(guid, code, label){
      var o = this;
      // 设置数据
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      // 设置资源数据
      var xfolder = xroot.create('Folder');
      xfolder.set('guid', guid);
      xfolder.set('code', code);
      xfolder.set('label', label);
      // 发送数据
      return RConsole.find(FXmlConsole).sendAsync('/' + o._catalogCode + '.ws', xdocument);
   }

   //==========================================================
   // <T>删除资源文件夹。</T>
   //
   // @method
   // @param guid:String 唯一编号
   //==========================================================
   MO.FDrResourceConsole_doFolderDelete = function FDrResourceConsole_doFolderDelete(guid){
      var o = this;
      var url = '/' + o._catalogCode + '.ws?action=delete&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
}
