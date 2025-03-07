"use client";
import CourseAccessContent from "@/app/components/Course/CourseAccessContent";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { use, useEffect } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find((item:any) => item._id === id);
      if (!isPurchased) {
        redirect("/")
      }
      if (error) {
        redirect("/")
      }
    }
  }, [data,error])

  return (
    <>
      <div>
        <CourseAccessContent id={id}/>
      </div>
    </>
  );
};

export default Page;
