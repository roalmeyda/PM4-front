import Link from "next/link";
import CardProduct from "@/components/CardProduct";
import { getProducts } from "@/Services/productsServices";
// import { dataMock } from "@/lib/dataMock";

export default async function HomePage() {
  const dataProducts = await getProducts();
  return (
    <div className="flex justify-center mt-4 flex-wrap gap-3">
      {dataProducts?.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <CardProduct {...product} />
        </Link>
      ))}
    </div>
  );
}