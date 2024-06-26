// revalidar informacion cada 60- segundos para ver las actualizaciones
export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
interface ShopPageProps {
  searchParams: {
    page?: string
  }
}

export default async function ShopPage({searchParams}: ShopPageProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({page});
  if(products.length === 0) redirect("/") // esto regresa never
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2"/>
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </>
  );
}