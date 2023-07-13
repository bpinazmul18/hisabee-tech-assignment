import type { GetServerSideProps } from 'next'

import { getProductList } from "@/services/product"
import { ProductIProps } from '@/models/Product'

const HomePage = (props: ProductIProps[]) => {
  console.log({ props})
  
  return (
    <>
      <h2>Hello</h2>
    </>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<{ products: ProductIProps[] }> = async ({ req, query }) => {
    console.log({ ...query})

    const productList = await getProductList({ ...query})

    if (!productList) {
      return {
        notFound: true
      }
    }

  return { props: { products: productList || [] } }
}
 