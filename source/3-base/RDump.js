//===========================================================
// <T>运行信息管理类。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
var RDump = new function RDump(){
   var o = this;
   // @define
   o.LINE_SINGLE = '------------------------------';
   o.LINE_DOUBLE = '==============================';
   o.LINE_DOT    = '..............................';
   o.LINE_STAR   = '******************************';
   // @event
   o.onclick     = RDump_onclick;
   // @method
   o.nameInfo    = RDump_nameInfo;
   o.typeInfo    = RDump_typeInfo;
   o.dumpInner   = RDump_dumpInner;
   o.dump        = RDump_dump;
   o.appendLevel = RDump_appendLevel;
   o.stack       = RDump_stack;
   return o;
}

//===========================================================
// <T>鼠标点击处理。</T>
//===========================================================
function RDump_onclick(){
   var o = this;
   var d = o.link;
   if(o.link){
      if(d.loaded){
         d.show(!d.display);
      }else{
         RDump.dumpInner(o.link);
         d.loaded = true;
         d.show(true);
      }
   }
}

//===========================================================
// <T>获得对象的名称信息。</T>
//
// @param v:value:Object 对象
// @return 名称信息
//===========================================================
function RDump_nameInfo(v){
   var t = RClass.typeOf(v);
   switch(t){
      case 'Unknown':
         return '@unknown';
      case 'Function':
         return RMethod.name(v) + '@Function';
      case 'Array':
         return '@<Array>';
   }
   return v;
}

//===========================================================
// <T>获得对象的类型信息。</T>
//
// @param v:value:Object 对象
// @param t:typeName:Object 类型
// @return 类型信息
//===========================================================
function RDump_typeInfo(v, t){
   // 检查参数
   if(v == null){
      return 'null';
   }
   // 获得内容
   switch(t){
      case 'Unknown':
         return 'unknown';
      case 'Undefined':
         return 'undefined';
      case 'Boolean':
      case 'Number':
         return v.toString();
      case 'String':
         return v.length + ':\'' + RString.toLine(v) + '\'';
      case 'Function':
         if(v.__virtual){
            return 'virtual';
         }
         return RMethod.name(v, true);
      case 'Array':
         return '@<Array@' + RClass.code(v) + '>';
      case 'Html':
         //return '@' + v.outerHTML;
         return '@<' + v.tagName + '>';
      default:
         if(v.constructor == TClass){
            return '@<' + v.name + '@' + RClass.code(v) + '>';
         }
         if(v.constructor.constructor == Function){
            return "@" + v.toString();
         }
         try{
            for(var name in v){
               return '@' + t + '@<Object@' + RClass.code(v) + '>';
            }
         }catch(e){}
         return '<Object@' + RClass.code(v) + '>';
   }
   return v;
}

//===========================================================
// <T>生成对象的运行信息。</T>
//
// @param di:dumpItem:TDumpItem 运行信息项目
//===========================================================
function RDump_dumpInner(di){
   var hTable  = di.hTable;
   var hParent = di.hParent;
   var hInsRow = di.hRow;
   var level   = di.level;
   var obj     = di.link;
   var type    = RClass.typeOf(obj, true);
   var vcls    = obj.__class;
   // Names sort
   var names = new Array();
   for(var name in obj){
      names[names.length] = name;
   }
   if(RString.endsWith(type, 'Array')){
      RArray.reverse(names, 0, names.length - 1);
   }else{
      RArray.sort(names, true);
   }
   // Items Info
   var items = new Array();
   var c = names.length;
   for(var n = 0; n < c; n++){
      var name = names[n];
      var value = obj[name];
      var type = RClass.safeTypeOf(value, true);
      var info = null;
      if(vcls){
         var ann = vcls.annotationFind(name);
         if(ann){
            type = 'Annotation'
            info = ann + ' - ' + value;
         }
      }
      if(info == null){
         info = this.typeInfo(value, type);
      }
      // Row
      var rdi = null;
      var index = hInsRow ? hInsRow.rowIndex + 1 : 1;
      var hRow = RBuilder.appendTableRow(hTable, null, index);
      if(RString.startsWith(info, '@')){
         hRow.style.cursor = 'pointer';
         hRow.onclick = this.onclick;
         hRow.bgColor = '#FFF0E0';
         rdi = hRow.link = di.create();
         rdi.link = value;
         rdi.level = level;
         rdi.caption = name;
         rdi.hTable = hTable;
         rdi.level = level + 1;
         rdi.hRow = hRow;
      }else{
         di.push(hRow);
      }
      // Virtual function
      if((type == 'Function') && (info == 'virtual')){
         hRow.bgColor = '#E0F0FF';
      }
      // Cell: Name
      var hCell = RBuilder.appendTableCell(hRow);
      var icon = RString.startsWith(info, '@') ? ' +' : '  ';
      var label = RString.repeat('   ', level) + icon + ' ' + name
      hCell.innerHTML = RHtml.toHtml(label);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      hCell.width = '240px'
      if(rdi){
         rdi.hText = hCell;
      }
      // Cell: type
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.innerHTML = RHtml.toHtml(type);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      if(type == 'Function'){
         hCell.style.color = '#3333FF';
      }else{
         hCell.style.color = '#FF3333';
      }
      hCell.width = '200px'
      // Cell: Info
      var hCell = RBuilder.appendTableCell(hRow);
      if(RString.startsWith(info, '@')){
         info = info.substr(1);
      }
      hCell.innerHTML = RHtml.toHtml(info);
      hCell.style.borderBottom = '1px solid #F0F0F0';
   }
}

//===========================================================
// <T>生成对象的运行信息。</T>
//
// @param v:value:Object 对象
// @param h:html:HtmlObject HTML容器
//===========================================================
function RDump_dump(v, h){
   if(!h){
      h = RBuilder.append(null, 'DIV')
   }
   // 生成对象信息
   var s = new TString();
   s.append('<', RClass.safeTypeOf(v));
   if(v && v.tagName){
      s.append(' - ', v.tagName);
   }
   s.appendLine('@' + RClass.code(v) + '>');
   // 追加内容
   var hPanel = RBuilder.append(h, 'DIV');
   hPanel.style.border = '1px solid #BBBBBB';
   var hTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   hTable.width = '100%'
   // 追加行内容
   var hRow = RBuilder.appendTableRow(hTable);
   var hCell = RBuilder.appendTableCell(hRow);
   RHtml.textSet(hCell, s.toString());
   hCell.colSpan = 3;
   hCell.style.padding = 2;
   hCell.style.borderBottom = '1px solid gray';
   hCell.style.backgroundColor = '#E0E0EB';
   // 建立新的层次
   var di = new TDumpItem();
   di.hTable = hTable;
   di.hParent = h;
   di.link = v;
   di.level = 0;
   this.dumpInner(di);
}

//===========================================================
// <T>追加运行层次。</T>
//
// @param r:result:FString 字符串
// @param l:level:Integer 层次
//===========================================================
function RDump_appendLevel(r, l){
   for(var n = 0; n < l; n++){
      r.append('   ');
   }
}

//===========================================================
// <T>获得当前调用堆栈。</T>
//
// @return 堆栈信息
//===========================================================
function RDump_stack(){
   var o = RDump_stack.caller;
   var s = new TString();
   while(o){
      s.append(RMethod.name(o));
      o = o.caller;
      if(o){
         s.appendLine();
      }
   }
   RLogger.debug(this, s);
}
