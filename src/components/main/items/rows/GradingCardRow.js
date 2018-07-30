import React from 'react';
import Row from './Row';
import LangRow from 'components/main/pages/home/views/home/cards/langs/LangRow';
import Image from 'components/main/items/ui/Image';
import Badge from 'components/main/items/Badge';

class GradingCardRow extends Row {

  langRows(){
    const app = this.props.app;
    const func = app.functions;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const style = {...bs, ...{
      height: '',
      width: '65%'
    }}
    const langsId = this.props.card.langs;
    //console.log(langsId)
    const langs = [];
    langsId.map(id=>{
      return langs.splice(0,0,func.getLangById(id));
    })
    //console.log(langs)
    return(
      <div style={style}>
        {langs.slice(0).reverse().map((lang,i)=>{
          return this.langRow(lang, i)
        })}
      </div>
    )
  }

  langRow(lang, i){
    const app = this.props.app;
    const ui = app.store.ui;
    //const bs = ui.basicStyle;
    const rowStyle = {...ui.styles.area, ...{
      flexShrink: 0,
      width: '95%',
      alignItems: 'center'
    }}
    return(
      <div key={i} style={rowStyle}>
        <LangRow app={app} lang={lang}/>
      </div>
    )
  }

  selecter(){
    const app = this.props.app;
    const ui = app.store.ui;
    const style = {...ui.styles.button, ...{
      position: 'absolute',
      width: '100%',
      height: '100%'
    }}
    return(
      <button style={style} onClick={this.props.onClick}/>
    )
  }

  render(){
    this.init(this.props);
    if(this.props.project === null){
      return null;
    }
    const isSelected = this.props.selected === this.props.index;

    const rowStyle = {...this.ui.styles.border, ...this.ui.styles.area, ...{
      flexShrink: 0,
      width: '95%',
      backgroundColor: 'white',
      alignItems: 'flex-start',
      position: 'relative',
      margin: '5px',
      opacity: isSelected? 1:0.25
    }}
    const iconContainerStyle = {...this.ui.styles.container, ...{
      width: this.bs.width * 0.28,
      height: this.bs.width * 0.28
    }}

    const card = this.props.card;
    const badgeScale = [this.bs.width * 0.15, this.bs.width * 0.15]

    return(
      <div id={'row' + this.props.index} style={rowStyle}>
        <Badge app={this.app} grade={card.grade} scale={badgeScale} />
        <div style={iconContainerStyle}>
          <Image app={this.app} url={this.func.url(card.icon,'cardIcon')} size={this.bs.width * 0.24}/>
        </div>
        {this.langRows()}
        {this.cardTags(card.comment && card.comment.length > 0, (card.audioCommentBlob))}
        {!isSelected && this.selecter()}
      </div>
    )
  }
}

export default GradingCardRow;
