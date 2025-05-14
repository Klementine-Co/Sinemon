
type QueueAction = {
   method?: string
   , provider: number
   , member?: number
   , from: string
   , arrived?: boolean
   , done?: boolean;
};


type QueueItem = {
   est_wait_time: number;
   join_date: string;
   leave_date: null | string;
   m_status: string;
   member: Member;
   p_status: string;
   position: number;
   prov: number;
};

type QueueData = {
   status?: string
   , queueitem?: QueueItem
   , queueS?: QueueItem[]
   , queueA?: QueueItem[]
   , queueW?: QueueItem[]
   , queueB?: QueueItem[]
   , queueI?: QueueItem[];
};

type Queue = {
   queue: QueueAction
   , queuedata: QueueData;

};


