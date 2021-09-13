function useGetParams(hash){
    const stringAfterHashtag = hash.substring(1)
    const paramsInUrl = stringAfterHashtag.split("&")
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue)=>{
        const [key,value] = currentValue.split("=")

        accumulater[key] = value
        return accumulater
     },{})
     return paramsSplitUp
}

export default useGetParams