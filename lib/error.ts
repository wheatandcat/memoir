const CodeDefault = '-1' as const;
// バリデーションエラー
const CodeValidation = '000001' as const;
// 無効な認証
const CodeInvalidAuthorization = '000002' as const;
// Not Found
const CodeNotFound = '000003' as const;
// Already Exists
const CodeAlreadyExists = '000004' as const;
// 自身の招待コード
const CodeMyInviteCode = '000005' as const;
// ユーザー削除時に共有メンバーが存在する
const HasRelationshipByDeleteUser = '000006' as const;

export const errorCode = {
  CodeDefault,
  CodeValidation,
  CodeInvalidAuthorization,
  CodeNotFound,
  CodeAlreadyExists,
  CodeMyInviteCode,
  HasRelationshipByDeleteUser,
};
