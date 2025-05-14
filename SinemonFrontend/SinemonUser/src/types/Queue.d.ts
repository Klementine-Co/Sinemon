
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
   id: number;
   join_date: string;
   leave_date: null | string;
   m_status: string;
   member: Member;
   p_status: string;
   patient_visit: number;
   position: number;
   prov: Provider;
   waited: boolean;
};
type QueueData = {
   mystatus?: String
   , data?: QueueItem;
};

type Queue = {
   queue: QueueAction
   , queuedata: QueueData;
};


type MyVisitStatus = {
   prov: number;
   member: number;
   id: number;
   provider_firstname: string;
   provider_lastname: string;
   visit_date: Date;

};
type QueueStatus = {
   member: number;
   notification: string;
   provider: number;
   queue: QueueItem;
   status: string;
   questions?: Questions;
   myvisit?: MyVisitStatus;

};

// {};