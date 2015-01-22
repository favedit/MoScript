//==========================================================
// <T>事件的管理类。</T>
// objects(Array)
//  └- htmlEvent(uniqueNumber - THtmlEvent)
//       ├- link
//       └- events
//            └- event(Array)
//                 ├- 1(HEventHandle)
//                 ├- 2
//                 └- ...
//
// @reference
// @author maocy
// @version 150120
//==========================================================
var REvent = new function(){
   var o = this;
   //..........................................................
   // @attribute 存储所有关联过事件的控件
   o._objects  = new Array();
   //..........................................................
   // @event
   o.ohEvent   = REvent_ohEvent;
   //..........................................................
   // @event
   o.onProcess = REvent_onProcess;
   //..........................................................
   // @method
   o.find      = REvent_find;
   o.process   = REvent_process;



   // Attribute
   o.current   = 0;
   o.events    = new Array();
   // Method
   o.nvl       = REvent_nvl;
   o.alloc     = REvent_alloc;
   o.free      = REvent_free;
   o.release   = REvent_release;
   // Construct
   RMemory.register('REvent', o);
   return o;
}

//==========================================================
// <T>页面事件处理。</T>
//
// @method
// @param e:event:Event 事件对象
//==========================================================
function REvent_ohEvent(e){
   REvent.process(this, e ? e : window.event);
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param e:event:Event 事件对象
//==========================================================
function REvent_onProcess(e){
   // 当前this指向EventHandle对象
   var e = this;
   var ea = e.annotation;
   if(ea._logger){
      RLogger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
   }
   if(e.sender){
      e.onProcess.call(e.source, e.sender, e);
   }else{
      e.onProcess.call(e.source, e);
   }
   //RConsole.find(FFormConsole).processEvent(e);
}

//==========================================================
// <T>查找事件对象。</T>
//
// @method
// @param p:html:HtmlTag 页面元素
// =========================================================
function REvent_find(p){
   var u = RHtml.uid(p);
   var es = this._objects;
   var e = es[u];
   if(e == null){
      e = es[u] = new THtmlEvent();
      e.linker = p;
   }
   return e;
}

//==========================================================
// <T>响应一次事件处理。</T>
//
// @method
// @param hs:htmlSource:<Html> 发出者对象
// @param he:htmlEvent:<Event> 事件对象
// =========================================================
function REvent_process(hs, he){
   var o = this;
   // 检查参数
   if(!hs || !he){
      return;
   }
   // 处理事件
   var eo = o.find(hs);
   if(eo){
      var es = eo.events[he.type];
      if(es){
         var ec = es.length;
         for(var i = 0; i < ec; i++){
            // 处理每一个事件
            var e = es[i];
            var ea = e.annotation;
            e.source = RHtml.linkGet(hs, '_plink');
            e.hSender = RHtml.eventSource(he);
            e.sender = e.hSender._plinker;
            e.hSource = hs;
            ea.attach(e, he);
            // 自定义处理事件
            //var er = e.sender ? e.sender : e.source;
            //if(er && er._events){
            //   var ec = er._events.get(e.name);
            //   if(ec){
            //      e.result = false;
            //      ec.invoke(e.source, er, e);
            //      if(e.result){
            //         return;
            //      }
            //   }
            //}
            if(e.ohProcess){
               // 处理立即事件
               if(ea._logger){
                  RLogger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               }
               e.ohProcess.call(e.source, e);
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
function REvent_release(){
   var o = this;
   RMemory.free(o.events);
   RMemory.free(o._objects);
   o.events = null;
   o._objects = null;
}
// ------------------------------------------------------------
