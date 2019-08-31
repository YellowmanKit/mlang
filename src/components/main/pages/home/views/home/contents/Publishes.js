import React from 'react';
import UI from 'components/UI';
import PublishCell from 'components/main/items/cells/PublishCell';

class Publishes extends UI {

  render(){
    this.init(this.props);
    const data = this.props.data.slice(0);

    const publishStyle = {
      width: '95%',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexFlow: 'row wrap',
      alignContent: 'flex-start',
      paddingLeft: '2%'
    }
    const publishContainerStyle = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.275,
      height: this.bs.height * 0.375
    }}
    data.push('add');

    return(
      <div style={publishStyle}>
        {this.gap('1%')}
        {data.length <= 1 &&
        this.subTitle(['No publish','沒有發佈','没有发布'])}
        {data.map((publish,i)=>{
          if(publish === 'add'){
            return(
              <div key={i} style={publishContainerStyle}>
                {this.props.onAdd && this.props.onAdd()}
              </div>
            )
          }
          //console.log(card);
          return(
            <div key={i} style={publishContainerStyle}>
              <PublishCell
              app={this.app} data={publish}
              onClick={()=>{
                //this.onCellClick();
                this.actions.survey.viewPublish(publish);
                this.actions.content.pushView('viewPublish')}}/>
            </div>
          )
        })}
      </div>
    )
  }

}

export default Publishes;
