import React, { useEffect } from 'react';

const GaugeChart = () => {
  const GaugeChart_SetPercent = (el, _perc) => {
    el.dataset.percent = _perc;
    console.log(el.querySelector(".text"));
  };

  const GaugeChart_BehaviorInit = () => {
    document.querySelectorAll(".gauge-box").forEach(function (el, index) {
      GaugeChart_Animate(el);
      return;
    });
  };

  const GaugeChart_Animate = (el) => {
    var pointer = el.querySelector(".pointer");

    if (!pointer) return;

    console.log("OK");
    var percent_deg = 1.8;
    if (el.dataset.percent) {
      var _perc = parseInt(el.dataset.percent);
      var _percFrom = 0;
      var percent_deg_style = _perc * percent_deg - 90;
      if (percent_deg_style < -90) percent_deg_style = -90;
      if (percent_deg_style > 90) percent_deg_style = 90;

      pointer.style.transform = "rotateZ(-90deg)";

      var indicator_index;

      for (var i = 0; i < 7; i++) {
        var piece_percent = 100 / 8;
        if (CheckBetween(_perc, piece_percent * i, piece_percent * (i + 1))) {
          indicator_index = i + 1;
          console.log(indicator_index + 1);
          break;
        }
      }

      var piece_sel = el.querySelector(".p-" + indicator_index);
      if (piece_sel) {
        piece_sel.classList.add("selected");
      }

      setInterval(function () {
        pointer.style.transform = "rotateZ(" + percent_deg_style + "deg)";
        if (_perc >= 87.5) {
          el.querySelector(".flame-gauge").classList.add("active");
        } else {
          el.querySelector(".flame-gauge").classList.remove("active");
        }
      }, 100);
    }
  };

  const CheckBetween = (num, min, max) => {
    if (num >= min && num < max) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    GaugeChart_BehaviorInit();
  }, []);

  return (
    <div style={{ position: 'absolute', maxWidth: '80%', top: '50%', left: '50%', width: '300px', transform: 'translate(-50%, -50%)', boxShadow: '0px 5px 20px rgba(0,0,0,0.2)', padding: '20px', borderRadius: '5px' }}>
      <div className="gauge-box" data-percent='88'>
        <svg version="1.1" style={{ maxHeight: '100%', maxWidth: '100%' }} className="gauge-meter-chart" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
          y="0px" viewBox="0 0 100 51" style={{ enableBackground: 'new 0 0 100 51' }} xmlSpace="preserve">
          <g className="meter">
            <path className="p1" fill="#EA0000" d="M4.1,31C2.6,34.6,1.6,38.5,1,42.4C0.5,45.9,3.2,49,6.7,49h0c2.8,0,5.3-2,5.7-4.8c0.4-3,1.2-6,2.3-8.7L4.1,31z"/>
            {/* Rest of the paths... */}
          </g>
          <path className="pointer" d="M51,47.3V18l1.7,0L50,13.1L47.3,18H49l0,29.3c-0.6,0.3-1,1-1,1.7c0,1.1,0.9,2,2,2s2-0.9,2-2C52,48.3,51.6,47.6,51,47.3z"/>
          <g className="flame-gauge" style={{ opacity: 0, transition: 'all 2s' }}>
            <g className="flame">
              <path className="flame-orange" fill="#FF7B00" d="M89.9,31.3c-0.8,2.1-1.8,4-2.4,6.1s-0.8,4.4,0,6.5c0.5,1.3,1.4,2.4,2.5,3.2c1.1,0.8,2.5,1.2,3.8,1.1c1.3-0.1,2.7-0.8,3.5-1.9c0.6-0.9,0.9-2,0.8-3.1c-0.1-1.1-0.4-2.2-0.9-3.1c-0.6-1.1-1.4-2.2-1.5-3.5c0-0.8,0.3-1.6,0.4-2.4c0.2-0.8,0.2-1.7-0.3-2.4c0.2,1.5-0.2,3.1-1.1,4.3c0.3-0.3,0-0.9-0.3-1.1c-0.3-0.3-0.7-0.5-1-0.9c-0.4-0.5-0.2-1.3,0-1.8c0.3-0.6,0.6-1.1,0.8-1.8c0.2-1-0.2-2-0.9-2.6c0.4,0.8,0.1,1.8-0.4,2.5c-0.5,0.8-1.1,1.4-1.3,2.3c-0.4-2.1,1.3-4.1,1-6.2c-0.1-1-0.9-2.1-1.8-2.5c0.1,0.5,0.3,0.9,0.4,1.4c0.1,0.6,0,1.4-0.1,2C90.9,28.7,90.4,30,89.9,31.3z"/>
              <path className="flame-yellow" fill="#FFDD00" d="M90.5,44.6c0.9,0.4,2.1,0.1,2.5-0.7s0-1.9-0.9-2.3c-0.3-0.1-0.6-0.2-0.9-0.3c-0.9-0.4-1.4-1.3-1.4-2.3c0-0.9,0.3-1.8,0.7-2.7c0.4-0.9,0.8-1.7,0.9-2.6c-0.4,1.6,0.1,3.3,1.3,4.5c0-0.4,0-0.7,0-1.1c0.8,0.7,1.6,1.5,2.3,2.3c0.7,0.9,1.2,1.8,1.4,2.9c0.2,1.3-0.1,2.8-1.2,3.7c-0.8,0.7-1.9,1-2.9,0.9c-1-0.1-2-0.7-2.5-1.6c-0.5-0.8-0.5-1.6-0.2-2.4C89.5,43.5,89.8,44.2,90.5,44.6z"/>
            </g>
            <path className="f-p3" fill="#FF7B00" d="M98,33c0.1-0.2,0.3-0.3,0.4-0.5c0.2-0.4,0.3-0.9,0-1.3c0.4,0.4,0.6,1,0.6,1.6c0,0.3,0,0.6-0.2,0.8c-0.1,0.2-0.5,0.4-0.7,0.2C97.9,33.6,97.9,33.1,98,33z"/>
            <path className="f-p2" fill="#FF7B00" d="M95.1,25.7c0-0.2,0.1-0.4,0.1-0.7c0-0.4-0.2-0.9-0.6-1.2c0.5,0.2,1,0.6,1.2,1.1c0.1,0.2,0.2,0.5,0.2,0.8c0,0.2-0.3,0.6-0.5,0.5C95.3,26.2,95.1,25.9,95.1,25.7z"/>
            <path className="f-p1" fill="#FF7B00" d="M88.2,28.8c-0.2-0.4-0.6-0.8-0.9-1.2c-0.5-0.8-0.6-2-0.1-2.8c-0.8,1-1.3,2.2-1.3,3.5c0,0.6,0.1,1.3,0.5,1.8c0.3,0.4,1.2,0.9,1.6,0.5C88.4,30.2,88.4,29.2,88.2,28.8z"/>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default GaugeChart;
