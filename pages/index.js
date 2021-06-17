import { useQuery } from "react-query";
import shortid from "shortid";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  async function getData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    return data;
  }

  const { data: dataArticle, isSuccess } = useQuery("getArticle", getData);

  return (
    <div className={styles.container}>
      <Link href="/about">
        <a>
          <u>
            <p>HOME</p>
          </u>
        </a>
      </Link>

      <h1>ITS INDEX PAGE</h1>

      {isSuccess &&
        dataArticle.map((x) => (
          <div>
            <div key={shortid.generate()}>
              {x.title} -- {x.id}
            </div>
          </div>
        ))}
    </div>
  );
}
