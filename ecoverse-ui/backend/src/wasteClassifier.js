function classifyWaste(fileName, mimeType, sizeBytes) {
  const name = `${fileName || ""} ${mimeType || ""}`.toLowerCase();
  const hazKeywords = ["battery", "chemical", "medical", "paint", "e-waste"];
  const orgKeywords = ["food", "leaf", "garden", "organic", "fruit", "vegetable"];
  const recKeywords = ["plastic", "paper", "glass", "metal", "recycle"];

  let type = "recyclable";
  if (hazKeywords.some((k) => name.includes(k))) {
    type = "hazardous";
  } else if (orgKeywords.some((k) => name.includes(k))) {
    type = "organic";
  } else if (recKeywords.some((k) => name.includes(k))) {
    type = "recyclable";
  } else if (sizeBytes > 1_500_000) {
    type = "hazardous";
  } else if (sizeBytes < 200_000) {
    type = "organic";
  }

  const confidence = type === "hazardous" ? 91 : type === "organic" ? 94 : 89;
  const tipByType = {
    organic: "Compost this waste or place it in the green bin.",
    recyclable: "Place this item in the recyclable (blue) bin after cleaning.",
    hazardous: "Use a designated hazardous waste drop-off. Do not mix with regular waste.",
  };
  return { type, confidence, tip: tipByType[type] };
}

module.exports = { classifyWaste };
