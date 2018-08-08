import React from 'react';
import UI from 'components/UI';
import Badge from 'components/main/items/Badge';

class Cell extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      iconUrl: null
    }
    this.data = this.props.data;
    this.type = this.props.type;
    this.getIconUrl(this.type);
  }

  async getIconUrl(type){
    const fileType =
    type === 'course'? 'courseIcon':
    type === 'project'? 'projectIcon':
    type === 'card'? 'cardIcon':
    '';

    const url = await this.func.url(this.data.icon, fileType);
    this.setState({
      iconUrl: url
    })
  }

  cellImage(){
    const imageStyle = {...this.ui.styles.container, ...this.ui.styles.border, ...{
      maxWidth: this.scale[0] * 0.85,
      maxHeight: this.scale[0] * 0.85,
      marginTop: '4%'
    }};
    //console.log(url)
    return <img style={imageStyle} src={this.state.iconUrl} alt=''/>
  }

  cellTitle(type){
    var text = '';
    if(type === 'course' || type === 'project'){
      text = this.data.title;
    }
    if(type === 'card'){
      const firstLang = this.func.getLangById(this.data.langs[0]);
      text = firstLang !== null? firstLang.text: '';
    }

    const scale =[this.scale[0] * 0.85,''];
    /*type === 'course'? [this.scale[0] * 0.85,'']:
    type === 'project'? [this.bs.width * 0.22, '']:
    type === 'card'? [this.bs.width * 0.23, '']:
    '';*/

    return(
      <div style={{flexGrow: 1, overflow: 'hidden'}}>
        {this.textDisplay(text, scale, '125%')}
      </div>
    )
  }

  render(){
    this.init(this.props);
    //console.log(data)
    if(this.data === null){
      return null;
    }

    this.scale =
    this.type === 'course'? [this.bs.width * 0.26,this.bs.width * 0.28]:
    this.type === 'project'? [this.bs.width * 0.24,this.bs.width * 0.26]:
    this.type === 'card'? [this.bs.width * 0.25, this.bs.width * 0.35]:
    '';

    const cellStyle = {...this.ui.styles.button, ...this.ui.styles.border, ...{
      width: this.scale[0],
      height: this.scale[1],
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
        {this.type === 'card' && <Badge app={this.app} grade={this.data.grade} scale={badgeScale} />}
        {this.cellImage()}
        {this.cellTitle(this.type)}
      </button>
    )
  }

  getAppend(type){
    const append =
    type === 'course'? 'courseIcon':
    type === 'project'? 'projectIcon':
    type === 'card'? 'cardIcon':
    '';
    return append;
  }

}

export default Cell;
