import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";


export const usePostFromQueryParams = () => {
   const router = useRouter();
   const postId =
     typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

   return {post: usePostQuery({
     pause: postId === -1,
     variables: {
       id: postId
     }
   }), postId }
 }