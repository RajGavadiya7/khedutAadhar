import React from "react";
import './css/Buy.css';

const Buy = () => {
  return (
    <div>
      <div >
        <iframe
          className="shop-model"
          title="Farmer's Fruit Stall"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          width="800"
          height="500"
          src="https://sketchfab.com/models/b65fecf6bdfc4499a6535f7816620627/embed?autostart=1&ui_hint=0"
        >
        </iframe>
      </div>
    </div>
  );
};

export default Buy;
