import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import avatar from "../../../public/assests/download5.png";
import { useSelector } from "react-redux";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  //user: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
}: //user,
Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [reviews, setReviews] = useState("");
  const [rating, setRating] = useState(1);
  //const storeUser = useSelector((state: any) => state.user.user);

  // const isReviewExists = data?.reviews?.find(
  //   (item: any) => item.user._id === user._id
  // );

  return (
    <div className="w-[95%] 800px:[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
        //thumnail={data[activeVideo]?.thumnail}
      />
      <div className="w-full flex items-center justify-between my-3">
        {/* Previous Lession Button */}
        <div
          className={`min-h-[40px] px-4 flex items-center justify-center rounded-md transition duration-300
      ${
        activeVideo === 0
          ? "cursor-not-allowed opacity-50 bg-gray-300 text-gray-500"
          : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
      }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Previous Lession
        </div>

        {/* Next Lession Button */}
        <div
          className={`min-h-[40px] px-4 flex items-center justify-center rounded-md transition duration-300
      ${
        data.length - 1 === activeVideo
          ? "cursor-not-allowed opacity-50 bg-gray-300 text-gray-500"
          : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
      }`}
          onClick={() =>
            setActiveVideo(
              data.length - 1 === activeVideo ? activeVideo : activeVideo + 1
            )
          }
        >
          Next Lession
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-semibold">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex gap-16 border-b">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`text-[16px] md:text-[20px] font-medium cursor-pointer transition-colors duration-300 
        ${
          activeBar === index
            ? "text-red-500 border-b-2 border-red-500"
            : "text-gray-600 hover:text-red-500"
        }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
          {data[activeVideo].description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-blue-500 800px:text[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <div className="flex w-full flex-col">
          <div className="flex w-full">
            {/* <Image
        src={storeUser?.avatar?.url || avatar}
        alt="Profile Picture"
        height={4000}
        width={3000}
        className="w-[50px] h-[50px] cursor-pointer border-[2px] border-[#37a39a] rounded-full object-cover"
      /> */}
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder="Enter Your Questions..."
              className="outline-none bg-transparent ml-3 border border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="flex justify-end mt-3">
            <button className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
