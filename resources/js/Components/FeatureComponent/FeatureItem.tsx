import { Feature } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import FeatureActionDropdown from "./FeatureActionDropdown";
import DOMPurify from "dompurify";
import FeatureUpvoteDownvote from "./FeatureUpvoteDownvote";

const FeatureItem = ({ feature }: { feature: Feature }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [voted, setVoted] = useState(0);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
        {/* Upvote-Downvote */}
        <FeatureUpvoteDownvote feature={feature} />

        <div className="flex-1">
          <h2 className="text-2xl mb-2">
            <Link href={route("feature.show", feature)}>{feature.name}</Link>
          </h2>

          {feature.description && feature.description.length > 200 ? (
            <>
              <div
                className="text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: isExpanded
                    ? DOMPurify.sanitize(feature.description)
                    : `${(DOMPurify.sanitize(feature.description) || "").slice(
                        0,
                        200
                      )}...`,
                }}
              />
              <button
                className="px-2 py-1 rounded-md bg-gray-300 text-zinc-900 mt-3 font-medium"
                onClick={toggleReadMore}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            <div
              className="text-gray-400"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(feature.description),
              }}
            />
          )}
          <div className="mt-5 rounded-lg bg-slate-700 w-[132px]">
            <Link
              href={route("feature.show", feature.id)}
              className="flex items-center justify-between px-3 py-2"
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
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              Comments
            </Link>
          </div>
        </div>

        <FeatureActionDropdown feature={feature} />
      </div>
    </div>
  );
};

export default FeatureItem;
