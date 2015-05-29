with(MO){
   //==========================================================
   // <T>进程事件。</T>
   //
   // @class
   // @author maocy
   // @version 150305
   //==========================================================
   MO.FProcessEvent = function FProcessEvent(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code      = null;
      o._data      = null;
      o._listeners = null;
      //..........................................................
      // @method
      o.code       = FProcessEvent_code;
      o.setCode    = FProcessEvent_setCode;
      o.data       = FProcessEvent_data;
      o.setData    = FProcessEvent_setData;
      // @method
      o.register   = FProcessEvent_register;
      return o;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FProcessEvent_name = function FProcessEvent_name(){
      return this._name;
   }

   //==========================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //==========================================================
   MO.FProcessEvent_code = function FProcessEvent_code(){
      return this._code;
   }

   //==========================================================
   // <T>设置代码。</T>
   //
   // @method
   // @param p:code:String 代码
   //==========================================================
   MO.FProcessEvent_setCode = function FProcessEvent_setCode(p){
      this._code = p;
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return Object 数据
   //==========================================================
   MO.FProcessEvent_data = function FProcessEvent_data(){
      return this._data;
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param p:value:Object 数据
   //==========================================================
   MO.FProcessEvent_setData = function FProcessEvent_setData(p){
      this._data = p;
   }

   //==========================================================
   // <T>注册一个处理。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FProcessEvent_register = function FProcessEvent_register(po, pf){
      var o = this;
      if(!o._listeners){
         o._listeners = new TListeners();
      }
      o._listeners.register(po, pf);
   }
}
