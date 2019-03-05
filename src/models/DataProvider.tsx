import { Provider } from 'react-redux';
import dataStore from './dataStore';

export default function DataProvider (props: any) {
  return <Provider store={dataStore}>
  {props.children}
  </Provider>;
}
