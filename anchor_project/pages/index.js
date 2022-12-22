import Layout from "../components/Layout";
import ProductItems from "../components/ProductItems";
import data from "../utils/data";

export default function Home() {
  return (
    <>
      <Layout title="Home page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product) => (
            <ProductItems product={product} key={product.slug}></ProductItems>
          ))}
        </div>
      </Layout>
      <h2>hellooo oo chal jaaaaaaaaa</h2>
    </>
  );
}
