(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    //      displayDiv.style.bottom = '20px';
    //      displayDiv.style.left = '20px';
    //      displayDiv.style.transform = 'translateX(-50%)';
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    tooltip.style.color = "white";
    tooltip.style.padding = "4px 8px";
    tooltip.style.borderRadius = "8px";
    tooltip.style.fontSize = "24px";
    tooltip.style.fontFamily = "'Courier New',monospace,ui-monospace";
    tooltip.style.zIndex = "9999";
    tooltip.style.display = "none";
    tooltip.style.pointerEvents = "none";
    document.body.appendChild(tooltip);

    let cmdKeyDown = false;

    document.addEventListener("keydown", function (e) {
      if (e.metaKey) {
        cmdKeyDown = true;
      }
    });

    document.addEventListener("keyup", function (e) {
      cmdKeyDown = false;
      tooltip.style.display = "none";
    });

    document.addEventListener("mouseover", function (e) {
      if (!cmdKeyDown) {
        return;
      }

      const link = e.target.closest("a");
      let href = link?.href;
      if (!href) {
        return;
      }
      if (href.startsWith("http://")) {
        href = href.substring("http://".length);
      }
      const rect = link.getBoundingClientRect();
      tooltip.style.left = `${rect.left}px`;
      tooltip.style.top = `${rect.top + window.scrollY + 30}px`;
      //        displayDiv.style.transform = 'translateX(-50%)';
      tooltip.style.display = "block";
      tooltip.textContent = href;
      tooltip.style.display = "block";
    });

    document.addEventListener("mouseout", function (e) {
      const link = e.target.closest("a");
      if (link) {
        tooltip.style.display = "none";
      }
    });
  });
})();
