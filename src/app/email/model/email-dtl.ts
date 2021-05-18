
export class ClsEmailUpload {
    constructor(
        public name: string,
        public email: string) { }
}

export class ClsEmail {
    constructor(
        public emailGroupId: number,
        public name: string,
        public email: string) { }
}

export class ClsContent {
    constructor(
        public contentId: number,
        public emailContent: string,
        public emailFrom: string,
        public emailSubject: string
    ) { }
}

export class ClsContentShort {
    constructor(
        public contentId: number,
        public emailContent: string,
        public emailFrom: string,
        public emailSubject: string,
        public emailContentShort: string) { }
}

export class ClsSaveContent {
    constructor(
        public emailFrom: string,
        public emailSubject: string,
        public emailContent: string) { }
}

export class ClsSendEmailContent {
    constructor(
        public emailGroupId: number,
        public contentId: number) { }
}

export class ClsEmailStatus {
    constructor(
        public groupId: number,
        public recipientId: number,
        public recipientName: string,
        public contentId: number,
        public emailAddr: string,
        public emailStatus: string
    ) { }
}

export class ClsScheduledEmailStatus {
    constructor(
        public groupId: number,
        public recipientId: number,
        public recipientName: string,
        public contentId: number,
        public emailAddr: string,
        public emailStatus: string,
        public scheduledDt: string,
        public processDt: string
    ) { }
}

export class ClsEmailFrom {
    constructor(
        public emailTitle: string,
        public emailFrom: string
    ) { }
}

export class ClsUploadHistory {
    constructor(
        public uploadId: number,
        public totalEmailCount: number,
        public successCount: number,
        public failureCount: number,
        public unsubscribed: number,
        public contentId: number,
        public uploadTime: string,
        public userName: string
    ) { }
}

export class ClsScheduledRpt {
    constructor(
        public uploadId: number,
        public totalEmailCount: number,
        public successCount: number,
        public failureCount: number,
        public yetToSend: number,
        public unsubscribed: number,
        public contentId: number,
    ) { }
}

export class ClsUploadHistorySel {
    constructor(
        public uploadId: number,
        public totalEmailCount: number,
        public successCount: number,
        public failureCount: number,
        public unsubscribed: number,
        public contentId: number,
        public uploadTime: string,
        public userName: string,
        public selected: boolean = false
    ) { }
}

export class ClsUploadId {
    constructor(
        public uploadId: number,
        public userId: string
    ) { }
}
