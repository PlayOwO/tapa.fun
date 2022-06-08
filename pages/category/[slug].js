import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import { GetGames } from "../../lib/api";
import { GAMEPIX_API } from "../../lib/constants";
import ListItem from "../../components/ListItem";

export default function Category({ games, categories, currentCategory }) {
  const data = games;
  const total = games.length;
  return (
    <Layout navItems={categories}>
      <Head>
        <title>{currentCategory} games | TapA.Fun</title>
        <meta
          name="description"
          content={`All ${currentCategory} games online for free`}
        />
      </Head>

      <div className="container mx-auto p-3">
        <header className="my-4">
          <div className="text-xs">
            <Link href={`/`}>Home</Link>
            <span className="mx-2">/</span>
            {currentCategory} Games
          </div>
          <h2 className="mt-6 text-lg font-bold">
            {currentCategory} {total > 1 ? `Games` : `Game`}
            <span className="text-sm"> ({total})</span>
          </h2>
        </header>
        <ul className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-8 xl:gap-4">
          {data.map((game) => (
            <ListItem key={game.id} item={game} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const categories = await GetGames(GAMEPIX_API, `category`);

  // const data = await GetGames(GAMEPIX_API);
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
        // slug: game.category.toLowerCase(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const data = await GetGames(GAMEPIX_API);
  let games = data.filter(
    (game) => game.category.toLowerCase() == ctx.params.slug
  );
  const categories = await GetGames(GAMEPIX_API, `category`);
  const currentCategory = games[0].category;

  return {
    props: {
      games,
      categories,
      currentCategory,
    },
  };
};
