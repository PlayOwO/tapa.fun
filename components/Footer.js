import Image from "next/image";
import { SITE_NAME } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-r from-purple-700 to-indigo-700 text-indigo-200">
      <div className="container mx-auto flex flex-col p-4 text-xs leading-5 xl:flex-row-reverse xl:justify-between">
        {/* <Image src={``} alt={``} width={100} height={40} /> */}
        <ul className="flex gap-2">
          <li>
            <a href="">Privacy Policy</a>
          </li>
          <li>
            <a href="">Terms of Use</a>
          </li>
        </ul>
        <div className="flex text-purple-300">
          <div className={`mb-2`}>
            Copyright &copy; {new Date().getFullYear()} {SITE_NAME}
            <br />
            All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
