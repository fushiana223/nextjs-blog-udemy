import Layout, { siteTitle } from "../components/Layout"
import styles from "../styles/Home.module.css"
import utilStyle from "../styles/utils.module.css"
import Link from 'next/link'
import { getPostsData } from "../lib/post"
import Head from "next/head"


// SSG(静的生成)の場合
export async function getStaticProps() {
  const allPostsData = getPostsData()
  // console.log(allPostsData)
  // nextjsの記法
  return {
    props: {
      allPostsData,
    }
  }
}

// SSRの場合(今回は使用しない)
// @ts-ignore
// export async function getServerSideProps(context) {
//   const fetchData = getPostsData()
//   return {
//     props: {
//       fetchData
//     }
//   }

// }

// @ts-ignore
export default function Home({ allPostsData }): JSX.Element {
  return (
    <Layout home>
      <Head ><title>{siteTitle}</title></Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はアプリケーションエンジニアです。ORCのengineeringチームに所属しています。
        </p>
      </section>
      <h2>Fushianaのブログ</h2>
      <div className={styles.grid}>
        {/* @ts-ignore */}
        {allPostsData.map(({ id, title, date, thumbnail }) =>
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} className={styles.thumbnailImage} alt='' />
            </Link>
            <Link href={`/posts/${id}`} legacyBehavior>
              <a className={utilStyle.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyle.lightText}>{date}</small>
          </article>)}
      </div>
    </Layout>
  )
}
