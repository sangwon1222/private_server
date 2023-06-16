const elements = [ "fire", "water", "air", "electric", "plant"]

export const shuffle =(ary: any[])=>{
  const backupAry:readonly any[]= ary
  const {length} = backupAry
  for(let i=0;i<length;i++ ){
    const random1 = Math.floor(Math.random()*length)
    const random2 = Math.floor(Math.random()*length)
    const backup1 = backupAry[random1]
    const backup2 = backupAry[random2]
    ary[random1] = backup2
    ary[random2] = backup1
  }
  return ary
}

export const cardSet =(setCount: number)=>{
  const result = []
  for(let i=0; i<setCount;i++){
    for(const element of elements){
      result.push(
        ...Array(10).fill(null).map((_v,i)=>{return {element,attack:i+1,defence:0}})
      )
    }
  }
  return result
}

export const actionCards:readonly any[] = shuffle([
  ...cardSet(4),
  ...Array(10).fill(null).map((_v,i)=>{return {element:'all',attack:0,defence:i+1}}),
])