export const validation = {
    VALIDATION_ERROR: 'Validation Error Occured',
    PASSWORD_LENGTH: 'Max password length is 10 and min is 5',
    CONFIRM_MISSMATCH: 'Password confirmation is incorrect'
}

export const errors = {
    MISSING_HEADER: 'Authrization Header Missing',
    UNAUTH_ACCESS: 'Unauthorized Access'
}

export const user = {
    ALREADY_REGISTERED: 'User is already registered',
    NOT_FOUND: 'User does not exists',
    FOUND: 'User found',
    DELETED: 'User deleted',
    ALREADY_VERIFIED: 'User is verified already',
    WRONG_CODE: 'Wrong verification code',
    RESENT_CODE: 'Code has been send to your email',
    WRONG_PASS: 'Wrong password',
    VERIFIED: 'User is verified successfully',
    LOGIN_SUCCESS: 'User logged in successfully',
    PASSWORD_RESET_SUCCESS: 'Your password has been reset successfully',
    ALREDY_SOCIAL_LOGIN: 'You are already logged in via social account',
    REGISTERED_NOT_VERIFIED: 'You are registered but verification is pending'
}

export const profile = {
    EXCLUDE: ["createdAt", "updatedAt", "user_id"],
    NOT_FOUND: 'User profile not found',
    FOUND: 'User profile found',
    ADDED: 'Details added to user profile',
    DELETED: 'Profile deleted',
    WIGWAG_FOUND: 'Wig-Wag card found',
    WIGWAG_NOT_FOUND: 'Wig-Wag card not found',
    RESTRICTION_ADDED: 'Added to Wig-Wag card',
    WIGWAG_UPDATE: 'wig-wag card updated for restriction'
}

export const _static = {
    EXCLUDE: ["createdAt", "updatedAt"],
    ADDED: "Content added to food restrictions",
    NOT_FOUND: "No content has been added to food restrictions yet",
    FOUND: "content found for food restrictions"
}