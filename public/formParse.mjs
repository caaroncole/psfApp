export default function parseFormData(formDataRaw) {
  console.log("Parse Form Data Begin");

    const validationSchema = {
      partName: {
        type: "string",
        maxLength: 20
      },
      description: {
        type: "string",
        maxLength: 60
      },
      width: {
        type: "number",
        minValue: 0,
        maxValue: 999
      },
      length: {
        type: "number",
        minValue: 0,
        maxValue: 9999
      },
      diameter: {
        type: "float",
        minValue: 0,
        maxValue: 10,
        
      }
    };
const formData = {};
    for (const [key, value] of formDataRaw.entries()) {
      formData[key] = value;
    }
    for (const key in validationSchema) {
      
      if (validationSchema[key].type === "string") {
        if (typeof formData[key] === "string" && isNaN(formData[key]) && formData[key].length < validationSchema[key].maxLength) {
          console.log("string check, pass", key);
        } else {
          console.log(formData[key], "Datatype error");
          return false;
        }
        
      } 
      // check numbers
      if (validationSchema[key].type === "number") {
        if (isNaN(formData[key]) || formData[key] < validationSchema[key].minValue || formData[key] > validationSchema[key].maxValue) {
          console.log(formData[key], "Datatype/Range error");
          return false;
        } else {
          console.log("number check, pass", key);
        } 
      }
    }
    console.log("Parse Form Data Complete");
    return true;
  }

