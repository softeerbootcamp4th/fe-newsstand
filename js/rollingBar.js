export const rollingBar = () => {
  const rolling1 = document.getElementById("rolling1");

  const data = [
    "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출 1",
    "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출 2",
    "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출 3",
    "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출 4",
    "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출 5",
  ];


  rollingText.style.transform = ""; // Reset position
  rollingText.style.transition = "none"; // Disable transition for reset

  // Trigger a reflow to apply the reset styles
  void rollingText.offsetWidth;

  // Apply the rolling effect
  rollingText.style.transition = "transform 10s linear"; // Adjust duration as needed
  rollingText.style.transform = "translateX(-100%)";
}


let i = 0;

  setInterval(() => {
    let [cur, next] = [data[i], data[i + 1]]; 

    const item = document.createElement("li");
    item.textContent = data[i]
    // data.map(it=>item.style.transform = "translateY(-10px)")

  }, 500);
};
