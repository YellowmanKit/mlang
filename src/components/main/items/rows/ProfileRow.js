import React from 'react';
import Row from './Row';

import icon_student from 'resources/images/icons/student.png';
import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';

class ProfileRow extends Row {

  rowInfo(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const profile = this.props.profile;

    const rowStyle = {...ui.styles.area, ...{
      width: '100%',
      height: bs.height * 0.06,
      alignItems: 'center'
    }}
    const iconSize = bs.height * 0.05;
    const textScale = [bs.height * 0.05,''];
    return(
      <div style={rowStyle}>
        {this.icon(cards, [iconSize, iconSize])}
        {this.textDisplay(profile.cardCount, textScale, '150%', '')}
        {this.icon(star2, [iconSize, iconSize])}
        {this.textDisplay(profile.featuredCount, textScale, '150%', '')}
      </div>
    )
  }

  render(){
    if(this.props.profile === null){
      return null;
    }
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const rowStyle = Object.assign({}, ui.styles.area, {
      flexShrink: 0,
      height: bs.height * 0.15,
      borderBottom: '1px solid ' + ui.colors.darkGrey,
      alignItems: 'center'
    })

    return(
      <div style={rowStyle}>
        {this.verGap('3%')}
        {this.rowIcon(icon_student)}
        {this.rowContent(this.props.profile.name, this.rowInfo.bind(this) )}
      </div>
    )
  }
}

export default ProfileRow;
