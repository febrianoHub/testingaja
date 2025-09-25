import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";

type HomeCardProps = {
  image: string;
  href: string;
  title: string;
  description: string;
};

const HomeCard = ({ image, href, title, description }: HomeCardProps) => {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl hover:scale-105 transition-all shadow-lg p-4 flex flex-col justify-center items-center"
    >
      <div className="rounded-full md:w-36 md:h-36 sm:w-28 sm:h-28 w-24 h-24 bg-gradient-to-br from-pink-300/85 via-pink-200/70 to-pink-300/85 p-3 flex  justify-center items-center">
        <Image
          height={512}
          width={512}
          alt="iconCard"
          className="w-full"
          src={image}
        />
      </div>
      <h1 className="font-serif mt-2 text-pink-500 text-sm sm:text-xl md:text-3xl">
        {title}
      </h1>
      <p className="font-serif mt-2 text-pink-400 md:text-sm sm:text-xs text-[13px] text-center font-light">
        {description}
      </p>
      <CiHeart className="text-2xl mt-2 text-pink-600" />
    </Link>
  );
};

export default HomeCard;
