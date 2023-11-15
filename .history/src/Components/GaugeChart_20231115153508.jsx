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
    // <div style={{ position: 'absolute', maxWidth: '80%', top: '50%', left: '50%', width: '300px', transform: 'translate(-50%, -50%)', boxShadow: '0px 5px 20px rgba(0,0,0,0.2)', padding: '20px', borderRadius: '5px' }}>
    //   <div className="gauge-box" data-percent='88'>
    //     <svg version="1.1" style={{ maxHeight: '100%', maxWidth: '100%' }} className="gauge-meter-chart" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
    //       y="0px" viewBox="0 0 100 51" style={{ enableBackground: 'new 0 0 100 51' }} xmlSpace="preserve">
    //       <g className="meter">
    //         <path className="p1" fill="#EAEAEA" d="M4.1,31C2.6,34.6,1.6,38.5,1,42.4C0.5,45.9,3.2,49,6.7,49h0c2.8,0,5.3-2,5.7-4.8c0.4-3,1.2-6,2.3-8.7L4.1,31z"/>
    //         <path className="p-2" fill="#EAEAEA" d="M14.7,14.9c-4.3,4.4-7.8,9.5-10.2,15.2l10.6,4.4c1.9-4.3,4.5-8.2,7.7-11.5L14.7,14.9z"/>
    //         <path className="p-3" fill="#EAEAEA" d="M30.6,4c-5.7,2.4-10.9,5.9-15.2,10.2l8.1,8.1c3.3-3.2,7.2-5.9,11.5-7.7L30.6,4z"/>
    //         <path className="p-4" fill="#767171" d="M49.5,0c-6.3,0.1-12.4,1.3-18,3.6l4.4,10.6c4.2-1.7,8.8-2.6,13.6-2.7V0z"/>
    //         <path className="p-5" fill="#767171" d="M68.5,3.6c-5.6-2.2-11.6-3.5-18-3.6v11.5c4.8,0.1,9.4,1,13.6,2.7L68.5,3.6z"/>
    //         <path className="p-6" fill="#767171" d="M84.6,14.2C80.3,9.9,75.1,6.4,69.4,4L65,14.6c4.3,1.9,8.2,4.5,11.5,7.7L84.6,14.2z"/>
    //         <path className="p-7" fill="#387FF5" d="M95.5,30.1c-2.4-5.7-5.9-10.9-10.2-15.2L77.2,23c3.2,3.3,5.9,7.2,7.7,11.5L95.5,30.1z"/>
    //         <path className="p-8" fill="#387FF5" d="M99,42.4c-0.6-4-1.6-7.8-3.1-11.4l-10.6,4.4c1.1,2.8,1.9,5.7,2.3,8.7C88,47,90.5,49,93.3,49h0C96.8,49,99.5,45.9,99,42.4z"/>
    //         <path class="pointer" d="M51,47.3V18l1.7,0L50,13.1L47.3,18H49l0,29.3c-0.6,0.3-1,1-1,1.7c0,1.1,0.9,2,2,2s2-0.9,2-2C52,48.3,51.6,47.6,51,47.3z"/>
    //       </g>
    //       <path className="pointer" d="M51,47.3V18l1.7,0L50,13.1L47.3,18H49l0,29.3c-0.6,0.3-1,1-1,1.7c0,1.1,0.9,2,2,2s2-0.9,2-2C52,48.3,51.6,47.6,51,47.3z" />
         
    //     </svg>
    //   </div>
    // </div>
    <div class='centered-box'>
	<div class="gauge-box" data-percent='88'>
	<svg version="1.1" class="gauge-meter-chart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	 y="0px" viewBox="0 0 100 51" style={{ enableBackground: 'new 0 0 100 51' }} xmlSpace="preserve">
<g class="meter">
	<path class="p1" fill="#EA0000" d="M4.1,31C2.6,34.6,1.6,38.5,1,42.4C0.5,45.9,3.2,49,6.7,49h0c2.8,0,5.3-2,5.7-4.8c0.4-3,1.2-6,2.3-8.7L4.1,31z"/>
	<path class="p-2" fill="#F7F616" d="M14.7,14.9c-4.3,4.4-7.8,9.5-10.2,15.2l10.6,4.4c1.9-4.3,4.5-8.2,7.7-11.5L14.7,14.9z"/>
	<path class="p-3" fill="#F7F616" d="M30.6,4c-5.7,2.4-10.9,5.9-15.2,10.2l8.1,8.1c3.3-3.2,7.2-5.9,11.5-7.7L30.6,4z"/>
	<path class="p-4" fill="#3CFF2A" d="M49.5,0c-6.3,0.1-12.4,1.3-18,3.6l4.4,10.6c4.2-1.7,8.8-2.6,13.6-2.7V0z"/>
	<path class="p-5" fill="#3CFF2A" d="M68.5,3.6c-5.6-2.2-11.6-3.5-18-3.6v11.5c4.8,0.1,9.4,1,13.6,2.7L68.5,3.6z"/>
	<path class="p-6" fill="#3CDD2A" d="M84.6,14.2C80.3,9.9,75.1,6.4,69.4,4L65,14.6c4.3,1.9,8.2,4.5,11.5,7.7L84.6,14.2z"/>
	<path class="p-7" fill="#3CDD2A" d="M95.5,30.1c-2.4-5.7-5.9-10.9-10.2-15.2L77.2,23c3.2,3.3,5.9,7.2,7.7,11.5L95.5,30.1z"/>
	<path class="p-8" fill="#1B5EB2" d="M99,42.4c-0.6-4-1.6-7.8-3.1-11.4l-10.6,4.4c1.1,2.8,1.9,5.7,2.3,8.7C88,47,90.5,49,93.3,49h0C96.8,49,99.5,45.9,99,42.4z"/>
</g>
<path class="pointer" d="M51,47.3V18l1.7,0L50,13.1L47.3,18H49l0,29.3c-0.6,0.3-1,1-1,1.7c0,1.1,0.9,2,2,2s2-0.9,2-2C52,48.3,51.6,47.6,51,47.3z"/>
	<g class="flame-gauge">
		<g class="flame">
			<path class="flame-orange" fill="#FF7B00" d="M89.9,31.3c-0.8,2.1-1.8,4-2.4,6.1s-0.8,4.4,0,6.5c0.5,1.3,1.4,2.4,2.5,3.2c1.1,0.8,2.5,1.2,3.8,1.1c1.3-0.1,2.7-0.8,3.5-1.9c0.6-0.9,0.9-2,0.8-3.1c-0.1-1.1-0.4-2.2-0.9-3.1c-0.6-1.1-1.4-2.2-1.5-3.5c0-0.8,0.3-1.6,0.4-2.4c0.2-0.8,0.2-1.7-0.3-2.4c0.2,1.5-0.2,3.1-1.1,4.3c0.3-0.3,0-0.9-0.3-1.1c-0.3-0.3-0.7-0.5-1-0.9c-0.4-0.5-0.2-1.3,0-1.8c0.3-0.6,0.6-1.1,0.8-1.8c0.2-1-0.2-2-0.9-2.6c0.4,0.8,0.1,1.8-0.4,2.5c-0.5,0.8-1.1,1.4-1.3,2.3c-0.4-2.1,1.3-4.1,1-6.2c-0.1-1-0.9-2.1-1.8-2.5c0.1,0.5,0.3,0.9,0.4,1.4c0.1,0.6,0,1.4-0.1,2C90.9,28.7,90.4,30,89.9,31.3z"/>
			<path class="flame-yellow" fill="#FFDD00" d="M90.5,44.6c0.9,0.4,2.1,0.1,2.5-0.7s0-1.9-0.9-2.3c-0.3-0.1-0.6-0.2-0.9-0.3c-0.9-0.4-1.4-1.3-1.4-2.3c0-0.9,0.3-1.8,0.7-2.7c0.4-0.9,0.8-1.7,0.9-2.6c-0.4,1.6,0.1,3.3,1.3,4.5c0-0.4,0-0.7,0-1.1c0.8,0.7,1.6,1.5,2.3,2.3c0.7,0.9,1.2,1.8,1.4,2.9c0.2,1.3-0.1,2.8-1.2,3.7c-0.8,0.7-1.9,1-2.9,0.9c-1-0.1-2-0.7-2.5-1.6c-0.5-0.8-0.5-1.6-0.2-2.4C89.5,43.5,89.8,44.2,90.5,44.6z"/>
		</g>
		<path class="f-p3" fill="#FF7B00" d="M98,33c0.1-0.2,0.3-0.3,0.4-0.5c0.2-0.4,0.3-0.9,0-1.3c0.4,0.4,0.6,1,0.6,1.6c0,0.3,0,0.6-0.2,0.8c-0.1,0.2-0.5,0.4-0.7,0.2C97.9,33.6,97.9,33.1,98,33z"/>
		<path class="f-p2" fill="#FF7B00" d="M95.1,25.7c0-0.2,0.1-0.4,0.1-0.7c0-0.4-0.2-0.9-0.6-1.2c0.5,0.2,1,0.6,1.2,1.1c0.1,0.2,0.2,0.5,0.2,0.8c0,0.2-0.3,0.6-0.5,0.5C95.3,26.2,95.1,25.9,95.1,25.7z"/>
		<path class="f-p1" fill="#FF7B00" d="M88.2,28.8c-0.2-0.4-0.6-0.8-0.9-1.2c-0.5-0.8-0.6-2-0.1-2.8c-0.8,1-1.3,2.2-1.3,3.5c0,0.6,0.1,1.3,0.5,1.8c0.3,0.4,1.2,0.9,1.6,0.5C88.4,30.2,88.4,29.2,88.2,28.8z"/>
	</g>
</svg>
	</div>
</div>

  );
};

export default GaugeChart;
