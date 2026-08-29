const units = {
  length: [
    { value: "mm", label: "Millimeter", toBase: 0.001 },
    { value: "cm", label: "Centimeter", toBase: 0.01 },
    { value: "m", label: "Meter", toBase: 1 },
    { value: "km", label: "Kilometer", toBase: 1000 },
    { value: "in", label: "Inch", toBase: 0.0254 },
    { value: "ft", label: "Foot", toBase: 0.3048 },
    { value: "yd", label: "Yard", toBase: 0.9144 },
    { value: "mi", label: "Mile", toBase: 1609.344 },
  ],
  weight: [
    { value: "mg", label: "Milligram", toBase: 0.000001 },
    { value: "g", label: "Gram", toBase: 0.001 },
    { value: "kg", label: "Kilogram", toBase: 1 },
    { value: "oz", label: "Ounce", toBase: 0.0283495 },
    { value: "lb", label: "Pound", toBase: 0.453592 },
  ],
  temperature: [
    { value: "celsius", label: "Celsius" },
    { value: "fahrenheit", label: "Fahrenheit" },
    { value: "kelvin", label: "Kelvin" },
  ],
};

const categorySelect = document.getElementById("category");
const fromSelect = document.getElementById("fromUnit");
const toSelect = document.getElementById("toUnit");
const inputEl = document.getElementById("inputValue");
const convertBtn = document.getElementById("convertBtn");
const resultEl = document.getElementById("result");

function populateUnits() {
  const list = units[categorySelect.value];
  const html = list
    .map((u) => `<option value="${u.value}">${u.label}</option>`)
    .join("");
  fromSelect.innerHTML = html;
  toSelect.innerHTML = html;
  toSelect.selectedIndex = 1;
}

function toBase(value, unit, category) {
  if (category === "temperature") {
    switch (unit) {
      case "celsius":
        return value;
      case "fahrenheit":
        return ((value - 32) * 5) / 9;
      case "kelvin":
        return value - 273.15;
    }
  }
  const factor = units[category].find((u) => u.value === unit).toBase;
  return value * factor;
}

function fromBase(value, unit, category) {
  if (category === "temperature") {
    switch (unit) {
      case "celsius":
        return value;
      case "fahrenheit":
        return (value * 9) / 5 + 32;
      case "kelvin":
        return value + 273.15;
    }
  }
  const factor = units[category].find((u) => u.value === unit).toBase;
  return value / factor;
}

function convert() {
  const value = parseFloat(inputEl.value);
  if (isNaN(value)) {
    resultEl.textContent = "Please enter a valid number";
    return;
  }

  const category = categorySelect.value;
  const from = fromSelect.value;
  const to = toSelect.value;

  const baseValue = toBase(value, from, category);
  const converted = fromBase(baseValue, to, category);

  const fromLabel = fromSelect.options[fromSelect.selectedIndex].text;
  const toLabel = toSelect.options[toSelect.selectedIndex].text;

  resultEl.textContent = `${value} ${fromLabel} = ${converted.toFixed(4)} ${toLabel}`;
}

categorySelect.addEventListener("change", () => {
  populateUnits();
  resultEl.textContent = "";
});

convertBtn.addEventListener("click", convert);

populateUnits();
