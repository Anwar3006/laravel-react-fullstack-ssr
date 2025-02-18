<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageFeatures = 'manage_feature';
    case ManageUsers = 'manage_users';
    case ManageComments = 'manage_comments';
    case UpvoteDownvote = 'upvote_downvote';
}
