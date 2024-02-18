import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router"
import Link from "next/link";

// SSGの場合（build時に1度だけデータを読み込みにいく）
export async function getStaticProps({params}) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json(); // リクエストの内容をjson形式にする

  return {
    props: {
      product: data,
    }
  }
}

export async function getStaticPaths() {
  const req = await fetch(`http://localhost:3000/products.json`);
  const data = await req.json(); // リクエストの内容をjson形式にする
  const paths = data.map(product => {
    return {
      params: {
        id: product,
      },
    };
  });

  return {
    paths,
    fallback: false,

  }
}

// SSRの場合
// export async function getServerSideProps({params}) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const data = await req.json(); // リクエストの内容をjson形式にする

//   return {
//     props: {
//       product: data,
//     }
//   }
// }

const Product = ({ product }) => {
  // useRouterの場合
  const router = useRouter();
  console.log(router.query.id);
  const { id } = router.query;

  return (
    <div className={styles.container}>
    <main className={styles.main}>
      <h1>{id}のページです</h1> {/* useRouterから取得したid */}
      <img src={product.image} width="300" height="400" alt="Product Image" />
      <p>{product.name}</p>
      <br />
      <Link href="/products">商品一覧へ</Link>
    </main>
  </div>
  )
};

export default Product
