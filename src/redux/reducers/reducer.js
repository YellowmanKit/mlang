export function updateElements(originals, newElements){
  var updatedArray = originals.slice(0);
  for(var i=0;i<newElements.length;i++){
    for(var j=0;j<updatedArray.length;j++){
      if(updatedArray[j]._id === newElements[i]._id){
        updatedArray[j] = {...updatedArray[j], ...newElements[i]};
        break;
      }
      if(j === updatedArray.length - 1){
        updatedArray.splice(0,0,newElements[i]);
      }
    }
  }
  if(updatedArray.length === 0){ updatedArray = [...updatedArray, ...newElements]; }
  return updatedArray;
}
