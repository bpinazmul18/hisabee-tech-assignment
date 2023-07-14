import RootLayout from '@/components/layouts'
import { getCategoryList } from '@/services/category'
import '@/styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'
import { store, persistedStore } from '@/store/configureStore';
import { setCategoryList } from '@/store/categories'
import axios from 'axios'

const NextApp = ({ Component, pageProps, ...otherProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <RootLayout {...pageProps} {...otherProps}>
          <Component {...pageProps} {...otherProps}/>
        </RootLayout>
      </PersistGate>
    </Provider>
  )
}

export default NextApp

NextApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  axios.defaults.baseURL = process.env.API_URL;

  const dataFetchPromises: Promise<void>[] = [];
  const props: { categoryList?: any } = {};

  dataFetchPromises.push(
    getCategoryList().then((categoryList) => {
      if (categoryList) {
        store.dispatch(setCategoryList(categoryList));
        props.categoryList = categoryList || [];
      }
    })
  );

  await Promise.all(dataFetchPromises);

  return { ...appProps, ...props };
};
