import React from 'react';
import UI from 'components/UI';
import QuestCell from 'components/main/items/cells/QuestCell';

class Questionnaires extends UI {

  render(){
    this.init(this.props);
    const data = this.props.data.slice(0);

    const questStyle = {
      width: '95%',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexFlow: 'row wrap',
      alignContent: 'flex-start',
      paddingLeft: '2%'
    }
    const questContainerStyle = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.275,
      height: this.bs.height * 0.375
    }}
    data.push('add');

    return(
      <div style={questStyle}>
        {this.gap('1%')}
        {data.length <= 1 &&
        this.subTitle(['No questionnaire','沒有問卷','没有問卷'])}
        {data.map((quest,i)=>{
          if(quest === 'add'){
            return(
              <div key={i} style={questContainerStyle}>
                {this.props.onAdd && this.props.onAdd()}
              </div>
            )
          }
          //console.log(card);
          return(
            <div key={i} style={questContainerStyle}>
              <QuestCell
              app={this.app} data={quest}
              onClick={()=>{
                //this.onCellClick();
                this.actions.survey.viewQuestionnaire(quest);
                this.actions.content.pushView('viewQuestionnaire')}}/>
            </div>
          )
        })}
      </div>
    )
  }

}

export default Questionnaires;
