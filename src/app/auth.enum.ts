export enum AuthError
{
  // Amazon
  VERIF_CODE              = 'CodeMismatchException',
  VERIF_USER              = 'UsernameExistsException',
  VERIF_PASS              = 'InvalidPasswordException',
  FORGOT_PASS_VERIF_USER  = 'UserNotFoundException',
  FORGOT_PASS_VERIF_INIT  = 'InvalidParameterException',
  VERIF_LIMIT             = 'LimitExceededException',
  VERIF_AUTHORIZATION     = 'NotAuthorizedException',
}
