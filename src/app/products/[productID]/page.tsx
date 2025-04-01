import ProductDetail from "@/components/productDetails";
import { getProductById } from "@/Services/productsServices";

interface PageProps {
    params:Promise<{
        productID:string[];
    }>;
}

export default async function Product({params}:PageProps) {
    const resolvedParams = await params;
    const product = await getProductById(resolvedParams.productID[0])
      
  return <ProductDetail product={product} key={product?.id}/>
  
  
}



