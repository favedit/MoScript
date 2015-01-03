// ============================================================
// REvent
// objects(Array)
//  └- htmlEvent(uniqueNumber - THtmlEvent)
//       ├- link
//       └- events
//            └- event(Array)
//                 ├- 1(HEventHandle)
//                 ├- 2
//                 └- ...
// ============================================================
var REvent = new function(){
   var o = this;
   // Attribute
   o.current   = 0;
   o.events    = new Array();
   /// @attribute 存储所有关联过事件的控件
   o.objects   = new Array();
   o.ohEvent   = REvent_ohEvent;
   o.onProcess = REvent_onProcess;
   // Method
   o.nvl       = REvent_nvl;
   o.alloc     = REvent_alloc;
   o.free      = REvent_free;
   o.find      = REvent_find;
   o.process   = REvent_process;
   o.release   = REvent_release;
   // Construct
   RMemory.register('REvent', o);
   return o;
}
// ------------------------------------------------------------
function REvent_ohEvent(e){
   if(!e){
      e = window.event;
   }
   REvent.process(this, e);
}
// ------------------------------------------------------------
function REvent_onProcess(){
   // 当前this指向EventHandle对象
   var e = this;
   RLogger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
   if(e.sender){
      e.onProcess.call(e.source, e.sender, e);
   }else{
      e.onProcess.call(e.source, e);
   }
   RConsole.find(FFormConsole).processEvent(e);
}
// ------------------------------------------------------------
function REvent_nvl(event, sender, code){
   if(!event){
      event = new TEvent();
   }
   event.sender = sender;
   event.code = code;
   return event;
}
// ------------------------------------------------------------
// sender, code
function REvent_alloc(s, c){
   var e = null;
   var es = this.events;
   // 查找一个未被使用的事件对象
   for(var n=0; n<es.length; n++){
      if(!es[n].inUsing){
         e = es[n];
         break;
      }
   }
   // 如果未找到则新建一个事件对象
   if(!e){
      e = es[es.length] = new TEvent();
   }
   // 设置事件对象的属性
   e.inUsing = true;
   e.sender = s;
   e.code = c;
   return e;
}
// ------------------------------------------------------------
function REvent_free(e){
   e.inUsing = false;
}
// ------------------------------------------------------------
// htmlObject
function REvent_find(h){
   var u = RRuntime.uid(h);
   var os = this.objects;
   var e = os[u];
   if(!e){
      e = os[u] = new THtmlEvent();
      e.link = h;
   }
   return e;
}
// =========================================================
// <T>响应一次事件处理。</T>
//
// @param hs:htmlSource:<Html> 发出者对象
// @param he:htmlEvent:<Event> 事件对象
// =========================================================
function REvent_process(hs, he){
   // 检查参数
   if(!(hs && he)){
      return;
   }
   // 处理事件
   var o = this;
   var un = hs._psource ? RRRuntimeHtml.uid(hs._psource) : RRuntime.uid(hs);
   var eo = o.objects[un];
   if(eo){
      var es = eo.events[he.type];
      if(es){
         var l = es.length;
         for(var n=0; n<l; n++){
            // 处理每一个事件
            var e = es[n];
            e.source = RHtml.linkGet(hs, '_plink');
            e.hSender = he.srcElement ? he.srcElement : he.target;
            e.hSource = hs;
            if(e.attach){
               e.attach(he)
            }
            // 自定义处理事件
            var er = e.sender ? e.sender : e.source;
            if(er && er._events){
               var ec = er._events.get(e.name);
               if(ec){
                  e.result = false;
                  ec.invoke(e.source, er, e);
                  if(e.result){
                     return;
                  }
               }
            }
            if(e.ohProcess){
               // 处理立即事件
               RLogger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               try{
                  if(e.sender){
                     e.ohProcess.call(e.source, e.sender, e, he);
                  }else{
                     e.ohProcess.call(e.source, e, he);
                  }
               }catch(ex){
                  RMessage.fatal(o, ex, 'Execute {1} failure. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               }
            }else if(e.onProcess){
               // 如果没有立即事件，则处理队列内响应事件
               RConsole.find(FEventConsole).push(e);
            }
         }
         return true;
      }
   }
   return false;
}
// ------------------------------------------------------------
function REvent_release(){
   var o = this;
   RMemory.free(o.events);
   RMemory.free(o.objects);
   o.events = null;
   o.objects = null;
}
// ------------------------------------------------------------
