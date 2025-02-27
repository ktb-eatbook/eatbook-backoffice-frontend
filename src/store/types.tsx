export enum CategoryType {
  ClassicNovel = '고전소설',
  Fantasy = '판타지',
  Romance = '로맨스',
  FairyTale = '동화',
  Mystery = '미스터리',
  Short ='단편소설',
  Long = '장편소설',
}

export enum DisplayType {
  View = 'vies',
  Like = 'like',
  Comment = 'comment',
  Bookmark = 'bookmark'
}

export enum SortFieldType {
  Id = 'ID',
  NickName = 'NICKNAME',
  Email = 'EMAIL',
  CreatedAt = 'CREATED_AT',
}

export enum SortDirectionType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum RoleType {
  Member = 'MEMBER',
  Admin = 'ADMIN',
  PendingAdmin ='PENDING_ADMIN'
}

export enum BookDetailTabType {
  Episodes = 'episodes',
  Comments = 'comments',
}

export enum AuthType {
  Login = 'login',
  Register = 'register',
}

export enum AgeGroupType {
  Teens = 'TEENS',
  Twenties = 'TWENTIES',
  Thirties = 'THIRTIES',
  Forties = 'FORTIES',
  Fifties = 'FIFTIES',
  Sixties = 'SIXTIES',
  Seventies = 'SEVENTIES',
  Eighties = 'EIGHTIES',
  Nineties = 'NINETIES',
}

export enum NotificationTargetType {
  All = 'ALL',
  Specific = 'SPECIFIC',
}

export enum TTSUploadStatusType {
  Pending = 'PENDING',
  Progress = 'STARTING',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
}

export enum ReqNovelReason {
  Pending = '미확인',
  Reviewed = '담당자 확인',
  Confirm = '완료',
  Cancle = '거절',
}

export enum ReqNovelStatus {
  Pending = 'pending',
  Reviewed = 'reviewed',
  Confirm = 'confirm',
  Cancle = 'cancle',
}

export const PROFILE_IMAGE_MAX_SIZE = 2 * 1024 * 1024;