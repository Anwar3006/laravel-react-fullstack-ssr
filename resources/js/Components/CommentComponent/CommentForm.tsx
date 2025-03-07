import { Feature, User } from "@/types";
import React, { FormEventHandler } from "react";
import TextArea from "../TextArea";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";
import { can } from "@/helper";

const CommentForm = ({ feature, user }: { feature: Feature; user: User }) => {
  const { data, setData, post, processing } = useForm({
    comment: "",
  });

  const createComment: FormEventHandler = (ev) => {
    ev.preventDefault();
    post(route("comment.store", feature), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setData("comment", ""),
    });
  };

  if (!can(user, "manage_comments")) {
    return (
      <div className="mb-5">
        {!can(user, "manage_comments") && (
          <p className="text-center text-gray-700">
            You don't have permission to leave comments
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={createComment}
        className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 gap-6 mb-5"
      >
        <TextArea
          row={6}
          value={data.comment}
          onChange={(e) => setData("comment", e.target.value)}
          className="mt-1 block w-full"
          placeholder="Your comment"
        />
        <PrimaryButton disabled={processing}>Comment</PrimaryButton>
      </form>
    </div>
  );
};

export default CommentForm;
