import CommentForm from "@/Components/CommentComponent/CommentForm";
import CommentItem from "@/Components/CommentComponent/CommentItem";
import FeatureUpvoteDownvote from "@/Components/FeatureComponent/FeatureUpvoteDownvote";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature } from "@/types";
import { Head, Link } from "@inertiajs/react";
import DOMPurify from "dompurify";

export default function Show({ feature }: { feature: Feature }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {feature.name}
        </h2>
      }
    >
      <Head title={"Features " + feature.name} />

      <div className="flex items-center justify-between">
        <Link
          className="mb-10 flex gap-2 items-center justify-center px-3 py-2 bg-slate-400 hover:bg-slate-500 rounded-lg"
          href={route("feature.index")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <p className="text-xl font-semibold">Back</p>
        </Link>

        <Link
          className="mb-10 flex gap-2 items-center justify-center px-3 py-2 bg-slate-400 hover:bg-slate-500 rounded-lg"
          href={route("feature.edit", feature)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <p className="text-xl font-semibold">Edit Feature</p>
        </Link>
      </div>

      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
          {/* Upvote-Downvote */}
          <FeatureUpvoteDownvote feature={feature} />

          <div className="flex-1">
            {/* <h2 className="text-2xl mb-2">{feature.name}</h2> */}
            <div className="px-10 py-2">
              <div
                className="text-gray-400 text-xl"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(feature.description),
                }}
              />
            </div>

            <div className="w-full h-[1px] bg-gray-700 mt-14" />
            <div className="mt-8">
              <CommentForm feature={feature} />
              {feature.comments &&
                feature.comments.map((comment) => (
                  <CommentItem
                    comment={comment}
                    feature={feature}
                    key={comment.id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
