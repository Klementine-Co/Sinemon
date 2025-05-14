

type Rate = {
    type: string
    , rating: number;
};

type Question = {
    answer?: string
    , question: string
    , id: number;
};
type Questions = Question[];

type Review_Rating = {
    id: any;
    color: string;
    rating: any;
    review: any;
};

type VisitComment = {
    comment: string,
    comment_type: string;
};

type Review = {
    staff_stars: number
    , bedside_stars: number
    , office_stars: number
    , dr_stars: number
    , rating: number
    , questions: Questions
    , comment?: VisitComment;
};


type MyVisit = {
    prov: number
    , member: number
    , id: number
    , provider_firstname: string
    , provider_lastname: string
    , visit_date: Date
    , review: Review
    , reviewed?: boolean;

};


// {};