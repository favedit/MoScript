with(MO){
   //==========================================================
   // <T>模板工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsSolutionFrameSet = function FDsSolutionFrameSet(o){
      o = MO.Class.inherits(this, o, FDuiFrameSet, MUiStorage);
      //..........................................................
      // @property
      o._frameName            = 'resource.private.solution.FrameSet';
      o._storageCode          = o._frameName;
      //..........................................................
      // @style
      o._styleCatalogGround   = MO.Class.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleCatalogToolbar  = MO.Class.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
      o._styleSearchGround    = MO.Class.register(o, new AStyle('_styleSearchGround', 'List_Ground'));
      o._styleSearchToolbar   = MO.Class.register(o, new AStyle('_styleCatalogToolbar', 'List_Toolbar'));
      o._stylePreviewGround   = MO.Class.register(o, new AStyle('_stylePreviewGround', 'Property_Ground'));
      o._stylePreviewToolbar  = MO.Class.register(o, new AStyle('_stylePreviewToolbar', 'Property_Toolbar'));
      o._stylePropertyGround  = MO.Class.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      //..........................................................
      // @attribute
      o._pageSize             = 40;
      o._activeResourceCd     = 'private';
      o._activeProjectGuid    = null;
      // @attribute
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameList            = null;
      o._frameListToolbar     = null;
      o._frameListContent     = null;
      o._frameProperty        = null;
      o._framePropertyToolbar = null;
      o._framePropertyContent = null;
      // @attribute
      o._propertyFrames       = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsSolutionFrameSet_onBuilded;
      //..........................................................
      // @method
      o.construct             = FDsSolutionFrameSet_construct;
      // @method
      o.findPropertyFrame     = FDsSolutionFrameSet_findPropertyFrame;
      // @method
      o.selectObject          = FDsSolutionFrameSet_selectObject;
      o.switchContent         = FDsSolutionFrameSet_switchContent;
      o.load                  = FDsSolutionFrameSet_load;
      // @method
      o.dispose               = FDsSolutionFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSolutionFrameSet_onBuilded = function FDsSolutionFrameSet_onBuilded(p){
      var o = this;
      o.__base.FDuiFrameSet.onBuilded.call(o, p);
      //..........................................................
      // 设置目录区
      var frame = o._frameCatalog = o.searchControl('catalogFrame');
      frame._hPanel.className = o.styleName('Catalog_Ground');
      var frame = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
      frame._hPanel.className = o.styleName('Catalog_Toolbar');
      var frame = o._frameCatalogContent = o.searchControl('catalogContentFrame');
      // 设置属性区
      var frame = o._frameList = o.searchControl('listFrame');
      frame._hPanel.className = o.styleName('List_Ground');
      var frame = o._frameListToolbar = o.searchControl('listToolbarFrame');
      frame._hPanel.className = o.styleName('List_Toolbar');
      var frame = o._frameListContent = o.searchControl('listContentFrame');
      // 设置属性区
      //var frame = o._frameProperty = o.searchControl('propertyFrame');
      //frame._hPanel.className = o.styleName('Property_Ground');
      //var frame = o._framePropertyToolbar = o.searchControl('propertyToolbarFrame');
      //frame._hPanel.className = o.styleName('Property_Toolbar');
      //var frame = o._framePropertyProperty = o.searchControl('propertyPropertyFrame');
      //..........................................................
      // 设置分割
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      //var spliter = o._propertySpliter = o.searchControl('propertySpliter');
      //spliter.setAlignCd(EUiAlign.Right);
      //spliter.setSizeHtml(o._frameProperty._hPanel);
      //..........................................................
      //var hTable = RBuilder.createTable(p);
      //hTable.width = '100%';
      //var hRow = RBuilder.appendTableRow(hTable);
      // 设置工具栏
      //var c = o._toolbar = MO.Class.create(FDsSolutionMenuBar);
      //c._workspace = o;
      //c.buildDefine(p);
      //var hCell = RBuilder.appendTableCell(hRow);
      //hCell.appendChild(c._hPanel);
      // 设置分页栏
      //var c = o._tabBar = MO.Class.create(FDsSolutionTabBar);
      //c._workspace = o;
      //c.buildDefine(p);
      //var hCell = RBuilder.appendTableCell(hRow);
      //hCell.width = '170px';
      //hCell.align = 'right';
      //hCell.vAlign = 'bottom';
      //hCell.appendChild(c._hPanel);
      //o._frameToolBar.push(c);
      //o._frameToolBar._hPanel.appendChild(hTable);
      //..........................................................
      // 设置目录工具栏
      var control = o._catalogToolbar = MO.Class.create(FDsSolutionCatalogToolBar);
      control._frameSet = o;
      control.buildDefine(p);
      o._frameCatalogToolbar.push(control);
      // 设置目录栏
      var control = o._catalogContent = MO.Class.create(FDsSolutionCatalogContent);
      control._frameSet = o;
      control.build(p);
      //control.addSelectedListener(o, o.selectObject);
      o._frameCatalogContent.push(control);
      //..........................................................
      // 设置搜索栏
      var control = o._listToolbar = MO.Class.create(FDsSolutionListToolBar);
      control._frameSet = o;
      control.buildDefine(p);
      o._frameListToolbar.push(control);
      // 设置搜索内容
      var control = o._listContent = MO.Class.create(FDsSolutionListContent);
      control._frameSet = o;
      control.build(p);
      o._frameListContent.push(control);
      //..........................................................
      // 设置画板工具栏
      //var control = o._propertyToolbar = MO.Class.create(FDsSolutionPropertyToolBar);
      //control._frameSet = o;
      //control.buildDefine(p);
      //o._framePropertyToolbar.push(control);
      // 设置画板
      //var control = o._propertyProperty = MO.Class.create(FDsSolutionProjectProperty);
      //control._workspace = o;
      //control._toolbar = o._propertyToolbar;
      //control.buildDefine(p);
      //o._framePropertyProperty.push(control);
      //..........................................................
      //var code = o._activeResourceCd = o.storageGet('frameset_code', 'project');
      //o.switchContent(code);
      o.switchContent('private');
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionFrameSet_construct = function FDsSolutionFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiFrameSet.construct.call(o);
      // 设置属性
      o._propertyFrames = new TDictionary();
   }

   //==========================================================
   // <T>根据名称获得属性页面。</T>
   //
   // @method
   // @return FDuiFrame 页面
   //==========================================================
   MO.FDsSolutionFrameSet_findPropertyFrame = function FDsSolutionFrameSet_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = MO.Console.find(FFrameConsole);
         f = fc.get(o, p, o._framePropertyProperty._hContainer);
         f._workspace = o;
         o._propertyFrames.set(p, f);
      }
      return f;
   }

   //==========================================================
   // <T>目录对象选择处理。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   MO.FDsSolutionFrameSet_selectObject = function FDsSolutionFrameSet_selectObject(control){
      var o = this;
      var space = o._activeSpace;
      // 隐藏所有属性面板
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      // 显示选中属性面板
      if(MO.Class.isClass(control, FDsSolutionListItem)){
         var f = o.findPropertyFrame(EDsFrame.SolutionProjectPropertyFrame);
         f.show();
         f.loadObject(control);
         o._activeProjectGuid = control._guid;
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }


   //==========================================================
   // <T>选择内容。</T>
   //
   // @method
   // @param typeCd:String 内容类型
   //==========================================================
   MO.FDsSolutionFrameSet_switchContent = function FDsSolutionFrameSet_switchContent(typeCd){
      var o = this;
      //o.storageSet('frameset_code', 'project')
      //var code = o._activeResourceCd = o.storageGet('frameset_code', 'project');
      o._activeResourceCd = typeCd;
      o._listContent.serviceSearch(typeCd, '', o._pageSize, 0);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionFrameSet_load = function FDsSolutionFrameSet_load(){
      var o = this;
      o._listContent.serviceSearch('private', '', o._pageSize, 0);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionFrameSet_dispose = function FDsSolutionFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiFrameSet.dispose.call(o);
      // 设置属性
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
