//==========================================================
// <T>页面事件存储表。</T>
//
// @tool
// @author maocy
// @version 150120
//==========================================================
MO.THtmlEvent = function THtmlEvent(){
   var o = this;
   //..........................................................
   // @attribute
   o.linker  = null;
   o.events  = new Object();
   //..........................................................
   // @method
   //o.load    = THtmlEvent_load;
   o.push    = MO.THtmlEvent_push;
   o.dispose = MO.THtmlEvent_dispose;
   o.dump    = MO.THtmlEvent_dump;
   return o;
}

//==========================================================
// <T>页面事件处理。</T>
//
// @method
// @param pn:name:String 事件名称
// @param pe:event:Event 事件对象
//==========================================================
MO.THtmlEvent_push = function THtmlEvent_push(pn, pe){
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
   var c = es.length;
   if(c > 0){
      var fn = pe.annotation.name();
      for(var i = 0; i < c; i++){
         var e = es[i];
         var en = e.annotation.name();
         if(en == fn){
            throw new TError(o, 'Duplicate event for same control. (name={1}, source={2}, event={3})\n{4}\n{5}', en, RClass.dump(pe.source), RClass.dump(pe), RString.repeat('-', 60), o.dump());
         }
      }
   }
   // 加入队列
   es[es.length] = pe;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.THtmlEvent_dispose = function THtmlEvent_dispose(){
   var o = this;
   for(var n in o.events){
      var e = o.events[n];
      if(e.length){
         o.linker[e.handle] = null;
      }
   }
   if(o.linker.linker){
      o.linker.removeAttribute('link');
   }
}

//==========================================================
// <T>获得运行信息。</T>
//
// @method
// @return String 运行信息
//==========================================================
MO.THtmlEvent_dump = function THtmlEvent_dump(){
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
   return r.flush();
}



/**************************************************************
 * <T>从事件对象中复制运行信息。</T>
 *
 * @method
 * @param c:config:TXmlDoc js中的xml节点
 **************************************************************/
MO.THtmlEvent_load = function THtmlEvent_load(e){
   var o = this;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
