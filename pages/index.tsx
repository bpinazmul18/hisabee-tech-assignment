import { GetServerSideProps } from 'next'
import { ProductIProps } from '@/models/Product'
import { getProductList } from '@/services/product'
import ProductCard from '@/components/ProductCard'

const HomePage = ({ products }: { products: ProductIProps[]}) => (
  <section className='py-4'>
    <div className="container">
      <div className="-mx-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  </section>
)

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
