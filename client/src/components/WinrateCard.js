import React from 'react';
import './WinrateCard.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function WinrateCard() {
  
  let winrateArr = JSON.parse(localStorage.getItem('winrate'));
  let userWinrate = Math.round((winrateArr[0]/(winrateArr[0]+winrateArr[1]))*100);
  
  let graphColor, graphColor2;
  if(userWinrate < 50){
    graphColor = 'rgb(250, 0, 0)';
    graphColor2 = 'rgb(70, 0, 0)'
  }
  else{
    graphColor = 'rgb(0, 0 ,150)';
    graphColor2 = 'rgb(0, 0, 70)'
  }


  let percentagePlacement;
  let pluginConfig;
  if(userWinrate == 100){
    percentagePlacement = 'winrate-percent2';
    pluginConfig = undefined;
  }
  else if(userWinrate == 0){
    percentagePlacement = 'winrate-percent3';
    pluginConfig = undefined;
  }
  else{
    percentagePlacement = 'winrate-percent';
    pluginConfig = [{
      afterUpdate: function(chart) {
        const arcs = chart.getDatasetMeta(0).data;
        
        arcs.forEach(function(arc) {
          arc.round = {
            x: (chart.chartArea.left + chart.chartArea.right) / 2,
            y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
            radius: (arc.outerRadius + arc.innerRadius) / 2,
            thickness: (arc.outerRadius - arc.innerRadius) / 2.15,
            backgroundColor: arc.options.backgroundColor
          }
        });
      },
      afterDraw: (chart) => {
        const {
          ctx,
          canvas
        } = chart;
  
        chart.getDatasetMeta(0).data.forEach(arc => {
          const startAngle = Math.PI / 2 - arc.startAngle;
          const endAngle = Math.PI / 2 - arc.endAngle;
  
          ctx.save();
          ctx.translate(arc.round.x, arc.round.y);
          ctx.fillStyle = arc.options.backgroundColor;
          ctx.beginPath();
          ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
      }
    }]
  }


  return (
    <div className='winrateCard'>
      <h1 className={percentagePlacement}>
        {userWinrate}%
      </h1>
      <hr className='winrate-line'/>
      <div className='winGraphContain'>
        <Doughnut
         plugins={pluginConfig}
        data={{
          labels: [],
          datasets: [{
            data: [userWinrate,100-userWinrate],
            backgroundColor: [
              graphColor,
              graphColor2
            ],
            borderColor: 'rgb(250, 250, 250)',
            borderWidth: 4,
            //color: "rgba(50,54,133,1)",
          }]
        }}
        options={{
          cutout: 90,
          plugins: {
            title: {
              display: true,
              text: 'WINRATE FOR LAST 15 GAMES',
              color: 'white',
              font: {
                size: 40,
                family: 'Tungsten',
              }
            },
          }
        }} 
        />
      </div>
    </div>
  )
}

export default WinrateCard