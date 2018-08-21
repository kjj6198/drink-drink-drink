export default function formDataToJSON(formData, intFields = []) {
  const obj = {};
  formData.forEach((value, key) => {
    if (intFields.includes(key)) {
      const val = parseFloat(value, 10);

      if (val) {
        obj[key] = val;
        return;
      }
    }

    obj[key] = value;
  });

  return obj;
}
