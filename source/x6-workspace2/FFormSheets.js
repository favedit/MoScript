//==========================================================
// 工具条的容器类
//
// @class FContainer
// @history 091109 MAOCY 创建
//==========================================================
function FFormSheets(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @attribute
   o._manager        = null;
   o.activeSheet     = null;
   o.sheets          = new TMap();
   //..........................................................
   // @html
   o.hLine           = null;
   //..........................................................
   // @event
   o.onBuildPanel    = FFormSheets_onBuildPanel;
   //..........................................................
   // @process
   o.oeBuild         = FFormSheets_oeBuild;
   //..........................................................
   // @method
   o.sheet           = FFormSheets_sheet;
   o.syncSheet       = FFormSheets_syncSheet;
   o.pushSheet       = FFormSheets_pushSheet;
   o.select          = FFormSheets_select;
   o.selectByIndex   = FFormSheets_selectByIndex;
   o.clear           = FFormSheets_clear;
   o.dispose         = FFormSheets_dispose;
   return o;
}

//==========================================================
// <T>构造底层面板。</T>
//
// @method
//==========================================================
function FFormSheets_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}

//==========================================================
// <T>构造控件的内部页面结构。</T>
//
// @method
// @param e:event:EEvent 构建事件
// @return EEventStatus 事件状态
//==========================================================
function FFormSheets_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   var hp = o.hPanel;
   var b = e.builder;
   if(e.isBefore()){
      // 构建底版
      hp.width = '100%';
      // 构建上线
      var hr = o.hTop = hp.insertRow();
      hr.insertCell();
      // 构建按键行
      var hr = hp.insertRow();
      var hc = o.hLinePanel = hr.insertCell();
      hc.height = 1;
      var hlf = o.hLineForm = RBuilder.appendTable(hc);
      o.hLine = hlf.insertRow();
      o.hCaption = o.hLine.insertCell();
      o.hCaption.innerText = ' ';
      // 构建下线
      var hr = o.hBottom = hp.insertRow();
      var hc = hr.insertCell();
      hc.height = '3';
      hc.bgColor = '#CCCCCC'

   }else if(e.isAfter()){
      // 将所有按键加入自己内部
      var cs = o.components;
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, FFormSheet)){
            o.pushSheet(c);
         }
      }
      // 构建右空白
      if(EAlign.Right != o.align){
         var hTd = b.create('TD');
         b.appendEmpty(hTd);
      }
   }
}

//==========================================================
// <T>选中一个表单容器。</T>
//
// @method
// @param s:sheet:FFormSheet 表单容器对象
//==========================================================
function FFormSheets_select(s){
   var o = this;
   // 不选中其他容器
   var ss = o.sheets;
   for(var i=0; i<ss.count; i++){
      var f = ss.value(i);
      if(f != s){
         f.innerSelect(false);
      }
   }
   // 选中指定容器
   o.activeSheet = s;
   s.innerSelect(true);
}

//==========================================================
// <T>按照位置选中一个表单容器。</T>
//
// @method
// @param n:index:Integer 索引位置
//==========================================================
function FFormSheets_selectByIndex(n){
   var o = this;
   var s = o.sheets.value(n);
   if(s){
      o.select(s);
   }
}

//==========================================================
// <T>获取索引位置的表单容器。</T>
//
// @method
// @param n:index:Integer 索引位置
//==========================================================
function FFormSheets_sheet(n){
   return this.sheets.value(n);
}

//==========================================================
// <T>根据名称获得一个表单容器。</T>
//
// @method
// @param n:name:String 容器名称
//==========================================================
function FFormSheets_syncSheet(n){
   var o = this;
   var s = o.sheets.get(n);
   if(!s){
      s = RControl.create(FFormSheet);
      s.name = n;
      o.pushSheet(s);
   }
   return s;
}

//==========================================================
// <T>将一个表单容器对象追加到自己内部。</T>
//
// @method
// @param s:sheet:FFormSheet 表单容器对象
//==========================================================
function FFormSheets_pushSheet(s){
   var o = this;
   s._manager = o._manager;
   s._sheets = o;
   o.sheets.set(s.name, s);
   var hc = s.hParent = o.hLine.insertCell();
   hc.appendChild(s.hPanel);
}

//==========================================================
// <T>清除所有按键。</T>
// <P>不释放对象，只隐藏所有按键。</P>
//
// @method
//==========================================================
function FFormSheets_clear(){
   var o = this;
   var ss = o.sheets;
   for(var n=ss.count-1; n>=0; n--){
      ss.value(n).setVisible(n);
   }
}
//==========================================================
// <T>清除所有按键。</T>
// <P>不释放对象，只隐藏所有按键。</P>
//
// @method
//==========================================================
function FFormSheets_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hLine = null;
   o.hCaption = null;
   o.hParent = null;
}
