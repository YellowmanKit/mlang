import React from 'react';
import UI from 'components/UI';
import Badge from 'components/main/items/Badge';

class Cell extends UI {

  cellImage(type){
    const data = this.props.data
    const append =
    type === 'course'? 'courseIcon':
    type === 'card'? 'cardIcon':
    '';
    const url = this.func.url(data.icon, append);

    const imageStyle = {...this.ui.styles.container, ...this.ui.styles.border, ...{
      maxWidth: this.bs.width * 0.22,
      maxHeight: this.bs.width * 0.22,
      marginTop: '4%'
    }};
    //console.log(url)
    return <img style={imageStyle} src={url} alt=''/>
  }

  cellTitle(type){
    const data = this.props.data
    var text = '';
    if(type === 'course'){
      text = data.title;
    }
    if(type === 'card'){
      const firstLang = this.func.getLangById(data.langs[0]);
      text = firstLang !== null? firstLang.text: '';
    }

    const scale =
    type === 'course'? [this.bs.width * 0.23,'']:
    type === 'card'? [this.bs.width * 0.23, '']:
    '';

    return(
      <div style={{flexGrow: 1, overflow: 'hidden'}}>
        {this.textDisplay(text, scale, '125%')}
      </div>
    )
  }

  render(){
    this.init(this.props);
    const data = this.props.data
    const type = this.props.type;
    //console.log(data)
    if(data === null){
      return null;
    }

    const scale =
    type === 'course'? [this.bs.width * 0.25,this.bs.width * 0.25]:
    type === 'card'? [this.bs.width * 0.25, this.bs.width * 0.35]:
    '';

    const cellStyle = {...this.ui.styles.button, ...this.ui.styles.border, ...{
      width: scale[0],
      height: scale[1],
      margin: '1.5%',
      backgroundColor: 'white',
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      position: 'relative'
    }}
    const badgeScale = [this.bs.width * 0.125, this.bs.width * 0.125]

    return(
      <button style={cellStyle} onClick={this.props.onClick}>
        {type === 'card' && <Badge app={this.app} grade={data.grade} scale={badgeScale} />}
        {this.cellImage(type)}
        {this.cellTitle(type)}
      </button>
    )
  }

}

export default Cell;
