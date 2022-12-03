import React from 'react';
import './GraphCard.css';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function GraphCard() {
  
  let userEloChange = JSON.parse(localStorage.getItem('eloChange'));
  let labelLenght = userEloChange.length;
  let labelArray = [];
  let i;
  for(i=0; i<labelLenght; i++){
    labelArray[i] = (i+1).toString();
  }

  
  var rankEloArray = {0:'Iron1', 100:'Iron2', 200:'Iron3', 300:'Bronze1', 400:'Bronze2', 500:'Bronze3', 600:'Silver1', 700:'Silver2',
  800:'Silver3', 900:'Gold1', 1000:'Gold2', 1100:'Gold3', 1200:'Platinum1', 1300:'Platinum2', 1400:'Platinum3', 1500:'Diamond1', 1600:'Diamond2', 1700:'Diamond3', 1800:'Ascendant1',
  1900:'Ascendant2', 2000:'Ascendant3', 2100:'Immortal1', 2200:'Immortal2', 2300:'Immortal3', 2600:'Radiant'};

  const imagePlugin = [{
    afterDraw: chart => {
      let ctx = chart.ctx;
      ctx.save();
      let yAxis = chart.scales.y;
      yAxis.ticks.forEach((value, index) => {
        for(var key in rankEloArray){
          if(value.value == key){
            let y = yAxis.getPixelForTick(index);      
            let image = new Image();
            image.src = `/miniranks/${rankEloArray[key]}.png`
            ctx.drawImage(image, 5, y-13);
          }
        }
      });  
      ctx.restore();  
    }  
  }]

  return (
    <div className='graphCard'>
      <div className='graphContain'>
        <Line 
        plugins= {imagePlugin}
        type= {'RoundedDoughnut'}
        data={{
          labels: labelArray,
          datasets: [{
            data: userEloChange,
            fill: true,
            label: "MMR Change in the last 15 games",
            color: "rgba(50,54,133,1)",
          }]
        }}
        options= {{
          scales: {   
            y: {
              ticks: {
                callback: function(value, index, values) {
                    if (((value %100) === 0 && value < 2400)|| value === 2600){
                      return ''
                    }
                    else{
                      return value;
                    }
                },
                color: "rgba(50,54,133,1)",
              }
            },
            x: {
              ticks: {
                color: "rgba(50,54,133,1)",
              }
            }
          },
          events: ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
        }}
        />
      </div>
    </div>
  )
}

export default GraphCard