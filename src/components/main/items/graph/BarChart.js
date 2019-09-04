import React from 'react';
import Graph from './Graph';

class BarChart extends Graph {

  content(){
    this.init(this.props);
    const style = {...this.ui.styles.area, ...{
      width: this.state.width - this.state.axisWidth,
      height: this.state.height - this.state.axisWidth,
      backgroundColor: this.ui.colors.ultraLightGrey
    }}
    const xTags = this.state.xAxis.tags;
    //const yTags = this.state.yAxis.tags;
    if(!this.state.data){ return null; }

    return(
      <div style={style}>
        {xTags.map((tag,i)=>{
          return this.bar(tag, i)
        })}
      </div>
    )
  }

  bar(tag, i){
    const barStyle = {...this.ui.styles.containerY, ...{
      width: (this.state.width - this.state.axisWidth) / this.state.xAxis.tags.length,
      justifyContent: 'flex-end'
    }}
    var value = 0;
    const data = this.state.data;
    const type = this.state.xAxis.type;
    for(var k=0;k<data.length;k++){
      if(type === 'date'){
        if(data[k][type].getFullYear() === tag.getFullYear() &&
          data[k][type].getMonth() === tag.getMonth() &&
          data[k][type].getDate() === tag.getDate()){
          value = data[k].value; continue; }
      }
      if(type === 'month'){
        if(data[k][type].getFullYear() === tag.getFullYear() &&
          data[k][type].getMonth() === tag.getMonth()){
          value = data[k].value; continue; }
      }
      if(type === 'student'){
        if(data[k][type] === tag.userId){
          value = data[k].value; continue; }
      }
      if(type === 'option'){
        if(data[k][type] === tag){
          value = data[k].value; continue; }
      }
    }
    const values = [0,0,value,0,0];

    return(
      <div style={barStyle} key={i}>
        {values.map((v, j)=>{
          return this.subBar(v, j)
        })}
      </div>
    )
  }

  subBar(value, key){
    const barHeight = (this.state.height - this.state.axisWidth) * (value/ this.state.yAxis.end);
    const barStyle = {...this.ui.styles.containerY, ...{
      width: (this.state.width - this.state.axisWidth) / (this.state.xAxis.tags.length * 5),
      height: barHeight,
      cursor: 'pointer',
      backgroundColor: this.ui.colors.mlangGreen
    }}
    return(
        <div style={barStyle}
        onMouseEnter={()=>{ this.setHighlight(value); }} onMouseLeave={()=>{ this.setHighlight(-1); }} key={key}/>
    )

  }

}

export default BarChart;
