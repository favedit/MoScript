//==========================================================
// <T>卡片资源控制台。</T>
//
// @class
// @author maocy
// @history 150706
//==========================================================
MO.FEaiCardResourceConsole = function FEaiCardResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._cards      = MO.Class.register(o, new MO.AGetter('_cards'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiCardResourceConsole_construct;
   // @method
   o.find        = MO.FEaiCardResourceConsole_find;
   o.unserialize = MO.FEaiCardResourceConsole_unserialize;
   // @method
   o.dispose     = MO.FEaiCardResourceConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCardResourceConsole_construct = function FEaiCardResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 创建属性
   o._cards = new MO.TDictionary();
}

//==========================================================
// <T>根据代码查找城市信息。</T>
//
// @method
// @param code:String 代码
// @return 城市信息
//==========================================================
MO.FEaiCardResourceConsole_find = function FEaiCardResourceConsole_find(code){
   return this._cards.get(code);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCardResourceConsole_unserialize = function FEaiCardResourceConsole_unserialize(input){
   var o = this;
   var cards = o._cards;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var card = MO.Class.create(MO.FEaiCardResource);
      card.unserialize(input);
      cards.set(card.code(), card);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCardResourceConsole_dispose = function FEaiCardResourceConsole_dispose(){
   var o = this;
   o._cards = MO.Lang.Object.dispose(o._cards);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
