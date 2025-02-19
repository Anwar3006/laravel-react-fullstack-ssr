import { Feature } from "@/types";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import FeatureActionDropdown from "./FeatureActionDropdown";
import DOMPurify from "dompurify";

const FeatureItem = ({ feature }: { feature: Feature }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
        {/* Upvote-Downvote */}
        <div className="flex flex-col items-center">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>

          <span className="text-2xl font-semibold">12</span>

          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>

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
        </div>

        <FeatureActionDropdown feature={feature} />
      </div>
    </div>
  );
};

export default FeatureItem;
