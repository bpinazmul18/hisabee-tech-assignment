import type { GetServerSideProps } from 'next'

import { getProductList } from "@/services/product"
import { ProductIProps } from '@/models/Product'

const HomePage = (props: ProductIProps[]) => {
  console.log({ props})
  
  return (
    <h1>HI</h1>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<{ products: ProductIProps[] }> = async ({ req, query }) => {
  const cat = Array.isArray(query.cat) ? query.cat[0] : query.cat;
  const productList = await getProductList({ cat: cat || '' })

  if (!productList) {
    return {
      notFound: true
    }
  }

  return { props: { products: productList || [] } }
}
