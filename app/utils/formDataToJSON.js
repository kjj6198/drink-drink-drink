export default function formDataToJSON(formData, fields = []) {
  const obj = {};
  formData.forEach((value, key) => {
    if (fields.includes(key)) {
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
