import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: 'create-course',
        method: 'POST',
        body: data, 
        credentials: 'include' as const,
      }),
    }),

    getAllCourses: builder.query({
      query:() => ({
        url:"get-all-courses",
        method: 'GET',
        credentials: 'include' as const,

      })
    }),

    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `delete-course/${courseId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
  
    }),

    editCourse: builder.mutation({
      query: ({courseId,data}) => (
        {
        url: `edit-course/${courseId}`,
        method: "PUT",
        body:data,
        credentials: "include" as const,

      }),
    
  
    }),

    getUsersAllCourses: builder.query({
      query: () => ({
        url: `get-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-courses-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addNewQuestion: builder.mutation({
      query:({question, courseId, contentId}) => ({
        url:'add-question',
        body:{
          question, courseId, contentId
        },
        method:"PUT",
        credentials: "include" as const,
      })
    })

  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useEditCourseMutation, useGetUsersAllCoursesQuery, useGetCourseDetailsQuery,useGetCourseContentQuery, useAddNewQuestionMutation} = courseApi;
