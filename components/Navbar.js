import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "../lib/constants";

export default function Navbar({ items }) {
  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-center text-white shadow">
        <div className={`container mx-auto p-3 font-bold`}>
          <Link href={`/`}>
            <a title={SITE_NAME}>
              <Image
                src={`/brand/logo_white.svg`}
                alt={SITE_NAME}
                width={106}
                height={40}
              />
            </a>
          </Link>
        </div>
        <nav
          className={`hidden bg-gradient-to-r from-purple-700 to-indigo-700 xl:block`}
        >
          <ul className="container mx-auto flex flex-wrap justify-center py-2 px-4">
            <li className="m-2">
              <Link href={`/all-games`}>
                <a title={`All Games`}>All</a>
              </Link>
            </li>
            {items.map((category) => (
              <li className="m-2" key={category.slug}>
                <Link href={`/category/${category.slug}`}>
                  <a title={`All ${category.name} Games`}>{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
