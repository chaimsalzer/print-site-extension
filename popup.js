let printPageButton = document.getElementById("printPageButton");

printPageButton.onclick = async (e) => {
  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    // console.log("Tab script:");
    // console.log(document.body);
    document.body.style.backgroundColor = "blue";
    return document.body.innerHTML;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript(
    {
      code: "(" + modifyDOM + ")();", //argument here is a string but function.toString() returns function's code
    },
    async (doc) => {
      let results = doc;
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(results, "text/html");
      // console.log("Popup script:");
      const selectors = htmlDoc.querySelectorAll("p, code, img");

      const contents = Array.from(selectors).map((node) => {
        // console.log(node);
        if (node.tagName === "CODE")
          return `<pre><code>${node.innerHTML}</code></pre>`;

        if (node.tagName === "IMG") {
          return `<img width="100px" src="${node.src}">`;
        }

        return `<p>${node.innerText}</p>`;
        if (node.tagName === "CODE") {
          return node;
        }
        return node.innerText;
      });

      // htmlDoc.style.backgroundColor = "blue";

      // console.log(contents);

      // var w = window.open();

      // const elem = document.createElement("div");

      // contents.forEach((c) => {
      //   elem.innerHTML += c;
      // });

      // const body = w.document.documentElement.getElementsByTagName("body")[0];

      // body.appendChild(elem);

      // w.window.print();
      // w.document.close();
    }
  );
};
