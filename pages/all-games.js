import { useMemo, useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { GetGames } from "../lib/api";
import { GAMEPIX_API } from "../lib/constants";
import Link from "next/link";
import ListItem from "../components/ListItem";
// import moment from "moment";

export default function Home({ games, categories }) {
  const initGames = games.slice(0, 16);
  const total = games.length;

  const [gameData, setGameData] = useState(initGames);
  const [hasMore, setHasMore] = useState(true);

  const data = useMemo(() => gameData, [gameData]);

  const getMoreGames = () => {
    const nextGames = games.slice(gameData.length, gameData.length + 16);
    setGameData((game) => [...game, ...nextGames]);
    gameData.length >= total ? setHasMore(!hasMore) : setHasMore(hasMore);
  };
  // console.log("games", games);
  return (
    <Layout navItems={categories}>
      <Head>
        <title>TapA.Fun</title>
        <meta name="description" content="Instant play games online for free" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto p-3">
        <section>
          <header className="my-4">
            <div className="text-xs">
              <Link href={`/`}>Home</Link>
              <span className="mx-2">/</span>
              All Games
            </div>
            <h2 className="mt-6 text-lg font-bold">
              All Games <span className="text-sm">({total})</span>
            </h2>
          </header>
          <ul className="grid grid-cols-2 gap-4 xl:grid-cols-8 xl:gap-4">
            {data.map((game) => (
              <ListItem key={game.id} item={game} />
            ))}
          </ul>
          {hasMore ? (
            <div className="flex justify-center">
              <button
                className="my-6 inline-block w-full cursor-pointer border bg-white py-3 px-9 shadow-md"
                onClick={getMoreGames}
              >
                Load More
              </button>
            </div>
          ) : null}
        </section>
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
