import Head from "next/head";
import Layout from "../components/Layout";
import { GetGames } from "../lib/api";
import { GAMEPIX_API } from "../lib/constants";
import Link from "next/link";
import ListItem from "../components/ListItem";
// import moment from "moment";

export default function Home({ games, categories }) {
  const allGames = games.slice();
  // console.log("games", games);
  return (
    <Layout navItems={categories}>
      <Head>
        <title>TapA.Fun</title>
        <meta name="description" content="Instant play games online for free" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto p-3">
        <h2 className="my-4 hidden text-center text-xl font-bold text-indigo-400 xl:block xl:text-3xl">
          Welcome to TapA.Fun!
        </h2>

        {categories.map((category) => {
          let categoryGames = allGames.filter(
            (game) => game.category == category.name
          );
          return (
            <section key={category.slug}>
              <header className="flex flex-row items-center justify-between">
                <h2 className="my-4 font-bold">
                  {category.name} Games <span>({categoryGames.length})</span>
                </h2>
                <Link href={`/category/${category.slug}`}>
                  <a className="text-xs uppercase" title={`View more`}>
                    View more
                  </a>
                </Link>
              </header>
              <ul className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-8 xl:gap-4">
                {categoryGames.slice(0, 8).map((game) => (
                  <ListItem key={game.id} item={game} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const games = await GetGames(GAMEPIX_API);

  const categories = await GetGames(GAMEPIX_API, `category`);

  return {
    props: {
      games,
      categories,
    },
  };
}
