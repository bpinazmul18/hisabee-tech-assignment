import RootLayout from '@/components/layouts'
import { getCategoryList } from '@/services/category'
import '@/styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'

const NextApp = ({ Component, pageProps }: AppProps) => {
  return (
      <RootLayout>
          <Component {...pageProps} />
      </RootLayout>
  )
}

export default NextApp

NextApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  const dataFetchPromises: Promise<void>[] = [];
  const props: { categoryList?: any } = {};

  dataFetchPromises.push(
    getCategoryList({ limit: 5 }).then((categoryList) => {
      console.log({ categoryList})
      // if (categoryList && categoryList.data) {
      //   store.dispatch(setCategoryList(categoryList.data));
      //   props.categoryList = categoryList || {};
      // }
    })
  );

  await Promise.all(dataFetchPromises);

  return { ...appProps, ...props };
};
