// import CoursePlayer from "@/app/utils/CoursePlayer";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import {
//   AiFillStar,
//   AiOutlineArrowLeft,
//   AiOutlineArrowRight,
//   AiOutlineStar,
// } from "react-icons/ai";
// import avatar from "../../../public/assests/download5.png";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { useAddNewQuestionMutation } from "@/redux/features/courses/coursesApi";

// type Props = {
//   data: any;
//   id: string;
//   activeVideo: number;
//   setActiveVideo: (activeVideo: number) => void;
//   user: any;
//   refetch: any;
// };

// const CourseContentMedia = ({
//   data,
//   id,
//   activeVideo,
//   setActiveVideo,
//   refetch,
//   user,
// }: Props) => {
//   const [activeBar, setActiveBar] = useState(0);
//   const [question, setQuestion] = useState("");
//   const [reviews, setReviews] = useState("");
//   const [rating, setRating] = useState(1);
//   const [answer, setAnswer] = useState("");
//   const [answerId, setAnswerId] = useState("");
//   const [
//     addNewQuestion,
//     { isSuccess, error, isLoading: questionCreationLoading },
//   ] = useAddNewQuestionMutation();

//   const storeUser = useSelector((state: any) => state.user.user);

//   const isReviewExists = data?.reviews?.find(
//     (item: any) => item.user._id === (user?._id || "")
//   );

//   const handleQuestion = () => {
//     if (question.length === 0) {
//       toast.error("Question Can't be empty");
//     } else {
//       addNewQuestion({
//         question,
//         courseId: id,
//         contentId: data[activeVideo]._id,
//       });
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       setQuestion("");
//       refetch();
//       toast.success("Question added succesfully");
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorMessage = error.data as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//   }, [isSuccess, error]);

//   const handleAnswerSubmit = () => {
//     console.log("aaa");
//   };

//   return (
//     <div className="w-[95%] 800px:[86%] py-4 m-auto">
//       <CoursePlayer
//         title={data[activeVideo]?.title}
//         videoUrl={data[activeVideo]?.videoUrl}
//         //thumnail={data[activeVideo]?.thumnail}
//       />
//       <div className="w-full flex items-center justify-between my-3">
//         {/* Previous Lession Button */}
//         <div
//           className={`min-h-[40px] px-4 flex items-center justify-center rounded-md transition duration-300
//       ${
//         activeVideo === 0
//           ? "cursor-not-allowed opacity-50 bg-gray-300 text-gray-500"
//           : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
//       }`}
//           onClick={() =>
//             setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
//           }
//         >
//           <AiOutlineArrowLeft className="mr-2" />
//           Previous Lession
//         </div>

//         {/* Next Lession Button */}
//         <div
//           className={`min-h-[40px] px-4 flex items-center justify-center rounded-md transition duration-300
//       ${
//         data.length - 1 === activeVideo
//           ? "cursor-not-allowed opacity-50 bg-gray-300 text-gray-500"
//           : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
//       }`}
//           onClick={() =>
//             setActiveVideo(
//               data.length - 1 === activeVideo ? activeVideo : activeVideo + 1
//             )
//           }
//         >
//           Next Lession
//           <AiOutlineArrowRight className="ml-2" />
//         </div>
//       </div>
//       <h1 className="pt-2 text-[25px] font-semibold">
//         {data[activeVideo].title}
//       </h1>
//       <br />
//       <div className="w-full p-4 flex gap-16 border-b">
//         {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
//           <h5
//             key={index}
//             className={`text-[16px] md:text-[20px] font-medium cursor-pointer transition-colors duration-300
//         ${
//           activeBar === index
//             ? "text-red-500 border-b-2 border-red-500"
//             : "text-gray-600 hover:text-red-500"
//         }`}
//             onClick={() => setActiveBar(index)}
//           >
//             {text}
//           </h5>
//         ))}
//       </div>
//       <br />
//       {activeBar === 0 && (
//         <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
//           {data[activeVideo].description}
//         </p>
//       )}
//       {activeBar === 1 && (
//         <div>
//           {data[activeVideo]?.links.map((item: any, index: number) => (
//             <div className="mb-5" key={index}>
//               <h2 className="800px:text[20px] 800px:inline-block dark:text-white text-black">
//                 {item.title && item.title + " :"}
//               </h2>
//               <a
//                 className="inline-block text-blue-500 800px:text[20px] 800px:pl-2"
//                 href={item.url}
//               >
//                 {item.url}
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//       {activeBar === 2 && (
//         <>
//           <div className="flex w-full flex-col">
//             <div className="flex w-full">
//               <Image
//                 src={storeUser?.avatar?.url || avatar}
//                 alt="Profile Picture"
//                 height={50}
//                 width={50}
//                 className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
//               />
//               <textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 cols={40}
//                 rows={5}
//                 placeholder="Enter Your Questions..."
//                 className="outline-none bg-transparent ml-3 border border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
//               ></textarea>
//             </div>
//             <div className="flex justify-end mt-3">
//               <button
//                 className={`cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition ${
//                   questionCreationLoading && "cursor-not-allowed"
//                 }`}
//                 onClick={questionCreationLoading ? () => {} : handleQuestion}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//           <br />
//           <br />
//           <div className="w-full h-[1px] bg-[#ffffff3b]">
//             <div>
//               <CommentReply
//                 data={data}
//                 activeVideo={activeVideo}
//                 answer={answer}
//                 setAnswer={setAnswer}
//                 handleAnswerSubmit={handleAnswerSubmit}
//                 user={user}
//                 setAnswerId={setAnswerId}
//               />
//             </div>
//           </div>
//         </>
//       )}
//       {activeBar === 3 && (
//         <div className="w-full">
//           <>
//             {!isReviewExists && (
//               <>
//                 <div className="flex w-full">
//                   <Image
//                     src={storeUser?.avatar?.url || avatar}
//                     alt="Profile Picture"
//                     height={50}
//                     width={50}
//                     className="w-[50px] h-[50px] cursor-pointer rounded-full border-[2px] object-cover"
//                   />
//                   <div className="w-full">
//                     <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black ">
//                       Give a Rating <span className="text-red-500">*</span>
//                     </h5>
//                     <div className="flex w-full ml-2 pb-3">
//                       {[1, 2, 3, 4, 5].map((i) =>
//                         rating >= i ? (
//                           <AiFillStar
//                             key={i}
//                             className="mr-1 cursor-pointer"
//                             color="rgb(246,186,0)"
//                             size={25}
//                             onClick={() => setRating(i)}
//                           />
//                         ) : (
//                           <AiOutlineStar
//                             key={i}
//                             className="mr-1 cursor-pointer"
//                             color="rgb(246,186,0)"
//                             size={25}
//                             onClick={() => setRating(i)}
//                           />
//                         )
//                       )}
//                     </div>
//                     <textarea
//                       name=""
//                       value={reviews}
//                       onChange={(e) => setReviews(e.target.value)}
//                       id=""
//                       cols={40}
//                       rows={5}
//                       placeholder="Write your review"
//                       className="outline-none bg-transparent ml-3 border border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end mt-3">
//                   <button className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition">
//                     Submit
//                   </button>
//                 </div>
//               </>
//             )}
//           </>
//         </div>
//       )}
//     </div>
//   );
// };

// const CommentReply = ({
//   data,
//   activeVideo,
//   answer,
//   setAnswer,
//   handleAnswerSubmit,
//   user,
//   setAnswerId,
// }: any) => {
//   return (
//     <>
//       <div className="w-full my-3">
//         {data[activeVideo].questions.map((item: any, index: any) => {
//           <CommentItem
//             key={index}
//             data={data}
//             activeVideo={activeVideo}
//             item={item}
//             index={index}
//             answer={answer}
//             setAnswer={setAnswer}
//             handleAnswerSubmit={handleAnswerSubmit}
//           />;
//         })}
//       </div>
//     </>
//   );
// };

// const CommentItem = ({
//   data,
//   activeVideo,
//   item,
//   answer,
//   setAnswer,
//   handleAnswerSubmit,
// }: any) => {
//   return (
//     <>
//       <div className="my-4">
//         <div className="flex mb-2">
//         <div className="flex w-full">
//               <Image
//                 src={item?.avatar?.url || avatar}
//                 alt="Profile Picture"
//                 height={50}
//                 width={50}
//                 className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
//               /></div>
//           <div className="pl-3">
//             <h5 className="text-[20px]">{item.user.name}</h5>
//             <p>{item.question}</p>
//             <small className="text-[#ffffff83]">
//               {!item.creeatedAt ? "" : item.creeatedAt}
//             </small>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CourseContentMedia;
  // import CoursePlayer from "@/app/utils/CoursePlayer";
  // import Image from "next/image";
  // import React, { useEffect, useState } from "react";
  // import {
  //   AiFillStar,
  //   AiOutlineArrowLeft,
  //   AiOutlineArrowRight,
  //   AiOutlineStar,
  // } from "react-icons/ai";
  // import avatar from "../../../public/assests/download5.png";
  // import { useSelector } from "react-redux";
  // import toast from "react-hot-toast";
  // import { useAddNewQuestionMutation } from "@/redux/features/courses/coursesApi";
  // import { BiMessage } from "react-icons/bi";

  // type Props = {
  //   data: any;
  //   id: string;
  //   activeVideo: number;
  //   setActiveVideo: (activeVideo: number) => void;
  //   user: any;
  //   refetch: any;
  // };

  // const CourseContentMedia = ({
  //   data,
  //   id,
  //   activeVideo,
  //   setActiveVideo,
  //   refetch,
  //   user,
  // }: Props) => {
  //   const [activeBar, setActiveBar] = useState(0);
  //   const [question, setQuestion] = useState("");
  //   const [reviews, setReviews] = useState("");
  //   const [rating, setRating] = useState(1);
  //   const [answer, setAnswer] = useState("");
  //   const [answerId, setAnswerId] = useState("");
  //   const [
  //     addNewQuestion,
  //     { isSuccess, error, isLoading: questionCreationLoading },
  //   ] = useAddNewQuestionMutation();

  //   const storeUser = useSelector((state: any) => state.user.user);

  //   const isReviewExists = data?.reviews?.find(
  //     (item: any) => item.user._id === (user?._id || "")
  //   );

  //   const handleQuestion = () => {
  //     if (question.length === 0) {
  //       toast.error("Question Can't be empty");
  //     } else {
  //       addNewQuestion({
  //         question,
  //         courseId: id,
  //         contentId: data[activeVideo]._id,
  //       });
  //     }
  //   };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       setQuestion("");
  //       refetch();
  //       //toast.success("Question added successfully");
  //       console.log("Refetched data:", data); // Debug refetch
  //     }
  //     if (error) {
  //       if ("data" in error) {
  //         const errorMessage = error.data as any;
  //         toast.error(errorMessage.data.message);
  //       }
  //     }
  //   }, [isSuccess, error, refetch, data]);

  //   const handleAnswerSubmit = () => {
  //     console.log("Answer submitted:", answer); // Placeholder for answer submission logic
  //   };

  //   return (
  //     <div className="w-[95%] 800px:[86%] py-4 m-auto">
  //       <CoursePlayer
  //         title={data[activeVideo]?.title}
  //         videoUrl={data[activeVideo]?.videoUrl}
  //       />
  //       <div className="w-full flex items-center justify-between my-3">
  //         {/* Previous Lesson Button */}
  //         <div
  //           className={`min-h-[40px] px-4 flex items-center justify-center rounded-md transition duration-300
  //       ${
  //         activeVideo === 0
  //           ? "cursor-not-allowed opacity-50 bg-gray-300 text-gray-500"
  //           : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
  //       }`}
  //           onClick={() =>
  //             setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
  //           }
  //         >
  //           <AiOutlineArrowLeft className="mr-2" />
  //           Previous Lesson
  //         </div>

  //         {/* Next Lesson Button */}
  //         <div
  //           className={`min-h-[40px] px-4 flex items-center justify-center rounded-md transition duration-300
  //       ${
  //         data.length - 1 === activeVideo
  //           ? "cursor-not-allowed opacity-50 bg-gray-300 text-gray-500"
  //           : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
  //       }`}
  //           onClick={() =>
  //             setActiveVideo(
  //               data.length - 1 === activeVideo ? activeVideo : activeVideo + 1
  //             )
  //           }
  //         >
  //           Next Lesson
  //           <AiOutlineArrowRight className="ml-2" />
  //         </div>
  //       </div>
  //       <h1 className="pt-2 text-[25px] font-semibold">
  //         {data[activeVideo].title}
  //       </h1>
  //       <br />
  //       <div className="w-full p-4 flex gap-16 border-b">
  //         {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
  //           <h5
  //             key={index}
  //             className={`text-[16px] md:text-[20px] font-medium cursor-pointer transition-colors duration-300 
  //         ${
  //           activeBar === index
  //             ? "text-red-500 border-b-2 border-red-500"
  //             : "text-gray-600 hover:text-red-500"
  //         }`}
  //             onClick={() => setActiveBar(index)}
  //           >
  //             {text}
  //           </h5>
  //         ))}
  //       </div>
  //       <br />
  //       {activeBar === 0 && (
  //         <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
  //           {data[activeVideo].description}
  //         </p>
  //       )}
  //       {activeBar === 1 && (
  //         <div>
  //           {data[activeVideo]?.links.map((item: any, index: number) => (
  //             <div className="mb-5" key={index}>
  //               <h2 className="800px:text[20px] 800px:inline-block dark:text-white text-black">
  //                 {item.title && item.title + " :"}
  //               </h2>
  //               <a
  //                 className="inline-block text-blue-500 800px:text[20px] 800px:pl-2"
  //                 href={item.url}
  //               >
  //                 {item.url}
  //               </a>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //       {activeBar === 2 && (
  //         <>
  //           <div className="flex w-full flex-col">
  //             <div className="flex w-full">
  //               <Image
  //                 src={storeUser?.avatar?.url || avatar}
  //                 alt="Profile Picture"
  //                 height={50}
  //                 width={50}
  //                 className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
  //               />
  //               <textarea
  //                 value={question}
  //                 onChange={(e) => setQuestion(e.target.value)}
  //                 cols={40}
  //                 rows={5}
  //                 placeholder="Enter Your Questions..."
  //                 className="outline-none bg-transparent ml-3 border border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
  //               ></textarea>
  //             </div>
  //             <div className="flex justify-end mt-3">
  //               <button
  //                 className={`cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition ${
  //                   questionCreationLoading && "cursor-not-allowed opacity-50"
  //                 }`}
  //                 onClick={questionCreationLoading ? () => {} : handleQuestion}
  //                 disabled={questionCreationLoading}
  //               >
  //                 Submit
  //               </button>
  //             </div>
  //           </div>
  //           <br />
  //           <br />
  //           <div className="w-full h-[1px] bg-[#ffffff3b]">
  //             <CommentReply
  //               data={data}
  //               activeVideo={activeVideo}
  //               answer={answer}
  //               setAnswer={setAnswer}
  //               handleAnswerSubmit={handleAnswerSubmit}
  //               user={user}
  //               setAnswerId={setAnswerId}
  //             />
  //           </div>
  //         </>
  //       )}
  //       {activeBar === 3 && (
  //         <div className="w-full">
  //           {!isReviewExists && (
  //             <>
  //               <div className="flex w-full">
  //                 <Image
  //                   src={storeUser?.avatar?.url || avatar}
  //                   alt="Profile Picture"
  //                   height={50}
  //                   width={50}
  //                   className="w-[50px] h-[50px] cursor-pointer rounded-full border-[2px] object-cover"
  //                 />
  //                 <div className="w-full">
  //                   <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
  //                     Give a Rating <span className="text-red-500">*</span>
  //                   </h5>
  //                   <div className="flex w-full ml-2 pb-3">
  //                     {[1, 2, 3, 4, 5].map((i) =>
  //                       rating >= i ? (
  //                         <AiFillStar
  //                           key={i}
  //                           className="mr-1 cursor-pointer"
  //                           color="rgb(246,186,0)"
  //                           size={25}
  //                           onClick={() => setRating(i)}
  //                         />
  //                       ) : (
  //                         <AiOutlineStar
  //                           key={i}
  //                           className="mr-1 cursor-pointer"
  //                           color="rgb(246,186,0)"
  //                           size={25}
  //                           onClick={() => setRating(i)}
  //                         />
  //                       )
  //                     )}
  //                   </div>
  //                   <textarea
  //                     value={reviews}
  //                     onChange={(e) => setReviews(e.target.value)}
  //                     cols={40}
  //                     rows={5}
  //                     placeholder="Write your review"
  //                     className="outline-none bg-transparent ml-3 border border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
  //                   />
  //                 </div>
  //               </div>
  //               <div className="flex justify-end mt-3">
  //                 <button className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition">
  //                   Submit
  //                 </button>
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  // const CommentReply = ({
  //   data,
  //   activeVideo,
  //   answer,
  //   setAnswer,
  //   handleAnswerSubmit,
  //   user,
  //   setAnswerId,
  // }: any) => {
  //   return (
  //     <div className="w-full my-3">
  //       {data[activeVideo].questions.length > 0 ? (
  //         data[activeVideo].questions.map((item: any, index: number) => (
  //           <CommentItem
  //             key={index}
  //             data={data}
  //             activeVideo={activeVideo}
  //             item={item}
  //             answer={answer}
  //             setAnswer={setAnswer}
  //             handleAnswerSubmit={handleAnswerSubmit}
  //           />
  //         ))
  //       ) : (
  //         <p className="text-[18px] text-gray-500">No questions yet.</p>
  //       )}
  //     </div>
  //   );
  // };

  // const CommentItem = ({
  //   data,
  //   activeVideo,
  //   item,
  //   answer,
  //   setAnswer,
  //   handleAnswerSubmit,
  // }: any) => {
  //   const [replyActive, setreplyActive] = useState(false);

  //   return (
  //     <div className="my-4">
  //       <div className="flex mb-2">
  //         <Image
  //           src={item.user?.avatar?.url || avatar}
  //           alt="Profile Picture"
  //           height={50}
  //           width={50}
  //           className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
  //         />
  //         <div className="pl-3">
  //           <h5 className="text-[20px]">{item.user.name}</h5>
  //           <p>{item.question}</p>
  //           {/* <small className="text-[#ffffff83]">
  //             {item.createdAt ? item.createdAt : "Date not available"}
  //           </small> */}
  //         </div>
  //       </div>
  //       <div className="w-full flex">
  //         <span
  //           className="800px:pl-16 text-black dark:text-[#ffffff83] mr-2 cursor-pointer "
  //           onClick={() => setreplyActive(!replyActive)}
  //         >
  //           {!replyActive
  //             ? item.questionReplies.length !== 0
  //               ? "All Replies"
  //               : "Add Replies"
  //             : "Hide Replies"}
  //         </span>
  //         <BiMessage
  //           size={20}
  //           className="mt-[1%] cursor-pointer text-black dark:text-[#ffffff83]"
  //         />
  //         <span className="pl-1 mt-[4px] text-black dark:text-[#ffffff83] cursor-pointer">
  //           {item.questionReplies.length}
  //         </span>
  //       </div>
  //       {replyActive && (
  //         <>
  //           {item.questionReplies.map((item: any) => (
  //             <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
  //               <div>
  //                 <Image
  //                   src={item.user?.avatar?.url || avatar}
  //                   alt="Profile Picture"
  //                   height={50}
  //                   width={50}
  //                   className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
  //                 />
  //               </div>
  //             </div>
  //             <div className="pl-2">
  //                 <h5>
  //                   {item.user.name}
  //                 </h5>
  //                 <p>{item.comment}</p>
  //   <small className="text-[#ffffff83]">
  //             {item.createdAt ? item.createdAt : "Date not available"}
  //           </small>
  //             </div>
  //           ))}
  //         </>
  //       )}
  //     </div>
  //   );
  // };

  // export default CourseContentMedia;
  import CoursePlayer from "@/app/utils/CoursePlayer";
  import Image from "next/image";
  import React, { useEffect, useState } from "react";
  import {
    AiFillStar,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineStar,
  } from "react-icons/ai";
  import avatar from "../../../public/assests/download5.png";
  import { useSelector } from "react-redux";
  import toast from "react-hot-toast";
  import { useAddNewQuestionMutation } from "@/redux/features/courses/coursesApi";
  import { BiMessage } from "react-icons/bi";
  
  type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user: any;
    refetch: any;
  };
  
  const CourseContentMedia = ({
    data,
    id,
    activeVideo,
    setActiveVideo,
    refetch,
    user,
  }: Props) => {
    const [activeBar, setActiveBar] = useState(0);
    const [question, setQuestion] = useState("");
    const [reviews, setReviews] = useState("");
    const [rating, setRating] = useState(1);
    const [answer, setAnswer] = useState("");
    const [answerId, setAnswerId] = useState("");
    const [
      addNewQuestion,
      { isSuccess, error, isLoading: questionCreationLoading },
    ] = useAddNewQuestionMutation();
  
    const storeUser = useSelector((state: any) => state.user.user);
  
    const isReviewExists = data?.reviews?.find(
      (item: any) => item.user._id === (user?._id || "")
    );
  
    const handleQuestion = () => {
      if (question.length === 0) {
        toast.error("Question Can't be empty");
      } else {
        addNewQuestion({
          question,
          courseId: id,
          contentId: data[activeVideo]._id,
        });
      }
    };
  
    useEffect(() => {
      if (isSuccess) {
        setQuestion("");
        refetch();
        toast.success("Question added successfully");
      }
      if (error) {
        if ("data" in error) {
          const errorMessage = error as any;
          toast.error(errorMessage.data.message);
        }
      }
    }, [isSuccess, error, refetch]);
  
    const handleAnswerSubmit = () => {
      console.log("Answer submitted:", answer);
      // Add actual answer submission logic here
    };
  
    return (
      <div className="w-[95%] 800px:[86%] py-4 m-auto">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
        <div className="w-full flex items-center justify-between my-3">
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
            Previous Lesson
          </div>
  
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
            Next Lesson
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
          <>
            <div className="flex w-full flex-col">
              <div className="flex w-full">
                <Image
                  src={storeUser?.avatar?.url || avatar}
                  alt="Profile Picture"
                  height={50}
                  width={50}
                  className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
                />
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
                <button
                  className={`cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition ${
                    questionCreationLoading && "cursor-not-allowed opacity-50"
                  }`}
                  onClick={questionCreationLoading ? () => {} : handleQuestion}
                  disabled={questionCreationLoading}
                >
                  Submit
                </button>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]" />
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setAnswerId={setAnswerId}
            />
          </>
        )}
        {activeBar === 3 && (
          <div className="w-full">
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={storeUser?.avatar?.url || avatar}
                    alt="Profile Picture"
                    height={50}
                    width={50}
                    className="w-[50px] h-[50px] cursor-pointer rounded-full border-[2px] object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      value={reviews}
                      onChange={(e) => setReviews(e.target.value)}
                      cols={40}
                      rows={5}
                      placeholder="Write your review"
                      className="outline-none bg-transparent ml-3 border border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <button className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition">
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };
  
  const CommentReply = ({
    data,
    activeVideo,
    answer,
    setAnswer,
    handleAnswerSubmit,
    user,
    setAnswerId,
  }: any) => {
    return (
      <div className="w-full my-3">
        {data[activeVideo].questions.length > 0 ? (
          data[activeVideo].questions.map((item: any, index: number) => (
            <CommentItem
              key={index}
              data={data}
              activeVideo={activeVideo}
              item={item}
              index={index}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setAnswerId={setAnswerId}
            />
          ))
        ) : (
          <p className="text-[18px] text-gray-500">No questions yet.</p>
        )}
      </div>
    );
  };
  
  const CommentItem = ({
    data,
    activeVideo,
    item,
    index,
    answer,
    setAnswer,
    handleAnswerSubmit,
    user,
    setAnswerId,
  }: any) => {
    const [replyActive, setReplyActive] = useState(false);
  
    return (
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={item.user?.avatar?.url || avatar}
            alt="Profile Picture"
            height={50}
            width={50}
            className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
          />
          <div className="pl-3">
            <h5 className="text-[20px]">{item.user.name}</h5>
            <p>{item.question}</p>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] mr-2 cursor-pointer"
            onClick={() => setReplyActive(!replyActive)}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="mt-[1%] cursor-pointer text-black dark:text-[#ffffff83]"
          />
          <span className="pl-1 mt-[4px] text-black dark:text-[#ffffff83] cursor-pointer">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((reply: any, replyIndex: number) => (
              <div
                key={replyIndex}
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
              >
                <Image
                  src={reply.user?.avatar?.url || avatar}
                  alt="Profile Picture"
                  height={50}
                  width={50}
                  className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
                />
                <div className="pl-2">
                  <h5>{reply.user.name}</h5>
                  <p>{reply.comment}</p>
                  <small className="text-[#ffffff83]">
                    {reply.createdAt ? reply.createdAt : "Date not available"}
                  </small>
                </div>
              </div>
            ))}
            <div className="w-full flex 800px:ml-16">
              <Image
                src={user?.avatar?.url || avatar}
                alt="Profile Picture"
                height={50}
                width={50}
                className="w-[50px] h-[50px] cursor-pointer border-[2px] rounded-full object-cover"
              />
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your reply..."
                className="outline-none bg-transparent ml-3 border border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
              />
              <button
                className="ml-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition"
                onClick={() => {
                  setAnswerId(item._id);
                  handleAnswerSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default CourseContentMedia;