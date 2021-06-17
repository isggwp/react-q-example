import styles from "../styles/Home.module.css";
import shortid from "shortid";
import Link from "next/link";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data;
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("getData", getData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function About() {
  const { data: dataArticle, isSuccess } = useQuery("getData", getData);

  return (
    <div className={styles.container}>
      <div>
        <Link href="/">
          <a>
            <u>
              <p>ABOUT PAGE</p>
            </u>
          </a>
        </Link>
      </div>

      <h1>ITS ABOUT PAGE</h1>

      <div>
        {isSuccess &&
          dataArticle.map((x) => (
            <div>
              <div key={shortid.generate()}>
                {x.title} -- {x.id}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
