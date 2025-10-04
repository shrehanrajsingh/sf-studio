import { Inter, Roboto_Slab } from "next/font/google";
import Image from "next/image";
import avatars from "./avatarlist";

const headingFont = Roboto_Slab({
  subsets: ["latin"],
});

const subheadingFont = Inter({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-3xl flex flex-col justify-center items-center">
        <h1 className={`text-4xl font-bold ${headingFont.className}`}>
          Welcome to{" "}
          <span className="font-extrabold bg-gradient-to-b from-indigo-600/60 to-blue-600/90 text-transparent bg-clip-text">
            SFStudio
          </span>
        </h1>

        <div className="w-1/2 mt-8">
          <h1 className={`${subheadingFont.className} font-light text-center`}>
            Join Workspace
          </h1>

          {/* single user */}
          <div className="flex flex-col gap-4 mt-4 border p-4 rounded-xl border-indigo-400 bg-gradient-to-tr from-indigo-600/20 to-blue-600/30 cursor-pointer hover:to-blue-600/40">
            <div className="flex gap-12">
              <Image
                src={avatars[0].image}
                width={100}
                height={100}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />

              <div className="flex flex-col">
                <h1 className="font-bold">{avatars[0].username}</h1>
                <h1 className="font-light italic text-sm">
                  Last Online: 4 hours ago
                </h1>
              </div>
            </div>
          </div>

          {/* group */}
          <div className="flex flex-col gap-4 mt-4 border p-4 rounded-xl border-indigo-400 bg-gradient-to-tr from-indigo-600/20 to-blue-600/30 cursor-pointer hover:to-blue-600/40">
            <div className="flex gap-12">
              <div className="flex relative">
                <Image
                  src={avatars[0].image}
                  width={100}
                  height={100}
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />

                <Image
                  src={avatars[1].image}
                  width={100}
                  height={100}
                  alt="avatar"
                  className="w-12 h-12 rounded-full absolute left-4"
                />

                <Image
                  src={avatars[2].image}
                  width={100}
                  height={100}
                  alt="avatar"
                  className="w-12 h-12 rounded-full absolute left-8"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="font-bold">Operations #252</h1>
                <h1 className="font-bold italic text-sm text-emerald-700">
                  Online
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
