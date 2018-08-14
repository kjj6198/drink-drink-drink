export default function formDataToJSON(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });

  return obj;
}
