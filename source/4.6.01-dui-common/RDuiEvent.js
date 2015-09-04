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
MO.RDuiEvent = function RDuiEvent(){
   var o = this;
   //..........................................................
   // @attribute 存储所有关联过事件的控件
   o._objects  = new Array();


   // Attribute
   o.current   = 0;
   o.events    = new Array();
   return o;
}

//==========================================================
// <T>页面事件处理。</T>
//
// @method
// @param event:Event 事件对象
//==========================================================
MO.RDuiEvent.prototype.ohEvent = function RDuiEvent_ohEvent(event){
   MO.Dui.Event.process(this, event ? event : window.event);
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param e:event:Event 事件对象
//==========================================================
MO.RDuiEvent.prototype.onProcess = function RDuiEvent_onProcess(e){
   // 当前this指向EventHandle对象
   var e = this;
   //var annotation = e.annotation;
   //if(annotation._logger){
   //   MO.Logger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', annotation._handle, MO.Class.dump(e.source), MO.Class.dump(e.hSource), MO.Method.name(e.onProcess));
   //}
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
// @param hTag:HtmlTag 页面元素
// =========================================================
MO.RDuiEvent.prototype.find = function RDuiEvent_find(hTag){
   var o = this;
   var uid = MO.Window.Html.uid(hTag);
   var events = o._objects;
   var event = events[uid];
   if(event == null){
      event = events[uid] = new MO.THtmlEvent();
      event.linker = hTag;
   }
   return event;
}

//==========================================================
// <T>响应一次事件处理。</T>
//
// @method
// @param hs:htmlSource:<Html> 发出者对象
// @param he:htmlEvent:<Event> 事件对象
// =========================================================
MO.RDuiEvent.prototype.process = function RDuiEvent_process(hs, he){
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
            e.source = MO.RHtml.linkGet(hs, '_plink');
            e.hSender = MO.RHtml.eventSource(he);
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
               //if(ea._logger){
               //   MO.Logger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', ea._handle, MO.Class.dump(e.source), MO.Class.dump(e.hSource), MO.Method.name(e.ohProcess));
               //}
               e.ohProcess.call(e.source, e);
            }else if(e.onProcess){
               // 如果没有立即事件，则处理队列内响应事件
               MO.Console.find(MO.FDuiFrameEventConsole).push(e);
            }
         }
         return true;
      }
   }
   return false;
}

//==========================================================
// <T>响应一次事件处理。</T>
//
// @method
// @param hs:htmlSource:<Html> 发出者对象
// @param he:htmlEvent:<Event> 事件对象
// =========================================================
MO.RDuiEvent.prototype.release = function RDuiEvent_release(){
   var o = this;
   // 释放对象集合
   var v = o._objects;
   if(v){
      MO.RMemory.free(v);
      o._objects = null;
   }
   //RMemory.free(o.events);
   //o.events = null;
}
// ------------------------------------------------------------










// ------------------------------------------------------------
MO.RDuiEvent.prototype.nvl = function RDuiEvent_nvl(event, sender, code){
   if(!event){
      event = new MO.TEvent();
   }
   event.sender = sender;
   event.code = code;
   return event;
}
// ------------------------------------------------------------
// sender, code
MO.RDuiEvent.prototype.alloc = function RDuiEvent_alloc(s, c){
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
      e = es[es.length] = new MO.TEvent();
   }
   // 设置事件对象的属性
   e.inUsing = true;
   e.sender = s;
   e.code = c;
   return e;
}
// ------------------------------------------------------------
MO.RDuiEvent.prototype.free = function RDuiEvent_free(e){
   e.inUsing = false;
}
//..........................................................
// 实例化内容
MO.Dui.Event = new MO.RDuiEvent();
