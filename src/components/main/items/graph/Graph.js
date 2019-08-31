import React from 'react';
import UI from 'components/UI';
import icon_add_small from 'resources/images/buttons/buttonIcons/add_small.png';
import icon_minus_small from 'resources/images/buttons/buttonIcons/minus_small.png';
import icon_arrow2_small from 'resources/images/buttons/buttonIcons/arrow2_small.png';
import icon_arrow2_reverse_small from 'resources/images/buttons/buttonIcons/arrow2_reverse_small.png';

class Graph extends UI {

  constructor(props){
    super(props);
    this.init(props);

    const xType =
    props.data[0] && props.data[0].date? 'date':
    props.data[0] && props.data[0].month? 'month':
    props.data[0] && props.data[0].student? 'student':
    '';

    this.state = {
      height: this.bs.height * 0.25,
      width: this.bs.width * 0.925,
      axisWidth: this.bs.height * 0.05,
      fontSize: this.bs.height * 0.009,
      xAxis: {
        title: '',
        type: xType,
        start: this.xStart(xType),
        end: this.xEnd(xType),
        tags: []
      },
      yAxis: {
        title: props.yTitle,
        start: 1,
        end: -1,
        tags: [],
        highlight: -1
      },
      data: props.data[0]? this.setData(props.data): []
    }
  }

  componentDidMount(){ this.updateAxis(); }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.updateAxis();
  }

  updateAxis(){
    this.setX();
    this.setY();
  }

  setData(data){
    if(data[0].date){
      for(var i=0;i<data.length;i++){ data[i].date = new Date(data[i].date); }
    }
    if(data[0].month){
      for(var j=0;j<data.length;j++){ data[j].month = new Date(data[j].month); }
    }
    return data;
  }

  xStart(type){
    const now = new Date();
    if(type === 'date'){ return new Date(now.getFullYear(), now.getMonth(), 0); }
    if(type === 'month'){ return new Date(now.getFullYear(), 0, 0); }
    if(type === 'student'){ return 0; }
  }

  xEnd(type){
    const now = new Date();
    if(type === 'date'){ return new Date(now.getFullYear(), now.getMonth(), 31); }
    if(type === 'month'){ return new Date(now.getFullYear(), 11, 0); }
    if(type === 'student'){ return 9; }
  }

  setX(){
    const data = this.props.data;
    const xAxis = this.state.xAxis;
    const type = xAxis.type;

    var tags = [];
    var title = '';
    if(type === 'date'){
      for(var i = new Date(xAxis.start.getTime());i <= xAxis.end;i = new Date(i.setDate(i.getDate() + 1))){ tags.push(i); }
      const year = tags[0].getFullYear();
      title = 'Date (' + year + ')';
    }
    if(type === 'month'){
      for(var j = new Date(xAxis.start.getTime());j <= xAxis.end;j = new Date(j.setMonth(j.getMonth() + 1))){ tags.push(j); }
      const year = tags[0].getFullYear();
      title = 'Month (' + year + ')';
    }
    if(type === 'student'){
      const profiles = this.props.profiles;
      for(var k = xAxis.start;k <= xAxis.end;k++){
        if(k >= data.length){ break; }
        const userId = data[k].student;
        var name = '';
        for(var l=0;l<profiles.length;l++){
          if(profiles[l].belongTo === userId){
            name = profiles[l].name;
            tags.push({name, userId});
            break;
          }
        }
      }
      title = 'Student';
    }

    this.setState({
      xAxis: {...this.state.xAxis, ...{ type, title, tags }}
    });
  }

  setY(){
    const data = this.state.data;
    const yAxis = this.state.yAxis;
    var tags = [];
    for(var i = yAxis.start;i <= yAxis.end;i++){ tags.push(i); }

    var end = 0;
    for(var j=0;j<data.length;j++){
      if(data[j].value > end){ end = data[j].value; }
    }

    this.setState({
      yAxis: {...this.state.yAxis, ...{ tags: tags, end }}
    });
  }

  setHighlight(value){
    this.setState({
      yAxis: {...this.state.yAxis, ...{
        highlight: value
      }}
    })
  }

  render(){
    this.init(this.props);
    const chartStyle = {...this.ui.styles.list, ...{
      width: this.state.width,
      height: this.state.height,
      flexShrink: 0
    }}
    if(!this.props.data){ return null; }
    return(
      <div style={chartStyle}>
        {this.upperContent()}
        {this.lowerContent()}
      </div>
    )
  }

  upperContent(){
    const style = {...this.ui.styles.area, ...{
      width: this.state.width,
      height: this.state.height - this.state.axisWidth,
      backgroundColor: this.ui.colors.lightGrey
    }}
    return(
      <div style={style}>
        {this.yAxis()}
        {this.content()}
      </div>
    )
  }

  lowerContent(){
    const style = {...this.ui.styles.area, ...{
      width: this.state.width,
      height: this.state.axisWidth
    }}
    return(
      <div style={style}>
        {this.panel()}
        {this.xAxis()}
      </div>
    )
  }

  panel(){
    const style = {...this.ui.styles.area, ...{
      width: this.state.axisWidth,
      height: this.state.axisWidth,
      backgroundColor: this.ui.colors.grey,
      flexFlow: 'row wrap'
    }}
    const btnSize = [this.state.axisWidth / 2, this.state.axisWidth / 2];
    return(
      <div style={style}>
        {this.buttons.graphPenel(icon_minus_small, btnSize, ()=>{ this.moveX(false, true); } )}
        {this.buttons.graphPenel(icon_add_small, btnSize, ()=>{ this.moveX(true, true); } )}
        {this.buttons.graphPenel(icon_arrow2_small, btnSize, ()=>{ this.moveX(false, false); } )}
        {this.buttons.graphPenel(icon_arrow2_reverse_small, btnSize, ()=>{ this.moveX(true, false); } )}
      </div>
    )
  }

  yAxis(){
    const style = {...this.ui.styles.area, ...{
      width: this.state.axisWidth,
      height: this.state.height - this.state.axisWidth,
      backgroundColor: this.ui.colors.darkGrey,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }}
    return(
      <div style={style}>
        {this.textDisplay(this.state.yAxis.title , [this.state.axisWidth * 0.75, ''], this.state.fontSize)}
        {this.yScale()}
      </div>
    )
  }

  yScale(){
    const style = {...this.ui.styles.containerY, ...{
      flexDirection: 'column-reverse',
      width: this.state.axisWidth / 4,
      height: this.state.height - this.state.axisWidth,
      backgroundColor: this.ui.colors.lightGrey,
    }}

    var tags = this.state.yAxis.tags;

    const tagStyle = {...this.ui.styles.containerY, ...{
      width: this.state.axisWidth / 4,
      height: (this.state.height - this.state.axisWidth)/ (tags.length),
      justifyContent: 'flex-start',
      backgroundColor: this.ui.colors.lightGrey
    }}

    return(
      <div style={style}>
        {tags.map((t, i)=>{
          return(
            <div style={tagStyle} key={i}>
              {this.textDisplay(t, ['', ''], this.state.fontSize, '', (i+1)===this.state.yAxis.highlight? 'red':'black')}
            </div>
          )
        })}
      </div>
    )
  }

  xAxis(){
    const style = {...this.ui.styles.containerY, ...{
      width: this.state.width - this.state.axisWidth,
      height: this.state.axisWidth,
      justifyContent: 'flex-start',
      backgroundColor: this.ui.colors.darkGrey
    }}
    return(
      <div style={style}>
        {this.xScale()}
        {this.textDisplay(this.state.xAxis.title , ['', ''], this.state.fontSize)}
      </div>
    )
  }

  xScale(){
    const style = {...this.ui.styles.area, ...{
      width: this.state.width - this.state.axisWidth,
      height: this.state.axisWidth / 4,
      backgroundColor: this.ui.colors.lightGrey,
      flexShrink: 0
    }}

    var tags = this.state.xAxis.tags;

    const tagStyle = {...this.ui.styles.containerY, ...{
      width: (this.state.width - this.state.axisWidth)/ (tags.length),
      height: this.state.axisWidth / 4,
      justifyContent: 'center'
    }}

    var skipCount = Math.round(tags.length * 0.1);
    if(skipCount === 0){ skipCount = 1; }

    return(
      <div style={style}>
        {tags.map((t, i)=>{
          const name =
          this.state.xAxis.type === 'date'? this.dateToName(t):
          this.state.xAxis.type === 'month'? this.monthToName(t):
          this.state.xAxis.type === 'student'? t.name:
          '';
          return(
            <div style={tagStyle} key={i}>
              {i % skipCount === 0 && this.textDisplay(name, ['', ''], this.state.fontSize)}
            </div>
          )
        })}
      </div>
    )
  }

  monthToName(date){
    const month = date.getMonth();
    switch (month) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Api';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
      default:
        return '';
    }
  }

  dateToName(date){
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return day + '/' + month;
  }

  moveX(add, scale){
    const tags = this.state.xAxis.tags;
    if(add && scale && tags.length >= 30){ return; }
    var step = Math.round(tags.length * 0.2) * (add? 1:-1);
    if(add && step === 0){ step = 1; }

    var xStart = this.state.xAxis.start;
    var xEnd = this.state.xAxis.end;
    if(this.state.xAxis.type === 'date'){
      this.setState({
        xAxis: {...this.state.xAxis, ...{
          start: new Date(xStart.setDate(xStart.getDate() + (scale? 0: step))),
          end: new Date(xEnd.setDate(xEnd.getDate() + step))
        }}
      }, ()=>{ this.updateAxis(); } );
    }
    if(this.state.xAxis.type === 'month'){
      this.setState({
        xAxis: {...this.state.xAxis, ...{
          start: new Date(xStart.setMonth(xStart.getMonth() + (scale? 0: step))),
          end: new Date(xEnd.setMonth(xEnd.getMonth() + step))
        }}
      }, ()=>{ this.updateAxis(); } );
    }
    if(this.state.xAxis.type === 'student'){
      if(!add && step === 0){ step = -1; }
      var newStart = xStart + (scale? 0: step);
      if(newStart < 0){ return; }
      var newEnd = xEnd + step;
      if(newEnd < 1){ return; }
      if(newEnd > this.state.data.length - 1){ return; }

      this.setState({
        xAxis: {...this.state.xAxis, ...{
          start: newStart,
          end: newEnd
        }}
      }, ()=>{ this.updateAxis(); } );
    }
  }


}

export default Graph;
