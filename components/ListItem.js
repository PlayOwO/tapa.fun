import Link from "next/link";
import Image from "next/image";

export default function ListItem({ item }) {
  const game = item;
  return (
    <li className="flex flex-col justify-between border border-t-4 p-2 shadow-md">
      <Link href={`/game/${game.slug}`}>
        <a title={game.title}>
          <Image
            className="mx-auto block bg-black/5"
            src={game.thumbnailUrl100}
            alt={game.title}
            width={100}
            height={100}
            layout="responsive"
          />
          <h3 className="my-2 font-bold">{game.title}</h3>
        </a>
      </Link>
      {/* <div className="text-xs">{game.slug}</div> */}
      {/* <div className="text-xs">
                        {moment(game.lastUpdate).format("MMM Do, YYYY")}
                      </div> */}
      <div className="flex flex-col space-y-2">
        <Link href={`/category/${game.category.toLowerCase()}`}>
          <a title={game.category}>
            <span className="inline-block origin-left scale-90 bg-black/5 px-1.5 py-0.5 text-xs uppercase">
              {game.category}
            </span>
          </a>
        </Link>
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
        <a
          className="rounded bg-gradient-to-r from-green-400 to-cyan-500 p-2 text-center text-white shadow-sm shadow-sky-500/50"
          href={game.url}
          title={game.title}
        >
          Play Now
        </a>
      </div>
    </li>
  );
}
