import { useEffect } from "react"

export const useAsync = (
  setLoading,
  asyncFn,
  successFn,
  errorFn,
  finallyFn,
  returnFn,
  dependencies = []
) => {

  useEffect(() => {
    setLoading(true)

    asyncFn().then((result) => {
        successFn(result.data)
    }).catch((error) => {
        if(errorFn){
          errorFn(error)
        }
    }).finally(() => {
        if(finallyFn){
          finallyFn()
        }
        setLoading(false)
    })

    return () => {
      if(returnFn){
        returnFn()
      }
    }

  }, dependencies)

}