import React from 'react';
import UI from 'components/UI';
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
        <Image app={this.app} url={this.func.url(card.icon,'cardIcon')} size={this.bs.height * 0.35}/>
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
    const profile = this.func.getStudentProfileByUserId(card.author);
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
      flexShrink: 0
    }}
    const cardStyle = {...this.ui.styles.border, ...this.bs, ...{
      width: this.bs.height * 0.55,
      height: this.bs.height * 0.85,
      backgroundColor: 'white',
      position: 'relative',
      flexShrink: 0
    }}
    const badgeScale = [this.bs.width * 0.25, this.bs.width * 0.25]

    return(
      <div style={containerStyle}>
        <div style={cardStyle}>
          <Badge app={this.app} grade={card.grade} scale={badgeScale} />
          {this.cardUpper(card)}
          {this.cardLower(card)}
          {this.footer(card)}
          {this.cardTags(card.comment && card.comment.length > 0, card.audioComment)}
        </div>
      </div>
    )
  }
}

export default Card;
