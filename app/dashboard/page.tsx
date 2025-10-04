import Image from "next/image";
import avatars from "../avatarlist";
import {
  HomeIcon,
  WorkflowIcon,
  UsersIcon,
  FileIcon,
  GraduationCap,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import { Inter, Roboto } from "next/font/google";
import Link from "next/link";

import DefaultTemplateJPG from "../assets/defaulttemplate.jpg";
import TeamTemplateJPG from "../assets/teamtemplate.jpeg";

const subheadingFont = Inter({
  subsets: ["latin"],
});

const headingFont = Roboto({
  subsets: ["latin"],
});

const projectData = [
  {
    title: "TestApplication1",
    type: "Sunflower Executable",
  },
  {
    title: "TestApplication2",
    type: "Sunflower Executable",
  },
  {
    title: "CppModule1",
    type: "Sunflower Native Module Extension",
  },
  {
    title: "CppModule2",
    type: "Sunflower Native Module Extension",
  },
];

const teamData = [
  {
    name: "Operations #411",
    description: "Create unit tests for Suite64 ARM Emulator",
  },
  {
    name: "Upshift Admin Panel",
    description: "Develop an Admin Panel for Upshift UK's North Division",
  },
  {
    name: "MicroTik OnChip Pipeline",
    description: "Automation Scripts for MicroTik OnChip Pipeline",
  },
];

const activityData = [
  {
    type: "project",
    action: "created",
    target: projectData[0].title,
    description: `You created the project "${projectData[0].title}"`,
    timestamp: "2024-06-10T09:00:00Z",
  },
  {
    type: "team",
    action: "joined",
    target: teamData[0].name,
    description: `You joined the team "${teamData[0].name}"`,
    timestamp: "2024-06-09T15:30:00Z",
  },
  {
    type: "project",
    action: "updated",
    target: projectData[2].title,
    description: `You updated "${projectData[2].title}"`,
    timestamp: "2024-06-08T18:45:00Z",
  },
  {
    type: "team",
    action: "created",
    target: teamData[2].name,
    description: `You created the team "${teamData[2].name}"`,
    timestamp: "2024-06-07T12:10:00Z",
  },
];

function Home() {
  return (
    <div className="p-8 overflow-y-scroll max-h-screen">
      <h1 className={`text-4xl ${headingFont.className}`}>Home</h1>
      <h1 className={`text-2xl mt-8 font-bold ${headingFont.className}`}>
        Recent Projects
        <span className="float-right font-light text-sm underline cursor-pointer">
          View all
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {projectData.map((project, idx) => (
          <div
            key={idx}
            className="flex flex-col overflow-hidden cursor-pointer border border-gray-200 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 group"
          >
            <div
              className="w-full h-44 relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${DefaultTemplateJPG.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-black/30 backdrop-blur-sm rounded-md">
                  {project.type}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col flex-grow p-5">
              <h2
                className={`text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors ${headingFont.className}`}
              >
                {project.title}
              </h2>
              <div className="mt-3 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <p
                  className={`text-sm text-gray-600 ${subheadingFont.className}`}
                >
                  Active Project
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                {/* <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div> */}
                <span className="text-xs text-gray-500">Updated 2d ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className={`text-2xl mt-8 font-bold ${headingFont.className}`}>
        Teams
        <span className="float-right font-light text-sm underline cursor-pointer">
          View all
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {teamData.map((project, idx) => (
          <div
            key={idx}
            className="flex flex-col overflow-hidden cursor-pointer border border-gray-200 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 group"
          >
            <div
              className="w-full h-44 relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${TeamTemplateJPG.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
              <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col flex-grow p-5">
              <h2
                className={`text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors ${headingFont.className}`}
              >
                {project.name}
              </h2>
              <div className="mt-3 flex flex-col">
                <p>{project.description}</p>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p
                    className={`text-sm text-gray-600 ${subheadingFont.className}`}
                  >
                    Active Project
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Updated 2d ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className={`text-2xl mt-8 font-bold ${headingFont.className}`}>
        Activity
        <span className="float-right font-light text-sm underline cursor-pointer">
          View all
        </span>
      </h1>

      <div className="mt-6 space-y-4">
        {activityData.map((activity, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-gray-200"
          >
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "project" ? "bg-blue-50" : "bg-green-50"
                }`}
              >
                {activity.type === "project" ? (
                  <WorkflowIcon className="w-5 h-5 text-blue-600" />
                ) : (
                  <UsersIcon className="w-5 h-5 text-green-600" />
                )}
              </div>
            </div>
            <div className="flex-grow">
              <div className={`font-medium ${headingFont.className}`}>
                {activity.description}
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <svg
                  className="w-3.5 h-3.5 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {new Date(activity.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div
              className={`text-xs font-medium px-2.5 py-1 rounded ${
                activity.action === "created"
                  ? "bg-blue-100 text-blue-800"
                  : activity.action === "joined"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {activity.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-100">
      <div className="grid grid-cols-12 h-full">
        {/* sidenav */}
        <div className="col-span-2 border-2 border-gray-200 p-4 flex flex-col">
          {/* workspace name */}
          <div className="flex">
            <Link
              href={"/"}
              className="font-semibold text-xl text-center w-full"
            >
              SFStudio
            </Link>
          </div>
          {/* end workspace name */}

          {/* menu bar */}
          <div className="mt-16 flex flex-col gap-4">
            <div className="flex gap-4 items-center px-4 py-3 rounded-lg bg-gray-300/60 cursor-pointer">
              <HomeIcon className="w-6 h-6" />
              <h1 className={`${subheadingFont.className}`}>Home</h1>
            </div>

            <div className="flex gap-4 items-center px-4 py-3 rounded-lg cursor-pointer">
              <WorkflowIcon className="w-6 h-6" />
              <h1 className={`${subheadingFont.className}`}>Projects</h1>
            </div>

            <div className="flex gap-4 items-center px-4 py-3 rounded-lg cursor-pointer">
              <UsersIcon className="w-6 h-6" />
              <h1 className={`${subheadingFont.className}`}>Teams</h1>
            </div>

            <div className="flex gap-4 items-center px-4 py-3 rounded-lg cursor-pointer">
              <FileIcon className="w-6 h-6" />
              <h1 className={`${subheadingFont.className}`}>Templates</h1>
            </div>

            <div className="flex gap-4 items-center px-4 py-3 rounded-lg cursor-pointer">
              <GraduationCap className="w-6 h-6" />
              <h1 className={`${subheadingFont.className}`}>Learn</h1>
            </div>
          </div>
          {/* end menu bar */}

          <div className="my-auto"></div>
          <div className="flex gap-4 flex-col justify-center items-center">
            <div className="w-full h-1 bg-gray-300/40 rounded-xl mb-4"></div>
            <div className="flex gap-2 items-center w-full cursor-pointer">
              <PlusIcon className="text-gray-500 h-6 w-6" />
              <h1
                className={`text-gray-700 text-sm ${subheadingFont.className}`}
              >
                Invite Team
              </h1>
            </div>

            <div className="flex gap-2 items-center w-full cursor-pointer">
              <PlusIcon className="text-gray-500 h-6 w-6" />
              <h1
                className={`text-gray-700 text-sm ${subheadingFont.className}`}
              >
                New Project
              </h1>
            </div>
          </div>
        </div>
        {/* end sidenav */}

        {/* main */}
        <div className="col-span-10">
          <Home />
        </div>
        {/* end main */}
      </div>
    </div>
  );
}
