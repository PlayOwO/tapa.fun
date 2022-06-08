import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import { GetGames } from "../../lib/api";
import { GAMEPIX_API } from "../../lib/constants";
import moment from "moment";
import ListItem from "../../components/ListItem";

export default function Game({ game, categories, similarGames }) {
  return (
    <Layout navItems={categories}>
      <Head>
        <title>{game.title} | TapA.Fun</title>
        <meta
          name="description"
          content={`Play ${game.title} online for free`}
        />
      </Head>

      <div className="container mx-auto p-3">
        <div className="my-4">
          <div className="text-xs">
            <Link href={`/`}>Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${game.category.toLowerCase()}`}>
              {game.category}
            </Link>
            {/* <span className="mx-2">/</span>
            <span className="text-slate-400">{game.title}</span> */}
          </div>
        </div>

        <div className="mt-2 flex flex-col space-y-4 xl:flex-row-reverse xl:justify-between">
          <div className="relative h-24 w-24 xl:h-60 xl:w-60">
            <Image
              className="mx-auto block bg-black/5 xl:order-2"
              src={game.thumbnailUrl}
              alt={game.title}
              layout="fill"
            />
          </div>
          <div className="flex flex-col gap-2 xl:order-1 xl:gap-4">
            <h1 className="my-2 text-2xl font-bold xl:text-5xl">
              {game.title}
            </h1>

            {/* <div className="text-xs">{game.slug}</div> */}

            <div className="flex items-center space-x-1">
              <Link href={`/category/${game.category.toLowerCase()}`}>
                <a title={game.category}>
                  <span className="inline-block origin-left scale-90 bg-black/5 px-1.5 py-0.5 text-xs uppercase">
                    {game.category}
                  </span>
                </a>
              </Link>
              <span className="text-xs text-slate-500">Contains ads</span>
            </div>

            <div className="flex font-bold">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              <span>{game.rkScore}</span>
            </div>
            <div className="text-xs">
              Updated on: {moment(game.lastUpdate).format("MMM Do, YYYY")}
            </div>
            <a
              className="my-4 rounded bg-sky-500 p-2 text-center text-white shadow-sm shadow-sky-500/50 xl:w-48"
              href={game.url}
              title={game.title}
            >
              Play Now
            </a>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-4 xl:flex-row xl:gap-10">
          <div className="grow rounded border-2 bg-slate-100 p-4 xl:w-5/6">
            <h3 className="mb-2 text-lg">About this game</h3>
            <div className="mt-2 border-t-2 py-2 text-slate-600">
              {game.description}
            </div>
          </div>
          <div className="xl:w-1/6">
            <h3 className="mb-2 text-lg">Similar games</h3>
            <ul className="grid grid-cols-3 gap-4 xl:grid-cols-2">
              {similarGames.map((game) => (
                <li className="relative" key={game.id}>
                  <Link href={`/game/${game.slug}`}>
                    <a title={game.title}>
                      <Image
                        src={game.thumbnailUrl}
                        alt={game.title}
                        width={96}
                        height={96}
                        layout="responsive"
                      />
                    </a>
                  </Link>
                  <h3 className="my-2 text-xs">{game.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const games = await GetGames(GAMEPIX_API);
  return {
    paths: games.map((game) => ({
      params: {
        slug: game.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const data = await GetGames(GAMEPIX_API, `full`);
  let game = data.find((game) => game.slug == ctx.params.slug);
  const currentCategory = game.category;
  const similarGames = data
    .filter((g) => g.category == currentCategory && g.id !== game.id)
    .slice(0, 4);

  const categories = await GetGames(GAMEPIX_API, `category`);

  return {
    props: {
      game,
      categories,
      similarGames,
    },
  };
};
