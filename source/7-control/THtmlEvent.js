/**************************************************************
 * 存放表格中一列的属性类
 *
 * @tool
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function THtmlEvent(){
   var o = this;
   // Property
   o.link    = null;
   o.events  = new Object();
   // Method
   o.load    = THtmlEvent_load;
   o.push    = THtmlEvent_push;
   o.dispose = THtmlEvent_dispose;
   o.dump    = THtmlEvent_dump;
   return o;
}

/**************************************************************
 * <T>从事件对象中复制运行信息。</T>
 *
 * @method
 * @param c:config:TXmlDoc js中的xml节点
 **************************************************************/
function THtmlEvent_load(e){
   var o = this;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}

// -------------------------------------------------------------
function THtmlEvent_push(pn, pe){
   var o = this;
   var ess = o.events;
   // 同步事件集合
   var es = ess[pn];
   if(!es){
      es = new Array();
      es.handle = pe.handle;
      ess[pn] = es;
   }
   // 存在性检查
   var f = pe.name;
   var c = es.length;
   for(var i = 0; i < c; i++){
      var e = es[i];
      if(e.name == f){
         RMessage.fatal(this, 'push', 'Duplicate event for same control. (name={1}, source={2}, event={3})\n{4}\n{5}', pn, RClass.dump(pe.source), RClass.dump(pe), RString.repeat('-', 60), o.dump());
      }
   }
   // 加入队列
   es[es.length] = pe;
}

// -------------------------------------------------------------
function THtmlEvent_dispose(){
   var o = this;
   for(var n in o.events){
      var e = o.events[n];
      if(e.length){
         o.link[e.handle] = null;
      }
   }
   if(o.link.link){
      o.link.removeAttribute('link');
   }
}

// -------------------------------------------------------------
function THtmlEvent_dump(){
   var o = this;
   var ess = o.events;
   var r = new TString();
   for(var en in ess){
      var es = ess[en];
      var ec = es.length;
      r.append('event=' + en + ' (count=' + ec + ')\n');
      for(var n = 0; n < ec; n++){
         var e = es[n];
         r.append('   ' + n + ' source=' + RClass.dump(e.source) + ', event=' + RClass.dump(e) + '\n');
      }
   }
   return r.toString();
}
