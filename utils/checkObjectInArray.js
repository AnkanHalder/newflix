export default function isObjectInArrayById(object, array) {
  try{
    const objectId = object._id.toString(); 
    for (const item of array) {
      const itemId = item._id.toString();  
      if (objectId === itemId) {
        return true;
      }
    }
    return false;  
  }catch(e){
    return false;
  }
}
  