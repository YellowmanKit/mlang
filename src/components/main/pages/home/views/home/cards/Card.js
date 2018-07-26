import React from 'react';
import UI from 'components/UI';
import Image from 'components/main/items/ui/Image';

import Langs from './langs/Langs';

class Card extends UI {

  cardUpper(data){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;
    const style = {...ui.styles.area, ...ui.styles.container, ...{
      height: '47%'
    }}
    return(
      <div style={style}>
        <Image app={app} url={func.url(data.icon,'cardIcon')} size={bs.height * 0.35}/>
      </div>
    )
  }

  cardLower(data){
    const app = this.props.app;
    const ui = app.store.ui;
    const style = {...ui.styles.area, ...ui.styles.container, ...{
      height: '47%'
    }}
    return(
      <div style={style}>
        <Langs app={app} card={data} />
      </div>
    )
  }

  footer(data){
    const app = this.props.app;
    const ui = app.store.ui;
    const func = app.functions;
    const style = {...ui.styles.area, ...ui.styles.container, ...{
      height: '6%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      textAlign: 'left'
    }}
    const profile = func.getStudentProfileByUserId(data.author);
    return(
      <div style={style}>
        {this.verGap('2%')}
        {profile && this.textDisplay(profile.name, ['','40%'], '75%', ui.colors.deepDarkGrey)}
      </div>
    )
  }

  render(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const data = this.props.data;

    const containerStyle = {...ui.styles.container, ...{
      width: '100%',
      height: '100%',
      flexShrink: 0
    }}
    const cardStyle = {...ui.styles.border, ...bs, ...{
      width: bs.width * 0.8,
      height: bs.width * 1.2,
      backgroundColor: 'white',
      position: 'relative',
      flexShrink: 0
    }}
    return(
      <div style={containerStyle}>
        <div style={cardStyle}>
          {this.cardUpper(data)}
          {this.cardLower(data)}
          {this.footer(data)}
        </div>
      </div>
    )
  }
}

export default Card;
