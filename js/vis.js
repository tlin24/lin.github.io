
const NS = "http://www.w3.org/2000/svg";

function el(tag) {
  return document.createElementNS(NS, tag);
}

function setAttrs(node, attrs) {
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
}

const barSvg = document.getElementById("barChart");
const tooltip = document.getElementById("tooltip");

const data = [
  { label: "W1", value: 2 },
  { label: "W2", value: 4 },
  { label: "W3", value: 3 },
  { label: "W4", value: 7 },
  { label: "W5", value: 5 },
];

const W = 760;
const H = 360;
const pad = { top: 55, right: 30, bottom: 55, left: 70 };

function drawBarChart() {
  barSvg.innerHTML = "";

  const bg = el("rect");
  setAttrs(bg, { x: 0, y: 0, width: W, height: H, fill: "white" });
  barSvg.appendChild(bg);

  const title = el("text");
  title.textContent = "Uber Eats Orders for Terry";
  title.setAttribute("font-family", "Simplon Mono, sans-serif");
  title.setAttribute("font-weight", "bold");
  title.setAttribute("letter-spacing", "0.08em");
  setAttrs(title, {
    x: pad.left,
    y: 34,
    "font-size": 18,
    fill: "rgba(0,0,0,0.85)",
  });
  barSvg.appendChild(title);

  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const x0 = pad.left;
  const y0 = pad.top;


  const axis = el("line");
  setAttrs(axis, {
    x1: x0,
    y1: y0 + chartH,
    x2: x0 + chartW,
    y2: y0 + chartH,
    stroke: "rgba(0,0,0,0.22)",
    "stroke-width": 2,
  });
  barSvg.appendChild(axis);

  const maxVal = Math.max(...data.map(d => d.value));
  const gap = 18;
  const barW = (chartW - gap * (data.length - 1)) / data.length;

  data.forEach((d, i) => {
    const barH = (d.value / maxVal) * chartH;
    const x = x0 + i * (barW + gap);
    const y = y0 + (chartH - barH);

    const g = el("g");

    const rect = el("rect");
    setAttrs(rect, {
      x,
      y,
      width: barW,
      height: barH,
      rx: 12,
      fill: "black",
      opacity: 0.82,
    });

    
    const lab = el("text");
    lab.textContent = d.label;
    setAttrs(lab, {
      x: x + barW / 2,
      y: H - 18,
      "text-anchor": "middle",
      "font-size": 14,
      fill: "rgba(0,0,0,0.7)",
    });

    rect.addEventListener("mousemove", (e) => {
      rect.setAttribute("opacity", "1");
      rect.setAttribute("fill", "#2323FF"); 
      rect.style.transformOrigin = `${x + barW / 2}px ${y0 + chartH}px`;
      rect.style.transform = "scaleY(1.03)";

      tooltip.textContent = `${d.label}: ${d.value}`;
      tooltip.classList.add("is-visible");

      const wrap = barSvg.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - wrap.left}px`;
      tooltip.style.top = `${e.clientY - wrap.top}px`;
    });

    rect.addEventListener("mouseleave", () => {
      rect.setAttribute("opacity", "0.82");
      rect.setAttribute("fill", "black");
      rect.style.transform = "scaleY(1)";

      tooltip.classList.remove("is-visible");
    });

    g.appendChild(rect);
    barSvg.appendChild(g);
    barSvg.appendChild(lab);
  });
}

drawBarChart();

const artSvg = document.getElementById("artSvg");
artSvg.innerHTML = "";

const W2 = 760;
const H2 = 360;

const bg2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
bg2.setAttribute("x", 0);
bg2.setAttribute("y", 0);
bg2.setAttribute("width", W2);
bg2.setAttribute("height", H2);
bg2.setAttribute("fill", "white");
artSvg.appendChild(bg2);

const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", W2 / 2);
circle.setAttribute("cy", H2 / 2);
circle.setAttribute("r", 20);
circle.setAttribute("fill", "none");
circle.setAttribute("stroke", "black");
circle.setAttribute("stroke-width", 2);
circle.setAttribute("opacity", 0.6);
artSvg.appendChild(circle);

let radius = 20;
let opacity = 0.6;

function animateCircle() {
  radius += 0.6;
  opacity -= 0.002;

  if (opacity <= 0) {
    radius = 20;
    opacity = 0.6;
  }

  circle.setAttribute("r", radius);
  circle.setAttribute("opacity", opacity.toFixed(2));

  requestAnimationFrame(animateCircle);
}

animateCircle();