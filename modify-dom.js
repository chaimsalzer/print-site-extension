function modifyDOM() {
  function hasHiddenParent(element) {
    if (element.style) {
      const style = window.getComputedStyle(element);
      const display = style.getPropertyValue("display");
      const position = style.getPropertyValue("position");
      const visibility = style.getPropertyValue("visibility");
      const hasForbiddenTag = [
        "HEADER",
        "FOOTER",
        "NAV",
        "FORM",
        "ASIDE",
        "BUTTON",
      ].includes(element.tagName);

      const hasForbiddenClass =
        element.classList.contains("nav") ||
        element.classList.contains("drop-down") ||
        element.classList.contains("popup");
      if (
        hasForbiddenTag ||
        hasForbiddenClass ||
        display == "none" ||
        position == "fixed"
      )
        return element;

      if (element.classList.contains("crayons-header__menu")) {
        console.log(element);
      }
    }

    return element.parentNode && hasHiddenParent(element.parentNode);
  }

  const selectors = document.body.querySelectorAll(
    "p, pre, h1, h2, h3, h4, h5, img, li"
  );

  const contents = Array.from(selectors).map((node) => {
    const parentEl = hasHiddenParent(node);
    if (parentEl) {
      parentEl.remove();
      return null;
    }

    if (node.tagName === "H1")
      return `<h1 style="font-size: 18px; margin: 0">${node.innerText}</h1>`;
    if (node.tagName === "H2") {
      if (node.closest("li")) {
        node.remove();
        return null;
      }
      return `<h2 style="font-size: 16px">${node.innerText}</h2>`;
    }
    if (node.tagName === "H3")
      return `<h3 style="font-size: 15px; margin: 0;">${node.innerText}</h3>`;
    if (node.tagName === "H4")
      return `<h4 style="font-size: 14px; margin: 0;">${node.innerText}</h4>`;
    if (node.tagName === "H5") {
      console.log("h5");
      return `<h5 style="font-size: 13px; margin: 0;">${node.innerText}</h5>`;
    }

    if (node.tagName === "PRE") {
      const code = node.querySelector("code");
      return `<pre 
        style="background-color: unset;
        font-size: 12px;
        border-top: solid 0.5px lightgray;
        padding: 10px;
        border-bottom: solid 0.5px lightgray;
        padding: 10px;
        margin: 10px 0;
        border-radius: 0;
        break-inside: avoid;
        overflow: visible;
        white-space: pre-line;">
        ${code.innerHTML}</pre>`;
    }

    if (node.tagName === "IMG") {
      if (node.closest("li")) return null;
      if (node.width && node.width < 200) return null;
      return `<img style="width: 100%; box-shadow: unset;"  src="${node.src}">`;
    }

    if (node.tagName === "LI") {
      if (!node.innerText || node.querySelector("h2")) {
        node.remove();
        return null;
      }
      return `<li style="font-size: 12px;">${node.innerText}</li>`;
    }

    return `<p style="line-height: 1.5em; 
      overflow: visible;
      font-size: 12px;
      margin: 0;
      padding: 5px 0;
      -webkit-column-break-inside: avoid;
      page-break-inside:avoid;">${node.innerText}</p>`;
  });

  var originalContents = document.body.innerHTML;

  const printContainer = document.createElement("div");
  const printContents = document.createElement("div");

  printContainer.id = "print-this";
  printContents.style.columnCount = 2;
  printContents.style.overflow = "visible";
  printContents.style.backgroundColor = "white";
  printContents.style.color = "black";

  contents
    .filter((c) => c !== null)
    .forEach((c) => {
      printContents.innerHTML += c;
    });

  printContainer.appendChild(printContents);

  printContainer.querySelectorAll("img").forEach((img) => {
    img.style.width = "100%";
    img.style.breakInside = "avoid";
  });

  printContainer.querySelectorAll("*").forEach((img) => {
    img.style.color = "black";
  });

  // printContainer.querySelectorAll("li").forEach((li) => {
  //   li.innerHTML = li.innerText;
  // });

  document.body.innerHTML = printContainer.innerHTML;
  document.body.style.padding = 0;
  document.body.style.top = 0;
  document.querySelector('html').style.backgroundColor = "white"


  window.print();

  // document.body.innerHTML = originalContents;
}

modifyDOM();
