export interface NovelDetailData {
    id: string;
    title: string;
    authorList: string[];
    categoryList: string[];
    coverImageUrl: string;
    summary: string;
    publicationYear: number;
    isCompleted: boolean;
    views: number;
    likes: number;
}

export interface SearchNovelData {
    id: string;
    title: string;
    authorList: string[];
    categoryList: string[];
    coverImageUrl: string;
}

export interface EpisodeData {
    id: string;
    chapter: number;
    title: string;
}

export interface EpisodeDetailData {
    id: string;
    title: string;
    chapter: number;
    releaseDate? : string | null;
    scheduledDate?: string | null,
    releaseStatus: string;
    novelId: string;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CommentData {
    id: string;
    episodeNumber: number;
    title: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}