import React from 'react';
import UI from 'components/UI';
import {Motion, spring, presets}  from 'react-motion';

import Image from 'components/main/items/ui/Image';
import Badge from 'components/main/items/Badge';
import Langs from './langs/Langs';

class Card extends UI {

  cardUpper(card){
    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      height: '47%'
    }}
    return(
      <div style={style}>
        <Image app={this.app} filename={card.icon} type={'cardIcon'} size={this.bs.height * 0.35}/>
      </div>
    )
  }

  cardLower(card){
    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      height: '47%'
    }}
    return(
      <div style={style}>
        <Langs app={this.app} card={card} />
      </div>
    )
  }

  footer(card){
    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      height: '6%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      textAlign: 'left'
    }}
    const profile = this.func.getById.profileByUser(card.author, this.store);
    return(
      <div style={style}>
        {this.verGap('2%')}
        {profile && this.textDisplay(profile.name, ['','40%'], '75%', this.ui.colors.deepDarkGrey)}
      </div>
    )
  }

  render(){
    this.init(this.props);
    const card = this.props.card;

    const containerStyle = {...this.ui.styles.container, ...{
      width: '100%',
      height: '100%',
      flexShrink: 0,
      position: 'absolute'
    }}
    const cardStyle = {...this.ui.styles.border, ...this.bs, ...{
      width: this.bs.height * 0.55,
      height: this.bs.height * 0.85,
      backgroundColor: 'white',
      position: 'relative',
      flexShrink: 0
    }}
    const badgeScale = [this.bs.width * 0.25, this.bs.width * 0.25];

    const state = this.props.state;
    const startLeft =
    state === 'inLeft'? -this.bs.width:
    state === 'inRight'? this.bs.width:
    state === 'farToLeft'? this.bs.width:
    state === 'farToRight'? -this.bs.width:
    0;
    const endLeft =
    state === 'outLeft'? -this.bs.width:
    state === 'outRight'? this.bs.width:
    state === 'farToLeft'? -this.bs.width:
    state === 'farToRight'? this.bs.width:
    0;

    const incoming = state.includes('in') || state === '';
    const far = state.includes('far');

    return(
      <Motion key={this.props.card._id + state} defaultStyle={{left: startLeft, opacity: far? 1: incoming? 0:1.1}}
      style={{left: spring(endLeft, {...presets.noWobby, ...{stiffness: far? 50:170}}), opacity: far? 1: incoming? spring(1.1):spring(0)}}>
        {style=>(
          <div style={{...containerStyle, ...{left: style.left, opacity: style.opacity}}}>
            <div style={cardStyle}>
              <Badge app={this.app} grade={card.grade} scale={badgeScale} />
              {this.cardUpper(card)}
              {this.cardLower(card)}
              {this.footer(card)}
              {this.cardTags(card.comment && card.comment.length > 0, card.audioComment)}
            </div>
          </div>
        )}
      </Motion>
    )
  }
}

export default Card;
