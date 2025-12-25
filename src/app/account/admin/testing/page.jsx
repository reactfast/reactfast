import Product from '@/builderAssets/digitalBusinessCard/ecom/product'
import ProductCategory from '@/builderAssets/digitalBusinessCard/ecom/productCategory'
import MobileProductCard from '@/builderAssets/digitalBusinessCard/ecom/compactProduct'

export default function Testing() {
  return (
    <>
      <div>
        <div>
          <Product obj={''} />
          <ProductCategory obj={{ title: 'Product Category' }} />
          <MobileProductCard obj={{}} colors={['red', 'blue']} />
        </div>
      </div>
    </>
  )
}
