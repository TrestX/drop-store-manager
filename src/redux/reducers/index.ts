
import { combineReducers } from 'redux';
import { Orders } from './order';
import  UsersReducer  from './user'
import UtilReducer from './util';
import BannerReducer from './banner';
import CategoryReducer from './category';
import ShopReducer from './shop';
import SellerReducer from './seller';
import ItemReducer from './item';
import AddressReducer from './address';
import PaymentReducer from './payments';
import TotalTransactionsReducer from './tt';
import AppWalletCustomReducer from './appWalletCustom';
import ItemCategoryReducer from './itemCategory';
import SellerShopsTReducer from './sellerShopsT';
const reducers = combineReducers({
  users:UsersReducer,
  orders:Orders,
  util:UtilReducer,
  banner:BannerReducer,
  category:CategoryReducer,
  shop:ShopReducer,
  seller:SellerReducer,
  item:ItemReducer,
  address:AddressReducer,
  payments:PaymentReducer,
  tts: TotalTransactionsReducer,
  appwalletCustom: AppWalletCustomReducer,
  itemCat:ItemCategoryReducer,
  sellerShop: SellerShopsTReducer
});

export default reducers;
