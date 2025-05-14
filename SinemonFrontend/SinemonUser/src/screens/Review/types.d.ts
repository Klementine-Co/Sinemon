type reviewprops = {
    // pageactions?:JSX.Element
    pageactions?: () => JSX.Element
    ,pageaction?: React.Dispatch<React.SetStateAction<number>>
    ,answerQuestion?: (question: Question, ID: number) => StateAction
    ,commenttype?:string
    ,leaveComment?: React.Dispatch<React.SetStateAction<string|undefined>>
    ,setComment?: (text: string, type: string) => void
    ,review?:Review
    ,setStars?: (type: string, stars: number) => void
    ,dispatch?: ThunkDispatch<UserState, undefined, AnyAction> & Dispatch<any>
  }