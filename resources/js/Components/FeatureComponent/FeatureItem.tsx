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
        </div>

        <FeatureActionDropdown feature={feature} />
      </div>
    </div>
  );
};

export default FeatureItem;
