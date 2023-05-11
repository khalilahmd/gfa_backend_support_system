export enum SupportRequestStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in progress',
    RESOLVED = 'resolved',
}

export class FileDto {
    originalName!: string;
    buffer!: Buffer;
}

export class ConversationDto {
    userType!: string;
    message!: string;
}

export class CreateRequestDto {
    user!: string;
    conversation!: string;
    attachments?: FileDto[];
}
